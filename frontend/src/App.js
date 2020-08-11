import React from 'react';
import { Component } from "react";
import { Layout } from 'antd';
import './styles/App.css';
import SiderMenu from './SiderMenu';
import { Switch, Route, Link, useLocation } from 'react-router-dom';
import DocEditor from './pages/docEditor';
import ClipboardPage from './pages/clipboard';
import DocPage from './pages/doc';
import HomePage from './pages/home';

const { Header, Sider } = Layout;

export function AppWrapper() {
    return <App pathName={useLocation().pathname} />;
}

const pathList = ["/", "/page/doc", "/page/doc-editor", "/page/clipboard", "/page/doc-update"];
const path2All = {
    mapper: {
        "/index.html": { page: HomePage, menuIndex: 0, title: "首页" },
        "/": { page: HomePage, menuIndex: 0, title: "首页" },
        "/page/doc": { page: DocPage, menuIndex: 1, title: "所有信息", fatherTitle: "实验室常用信息" },
        "/page/doc-editor": { page: DocEditor, menuIndex: 2, title: "添加信息" },
        "/page/clipboard": { page: ClipboardPage, menuIndex: 3, title: "剪贴板" },
        "/page/doc-update": { page: DocEditor, menuIndex: 1, title: "" },
    },
    getPath(index) { return pathList[index] },
    getPage(index) { return this.mapper[pathList[index]] },
    getPageByPath(path) { return this.mapper[path].page },
    getTitle(index) { return this.mapper[pathList[index]].title },
    getFatherTitle(index) { return this.mapper[pathList[index]].fatherTitle },
    getIndexByPath(path) { return this.mapper[path].menuIndex }
};

export default class App extends Component {
    render() {
        var menuSelectedIndex = path2All.getIndexByPath(this.props.pathName) || 0;
        return (
            <Layout className="app">
                <Sider className="sider" >
                    <Header className="header">
                        <Link
                            onSelect={() => false}
                            to={path2All.getPage(0)}
                            className="sider-title">
                            Lab&nbsp;3418
                        </Link>
                    </Header>
                    <SiderMenu
                        menuSelectedIndex={menuSelectedIndex}
                        path2All={path2All} />
                </Sider>
                <Layout className="app-body">
                    <Switch>
                        <>
                            {pathList.map((path, index) => (
                                <Route
                                    key={index} path={path} exact={true}
                                    component={path2All.getPageByPath(path)} />
                            ))}
                        </>
                    </Switch>
                </Layout>
            </Layout>);
    }
}
