import React from 'react';
import { Component } from "react";
import { Layout } from 'antd';
import './styles/App.css';
import SiderMenu from './SiderMenu';
import { Switch, Route, Link } from 'react-router-dom';
import DocEditor from './pages/docEditor';
import DocPage from './pages/doc';
import HomePage from './pages/home';
import TempCloudDisk from './pages/tempCloudDisk';
import ClipboardPage from './pages/clipboard';
import ccfSearchPage from './pages/ccfSearch';

const { Header, Sider } = Layout;

const pathList = ["/", "/page/doc", "/page/doc-editor", "/page/temp-cloud-disk", "/page/clipboard", "/page/ccf-search", "/page/doc-update"];

const path2All = {
    mapper: {
        "/index.html": { page: HomePage, menuIndex: 0, title: "首页" },
        "/": { page: HomePage, menuIndex: 0, title: "首页" },
        "/page/doc": { page: DocPage, menuIndex: 1, title: "所有信息", fatherTitle: "实验室常用信息" },
        "/page/doc-editor": { page: DocEditor, menuIndex: 2, title: "添加信息" },
        "/page/temp-cloud-disk": { page: TempCloudDisk, menuIndex: 3, title: "临时网盘" },
        "/page/clipboard": { page: ClipboardPage, menuIndex: 4, title: "剪贴板" },
        "/page/ccf-search": { page: ccfSearchPage, menuIndex: 5, title: "CCF类别检索" },
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
        return (
            <Layout className="app">
                <Sider className="sider"
                    breakpoint="lg"
                    theme="light"
                    collapsedWidth="0" >
                    <Header className="header">
                        <Link
                            onSelect={() => false}
                            to={path2All.getPage(0)}
                            className="sider-title">
                            Lab&nbsp;3418
                        </Link>
                    </Header>
                    <Route path={'/'} render={(routeProps) => (
                        <SiderMenu {...routeProps} path2All={path2All} />
                    )} />
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
