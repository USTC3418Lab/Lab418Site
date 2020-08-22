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
import CCfSearchPage from './pages/ccfSearch';

const { Header, Sider } = Layout;


const route2MenuWrapper = {
    allRoutes: [
        {
            "path": "/",
            "page": HomePage,
            "title": "首页",
            "alias": new Set(["/index.html"])
        },
        {
            "title": "实验室常用信息",
            "child": [
                {
                    "path": "/page/doc",
                    "page": DocPage,
                    "title": "常用信息",
                },
                {
                    "path": "/page/doc-editor",
                    "page": DocEditor,
                    "title": "添加信息",
                }
            ]
        },
        {
            "path": "/page/temp-cloud-disk",
            "page": TempCloudDisk,
            "title": "内部网盘",
        },
        {
            "path": "/page/clipboard",
            "page": ClipboardPage,
            "title": "剪贴板",
        },
        {
            "path": "/page/ccf-search",
            "page": CCfSearchPage,
            "title": "CCF类别检索",
        },
        {
            "path": "/page/doc-update",
            "page": DocEditor,
            "notMenu": true
        },
    ],
    getIndexByPath(path) {
        var k = 0;
        for (let i = 0; i < this.allRoutes.length; i++) {
            const route = this.allRoutes[i];
            if (route.child) {
                for (let j = 0; j < route.child.length; j++) {
                    // should check childRoute alias too
                    if (route.child[j].path === path)
                        return k;
                    k++;
                }
            }
            else {
                if (route.path === path || (route.alias && route.alias.has(path)))
                    return k;
                k++;
            }
        }
        return 0;
    }
}

export default class App extends Component {
    render() {
        var routeList = [], k = 0;
        route2MenuWrapper.allRoutes.map((route, index) => {
            if (route.child) {
                route.child.forEach((childRoute, index) => {
                    routeList.push(
                        <Route key={k} exact={true}
                            path={childRoute.path}
                            component={childRoute.page} />
                    );
                    k++;
                })
            } else {
                routeList.push(
                    <Route key={k} exact={true}
                        path={route.path}
                        component={route.page} />
                );
                k++;
                if (route.alias)
                    route.alias.forEach((v) => {
                        routeList.push(<Route key={k} exact={true}
                            path={v}
                            component={route.page} />
                        );
                        k++;
                    })
            }
            return 0;
        });
        console.log("app, routeList: ", routeList);
        return (
            <Layout className="app">
                <Sider className="sider"
                    breakpoint="lg"
                    theme="light"
                    collapsedWidth="0" >
                    <Header className="header">
                        <Link
                            onSelect={() => false}
                            to={route2MenuWrapper.allRoutes[0].path}
                            className="sider-title">
                            Lab&nbsp;3418
                        </Link>
                    </Header>
                    <Route path={'/'} render={(routeProps) => (
                        <SiderMenu
                            {...routeProps}
                            route2MenuWrapper={route2MenuWrapper} />
                    )} />
                </Sider>
                <Layout className="app-body">
                    <Switch>
                        {/* <>
                            {pathList.map((path, index) => (
                                <Route
                                    key={index} path={path} exact={true}
                                    component={path2All.getPageByPath(path)} />
                            ))}
                        </> */}
                        {routeList}
                    </Switch>
                </Layout>
            </Layout>);
    }
}
