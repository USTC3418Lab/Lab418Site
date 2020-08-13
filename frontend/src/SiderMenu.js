import React, { Component } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom'

const { SubMenu } = Menu;

export default class SiderMenu extends Component {

    handleClick = e => this.setState({ current: e.key });

    render() {
        const path2All = this.props.path2All;
        return (
            <>
                <Menu
                    theme={'light'}
                    onClick={this.handleClick}
                    defaultOpenKeys={['sub1']}
                    selectedKeys={path2All.getIndexByPath(this.props.location.pathname).toString() || '0'}
                    mode="inline" >
                    <Menu.Item key="0">
                        <Link to={path2All.getPath(0)}>{path2All.getTitle(0)}</Link>
                    </Menu.Item>
                    <SubMenu key="sub1" title={path2All.getFatherTitle(1)}>
                        <Menu.Item key="1">
                            <Link to={path2All.getPath(1)}>{path2All.getTitle(1)}</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to={path2All.getPath(2)}>{path2All.getTitle(2)}</Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="3">
                        <Link to={path2All.getPath(3)}>{path2All.getTitle(3)}</Link>
                    </Menu.Item>
                </Menu>
            </>
        );
    }
}