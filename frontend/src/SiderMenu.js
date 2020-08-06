import React, { Component } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom'

const { SubMenu } = Menu;

export default class SiderMenu extends Component {
    state = { theme: 'light', current: '1' };

    handleClick = e => this.setState({ current: e.key });

    render() {
        const paths = this.props.paths || [];
        const titles = this.props.titles || [];
        return (
            <>
                <Menu
                    theme={this.state.theme}
                    onClick={this.handleClick}
                    defaultOpenKeys={['sub1']}
                    selectedKeys={[this.state.current]}
                    mode="inline" >
                    <SubMenu key="sub1" title={titles[0]}>
                        <Menu.Item key="1">
                            <Link to={paths[0]}>{titles[1]}</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to={paths[1]}>{titles[2]}</Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="sub2">
                        <Link to={paths[2]}>{titles[3]}</Link>
                    </Menu.Item>
                </Menu>
            </>
        );
    }
}