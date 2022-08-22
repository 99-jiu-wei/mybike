import React, { Component } from 'react'
import { Menu } from 'antd';
import './index.less'
import MenuList from '../../config/menuConfig'
import { NavLink } from 'react-router-dom';
const SubMenu = Menu.SubMenu;

export default class NavLeft extends Component {
    UNSAFE_componentWillMount() {
        const menuTreeNode = this.renderMenu(MenuList)
        this.setState({ menuTreeNode })
    }
    renderMenu = (data) => {
        return data.map((item) => {
            if (item.children) {
                return (
                    <SubMenu title={item.title} key={item.key}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return (<Menu.Item title={item.title} key={item.key}>
                <NavLink to={item.key}>{item.title}</NavLink>
            </Menu.Item>)
        })
    }
    render() {
        return (
            <div>
                <div className='logo'>
                    <img src="/assets/logo-antd.svg" alt=''></img>
                    <h1>Imooc MS</h1>
                </div>

                <Menu theme='dark'
                    mode="vertical"
                >
                    {this.state.menuTreeNode}
                </Menu>
            </div>
        )
    }
}
