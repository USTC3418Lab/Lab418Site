import React, { Component } from 'react';
import { Layout } from 'antd';
import '../styles/homepage.css'

const { Header } = Layout;

export default class HomePage extends Component {
    render() {
        return <Layout className="homepage">
            <Header className="header">实验室内部网站</Header>
            <div style={{ display: "flex", flex: 1 }}>
                <span className="homepage-content">
                    <span>418实验室内部网站</span>
                    <br />
                    <span>I have an idea -- </span>
                    <a href="https://github.com/USTCNoZeng418Lab/Lab418Site" target="_">我要参与</a>
                    <br />
                    <br />
                    <span>开发人员</span>
                    <br />
                    <a href="https://github.com/EricJeffrey" target="_">EricJeffrey</a>
                    <br />
                    <a href="https://github.com/buttercannfly/" target="_">Buttercannfly</a>
                </span>
            </div>
        </Layout>;
    }
};
