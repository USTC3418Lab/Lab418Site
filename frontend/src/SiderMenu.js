import React, { Component } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom'

const { SubMenu } = Menu;

export default class SiderMenu extends Component {

    handleClick = e => this.setState({ current: e.key });

    render() {
        const route2MenuWrapper = this.props.route2MenuWrapper;
        var currentKey = 0;
        return <Menu
            siderCollapsed
            theme={'light'}
            onClick={this.handleClick}
            defaultOpenKeys={['sub1']}
            selectedKeys={route2MenuWrapper.getIndexByPath(this.props.location.pathname).toString() || '0'}
            mode="inline" >
            {route2MenuWrapper.allRoutes.map((path, index) => {
                if (path.notMenu)
                    return null;
                var res;
                if (path.child) {
                    res = <SubMenu
                        key={"sub" + index}
                        title={path.title}>
                        {path.child.map((childpath, index) => {
                            var tmpRes = <Menu.Item key={currentKey}>
                                <Link to={childpath.path}>{childpath.title}</Link>
                            </Menu.Item>
                            currentKey++;
                            return tmpRes;
                        })}
                    </SubMenu>
                } else {
                    res = <Menu.Item key={currentKey}>
                        <Link to={path.path}>{path.title}</Link>
                    </Menu.Item>
                    currentKey++;
                }
                return res;
            })}
        </Menu>
        // const path2All = this.props.path2All;
        // return (
        //     <>
        //         <Menu
        //             siderCollapsed
        //             theme={'light'}
        //             onClick={this.handleClick}
        //             defaultOpenKeys={['sub1']}
        //             selectedKeys={path2All.getIndexByPath(this.props.location.pathname).toString() || '0'}
        //             mode="inline" >
        //             <Menu.Item key="0">
        //                 <Link to={path2All.getPath(0)}>{path2All.getTitle(0)}</Link>
        //             </Menu.Item>
        //             <SubMenu key="sub1" title={path2All.getFatherTitle(1)}>
        //                 <Menu.Item key="1">
        //                     <Link to={path2All.getPath(1)}>{path2All.getTitle(1)}</Link>
        //                 </Menu.Item>
        //                 <Menu.Item key="2">
        //                     <Link to={path2All.getPath(2)}>{path2All.getTitle(2)}</Link>
        //                 </Menu.Item>
        //             </SubMenu>
        //             <Menu.Item key="3">
        //                 <Link to={path2All.getPath(3)}>{path2All.getTitle(3)}</Link>
        //             </Menu.Item>
        //             <Menu.Item key="4">
        //                 <Link to={path2All.getPath(4)}>{path2All.getTitle(4)}</Link>
        //             </Menu.Item>
        //             <Menu.Item key="5">
        //                 <Link to={path2All.getPath(5)}>{path2All.getTitle(5)}</Link>
        //             </Menu.Item>
        //         </Menu>
        //     </>
        // );
    }
}