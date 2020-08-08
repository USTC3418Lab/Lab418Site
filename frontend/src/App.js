import React from 'react';
import { Component } from "react";
import { Layout } from 'antd';
import './styles/App.css';
import SiderMenu from './SiderMenu';
import { Switch, Route, BrowserRouter as Router, Link } from 'react-router-dom';
import DocEditor from './pages/docEditor';
import ClipboardPage from './pages/clipboard';
import DocPage from './pages/doc';

const { Header, Sider } = Layout;

class RouteDispatcher extends Component {
    render() {
        const path2Page = {
            "/page/doc": <DocPage />,
            "/page/doc-editor": <DocEditor />,
            "/page/clipboard": <ClipboardPage />
        };
        return path2Page[this.props.path || "/doc"];
    }
}

export default class App extends Component {
    // Todo 可以通过 RouteWithSubRoutes 方式构建 菜单Menu 和 路由Switch 从而避免耦合
    render() {
        const paths = ["/page/doc", "/page/doc-editor", "/page/clipboard"];
        const titles = ["实验室常用信息", "所有信息", "添加信息", "剪贴板"];
        const RouteList = ({ paths }) => (
            <>
                {paths.map((path, index) => (
                    <Route key={index} path={path}>
                        <RouteDispatcher path={path} />
                    </Route>
                ))}
            </>
        );
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
