import React from 'react';
import { Component } from "react";
import { Button, Input, Layout, message } from 'antd';
import './styles/App.css';
import SiderMenu from './SiderMenu';
import { Switch, Route, Link } from 'react-router-dom';
import DocEditor from './pages/docEditor';
import DocPage from './pages/doc';
import HomePage from './pages/home';
import CloudDisk from './pages/cloudDisk';
import ClipboardPage from './pages/clipboard';
import CCfSearchPage from './pages/ccfSearch';
import { getUserIdentity, setUserIdentity } from './utils';
import { client } from "./client";

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
            "title": "实验室常用信息", // parent node has no [page], [alias] and [path] prop
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
            "page": CloudDisk,
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
    constructor(props) {
        super(props);
        this.mannualVerify = this.mannualVerify.bind(this);
        this.state = {
            username: "",
            password: "",
            verified: false,
            loading: true
        }
    }

    componentDidMount() {
        let userIdentity = getUserIdentity();
        if (userIdentity != null) {
            client.verifyUser(userIdentity.username, userIdentity.password)
                .then((v) => {
                    if (v.ok) {
                        this.setState({ verified: true, loading: false });
                    } else {
                        message.info("身份信息已失效");
                        this.setState({ loading: false });
                    }
                }).catch(reason => {
                    message.error("网络错误: " + reason);
                    this.setState({ loading: false });
                });
        } else {
            message.info("需要认证身份");
            this.setState({ loading: false });
        }
    }

    mannualVerify() {
        const username = this.state.username;
        const password = this.state.password;
        client.verifyUser(username, password)
            .then((v) => {
                if (v.ok) {
                    setUserIdentity(username, password);
                    this.setState({ verified: true });
                } else {
                    message.error("身份信息错误");
                }
            }).catch(reason => {
                message.error("网络错误:" + reason);
            });
    }

    render() {
        if (this.state.loading) {
            return <div className="loading-holder">请稍等...</div>;
        }
        if (this.state.verified) {
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
            return (
                <Layout className="app">
                    <Sider className="sider"
                        breakpoint="lg"
                        theme="light"
                        zeroWidthTriggerStyle={{ zIndex: 100, boxShadow: "lightGray 1px 1px 18px" }}
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
        } else {
            const onNameChange = (ev) => this.setState({ username: ev.target.value });
            const onPasswdChange = (ev) => this.setState({ password: ev.target.value });
            return (
                <div className="identify-holder">
                    <span><strong>身份认证</strong></span>
                    <Input onChange={onNameChange} placeholder="T440B服务器的用户名"></Input>
                    <Input.Password onChange={onPasswdChange} placeholder="密码"></Input.Password>
                    <Button onClick={this.mannualVerify}>验证</Button>
                    <span style={{ fontSize: "medium" }}>将/etc/shadow复制到网站容器以更新信息</span>
                </div>
            );
        }
    }
}
