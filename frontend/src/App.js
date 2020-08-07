import React from 'react';
import { Component } from "react";
import { Layout } from 'antd';
import './styles/App.css';
import SiderMenu from './SiderMenu';
import { Switch, Route, BrowserRouter as Router, Link } from 'react-router-dom';
import DocEditor from './pages/docEditor';
import ClipboardPage from './pages/clipboard';
import DocPage from './pages/doc';
import HomePage from './pages/home';

const { Header, Sider } = Layout;

const path2page = (path) => {
    switch (path) {
        case "/page/doc":
            return DocPage;
        case "/page/doc-editor":
            return DocEditor;
        case "/page/clipboard":
            return ClipboardPage;
        case "/":
        default:
            return HomePage;
    }
};

export default class App extends Component {
    render() {
        const paths = ["/", "/page/doc", "/page/doc-editor", "/page/clipboard"];
        const titles = ["首页", "实验室常用信息", "所有信息", "添加信息", "剪贴板"];
        const RouteList = ({ paths }) => (<>
            {paths.map((path, index) => (
                <Route key={index} path={path} exact={true} component={path2page(path)}/>
            ))}
        </>);
        return (
            <Layout className="app">
                <Router>
                    <Sider className="sider" >
                        <Header className="header">
                            <Link onSelect={() => false} to={paths[0]} className="sider-title">Lab&nbsp;3418</Link>
                        </Header>
                        <SiderMenu paths={paths} titles={titles} />
                    </Sider>
                    <Layout className="app-body">
                        <Switch>
                            <RouteList paths={paths} />
                        </Switch>
                    </Layout>
                </Router>
            </Layout>);
    }
}
