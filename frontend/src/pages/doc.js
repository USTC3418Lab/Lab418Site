import React from 'react';
import { Component } from 'react';
import { Layout, Card, Popconfirm, Empty, message } from 'antd';
import '../styles/doc.css';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { client } from '../client';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';

const { Header, Content } = Layout;

export default class DocPage extends Component {
    constructor(props) {
        super(props);

        this.state = { docs: null, serviceAvailable: true };
        this.updateDocs = this.updateDocs.bind(this);
        this.deleteCard = this.deleteCard.bind(this);
        this.generateCards = this.generateCards.bind(this);
    }

    updateDocs() {
        client.getDoc()
            .then(docs => {
                const sortedDocs = docs.sort((a, b) => (b.timestamp - a.timestamp));
                this.setState(() => ({ "docs": sortedDocs }));
            })
            .catch(reason => {
                message.error("获取常用信息失败: " + reason);
                this.setState({ serviceAvailable: false });
            });
    }

    deleteCard(index, event) {
        const titleToDelete = this.state.docs[index].title;
        client.deleteDoc(titleToDelete)
            .then((data) => {
                if (data.code === 200) {
                    message.info("删除成功");
                    this.setState((prevState) => {
                        var newDocs = Object.assign([], prevState.docs);
                        newDocs.splice(index, 1);
                        return { docs: newDocs };
                    });
                }
                else
                    message.warn("删除失败 - 服务器错误");
            })
            .catch((reason) => message.error("删除失败"));
    }

    componentDidMount() { this.updateDocs(); }

    generateCards(docs) {
        return <>
            {docs.map((doc, index) => (<DocCard
                key={"DocCard" + index}
                index={index}
                doc={doc}
                deleteCard={this.deleteCard}
            />))}
        </>
    }

    render() {
        var contentElement;
        if (!this.state.serviceAvailable) {
            contentElement = <Content className="doc-content">
                <div className="doc-error-div">获取常用信息失败</div>
            </Content>;
        } else {
            if (!this.state.docs || this.state.docs.length === 0)
                contentElement = <Empty description="无数据" className="doc-empty" />;
            else
                contentElement = this.generateCards(this.state.docs || []);
        }
        return (
            <Layout className="doc">
                <Header className="header doc-title">实验室常用信息汇总</Header>
                <Content className="doc-content">
                    {contentElement}
                </Content>
            </Layout>
        );
    }
};

class DocCard extends Component {
    constructor(props) {
        super(props);

        this.doc = props.doc;
        this.index = props.index;

        this.deleteCard = this.deleteCard.bind(this);
    }

    deleteCard(event) {
        if (this.props.deleteCard)
            this.props.deleteCard(this.index, event);
    }

    timeStamp2Str(timeStamp) {
        const s = new Date(timeStamp).toISOString();
        return s.substr(0, 10) + " " + s.substr(11, 5);
    }

    render() {
        const doc = this.props.doc;
        const index = this.props.index;

        return <Card
            key={"docCard" + index}
            className="doc-card"
            title={doc.title}
            extra={<span>{this.timeStamp2Str(doc.timestamp)}</span>}
            actions={[
                <Popconfirm
                    title="确定删除该信息？"
                    onConfirm={this.deleteCard}
                    okText="是"
                    cancelText="否">
                    <DeleteOutlined key="delete" />
                </Popconfirm>,
                <Link
                    to={{ pathname: "/page/doc-update", state: { doc: doc, typeUpdate: true } }}>
                    <EditOutlined key="edit" />
                </Link>
            ]}>
            <ReactMarkdown className="doc-card-para">{doc.paragraph}</ReactMarkdown>
        </Card>;
    }
};
