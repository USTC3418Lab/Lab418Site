import React from 'react';
import { Component } from "react";
import { Layout } from 'antd';
import './App.css';
import SiderMenu from './SiderMenu';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import DocEditor from './pages/docEditor';
import ClipboardPage from './pages/clipboard';
import DocPage from './pages/doc';

const { Header, Sider } = Layout;

class RouteDispatcher extends Component {
    render() {
        const path2Page = {
            "/doc": <DocPage />,
            "/doc-editor": <DocEditor />,
            "/clipboard": <ClipboardPage />
        };
        return path2Page[this.props.path || "/doc"];
    }
}

export class App extends Component {
    // Todo 可以通过 [遍历多级数组] 方式构建 菜单Menu 和 路由Switch 从而避免耦合
    render() {
        const paths = ["/doc", "/doc-editor", "/clipboard"];
        const titles = ["实验室常用信息", "所有信息", "添加信息", "剪贴板"];
        const SwitchList = ({ paths }) => (
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
                        <Header className="sider-title">Lab3418</Header>
                        <SiderMenu paths={paths} titles={titles} />
                    </Sider>
                    <Layout className="app-body">
                        <Switch>
                            <SwitchList paths={paths} />
                        </Switch>
                    </Layout>
                </Router>
            </Layout>);
    }
}

export default App;
