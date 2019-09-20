import React from 'react';
import { Layout, Menu, Icon, Input } from 'antd';
import {SearchResult} from '../../containers/SearchCont'
const { Header} = Layout;
const { SubMenu } = Menu;


export default class NavTop extends React.Component {
  state = {
    current: 'mail',
  };
  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };
  render() {
    console.log(this.props)
    return (
      <Header style={{background: '#fff', padding: 0}}>
        <Menu style={{maxHeight: 65, display: 'flex', lineHeight: '64px'}} onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
          <Menu.Item key="logo" style={{fontWeight: 'bolder', fontSize: 26}}>
            <Icon type="code" style={{fontSize: 22}} />
            Dashboard
          </Menu.Item>
          <SearchResult location={this.props.location} />
          <SubMenu
            style={{marginLeft: 'auto'}}
            title={
              <span className="submenu-title-wrapper">
                <Icon type="user" />
                User
              </span>
            }
          >
            <Menu.ItemGroup title="General">
              <Menu.Item key="setting:1">System Settings</Menu.Item>
              <Menu.Item key="setting:2">Theme</Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup title="User">
              <Menu.Item key="setting:3">Settings</Menu.Item>
              <Menu.Item key="setting:4">Log Out</Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>
        </Menu>
      </Header>
    );
  }
}
