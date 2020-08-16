import React from 'react';
import { Component } from 'react';
import { Layout, message, Empty, Card, Progress } from 'antd';
import Search from 'antd/lib/input/Search';

import '../styles/ccfSearch.css';
import { isStrEmpty } from '../utils';
import { client } from '../client';

const { Header, Content } = Layout;
export default class ccfSearchPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputText: "",
            resultData: [],
            searching: false
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.search = this.search.bind(this);
    }

    onInputChange(ev) {
        this.setState({ inputText: ev.target.value });
    }
    search() {
        if (isStrEmpty(this.state.inputText)) {
            message.info("论文名不能为空啊 ~_~");
            return;
        }
        this.setState({ searching: true });
        client.ccfSearch(this.state.inputText)
            .then(data => {
                this.setState({
                    searching: false,
                    resultData: data
                });
            })
            .catch(reason => {
                message.error("搜索失败");
                this.setState({
                    searching: false
                });
            })
    }
    render() {
        var resultList = <Empty className="search-result-empty" description="无数据" />;
        var searchProgressbar = null;
        if (this.state.searching) {
            searchProgressbar = <Progress
                className="search-progress-bar"
                strokeColor={{
                    '0%': '#1088f9',
                    '100%': '#87d068',
                }}
                strokeWidth="2px"
                status="active"
                showInfo={false}
                percent="99.99"
            />;
            resultList = null;
        }
        else {
            if (this.state.resultData && this.state.resultData.length > 0) {
                resultList = this.state.resultData.map((data, index) => (
                    <Card
                        className="search-result-card"
                        title={data.title}
                        key={"card" + index}>
                        <p>会议缩写: {data.con_abbr}</p>
                        <p>会议名: {data.conference}</p>
                        <strong>CCF分类: {data.degree}</strong>
                    </Card>
                ));
            }
        }
        return <Layout className="ccf-search-page">
            <Header className="header-text">论文所属会议/期刊类别检索工具</Header>
            <Content className="ccf-search-content">
                <Search
                    className="search-input"
                    onChange={this.onInputChange}
                    onSearch={this.search}
                    size="large"
                    placeholder="输入论文名"
                    enterButton="搜索" />
                {searchProgressbar}
                <Content className="search-result-contnet">
                    {resultList}
                </Content>
            </Content>
        </Layout>;
    }
};
