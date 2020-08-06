import React from 'react';
import { Component } from 'react';
import { Layout, Card } from 'antd';
import '../styles/doc.css';
import Meta from 'antd/lib/card/Meta';
import { EditOutlined, DeleteOutlined} from '@ant-design/icons';

const { Header, Content } = Layout;

export default class DocPage extends Component {
    render() {
        return (
            <Layout>
                <Header className="header">实验室常用信息汇总</Header>
                <Content className="doc-content">
                    <Card
                        className="doc-card"
                        actions={[
                            <EditOutlined key="edit"/>,
                            <DeleteOutlined key="delete"/>,
                        ]} >
                        <Meta title="halo" description="this is a test"></Meta>
                    </Card>
                    <Card
                        className="doc-card"
                        actions={[
                            <EditOutlined key="edit"/>,
                            <DeleteOutlined key="delete"/>,
                        ]} >
                        <Meta title="halo" description="this is a test"></Meta>
                    </Card>
                </Content>
            </Layout>
        );
    }
};

