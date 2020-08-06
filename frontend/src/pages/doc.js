import React from 'react';
import { Component } from 'react';
import { Layout, Card, Alert, Popconfirm } from 'antd';
import '../styles/doc.css';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getDoc } from '../client';

const { Header, Content } = Layout;


export default class DocPage extends Component {
    constructor(props) {
        super(props);

        this.state = { docs: null, serviceAvailable: true };
        this.init = this.init.bind(this);
    }

    init() {
        getDoc()
            .then(docs => this.setState({ "docs": docs }))
            .catch(reason => {
                console.warn("get doc failed, reason: ", reason);
                this.setState({ serviceAvailable: false });
            });
    }

    onEdit(index, event) {
        console.log("index: ", index, ", target: ", event.target);
    }
    deleteCard(index, event) {
        console.log("index: ", index, ", target: ", event.target);
    }

    componentDidMount() { this.init(); }

    render() {
        const generateCards = (docs) => (
            <>
                {docs.map((doc, index) => (
                    <DocCard
                        key={"DocCard" + index}
                        index={index}
                        doc={doc}
                        deleteCard={this.deleteCard}
                        onEdit={this.onEdit}
                    />
                ))}
            </>);
        // todo need a bar to show update/delete status
        var contentElement;
        if (!this.state.serviceAvailable)
            contentElement = <Alert className="doc-error-alert"
                message="获取常用信息失败" type="warning" />;
        else
            contentElement = <Content className="doc-content">
                {generateCards(this.state.docs || [])}
            </Content>;
        return (
            <Layout className="doc">
                <Header className="header doc-title">实验室常用信息汇总</Header>
                {contentElement}
            </Layout>
        );
    }
};

class DocCard extends Component {
    constructor(props) {
        super(props);
        this.state = { doc: props.doc, index: props.index }

        this.onEdit = this.onEdit.bind(this);
        this.deleteCard = this.deleteCard.bind(this);
    }

    onEdit(event) {
        if (this.props.onEdit)
            this.props.onEdit(this.state.index, event);
    }

    deleteCard(event) {
        if (this.props.deleteCard)
            this.props.deleteCard(this.state.index, event);
    }

    timeStamp2Str(timeStamp) {
        const s = new Date(timeStamp).toISOString();
        return s.substr(0, 10) + " " + s.substr(11, 5);
    }

    render() {
        const doc = this.state.doc;
        const index = this.state.index;
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
                <EditOutlined key="edit" onClick={this.onEdit} />
            ]}>
            <p className="doc-card-para">{doc.paragraph}</p>
        </Card>;
    }
};
