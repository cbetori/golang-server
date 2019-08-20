import React from 'react';
import { Link } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'

const { Sider } = Layout;
const { SubMenu } = Menu;


export default class NavSide extends React.Component {
  state = {
    collapsed: false,
    navWidth:  200
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
    if (this.state.navWidth === 200){
      this.setState({navWidth: 80})
    }else{
      this.setState({navWidth: 200})
    }
    
  };

  render() {
    return (
      <Layout  style={{maxWidth: this.state.navWidth, minHeight: "100vh"}}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item className='navlink' key="1">
              <Icon type="pie-chart" />
              <span>
                <Link className='navlink' to='/'> Home </Link>
              </span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                <Icon type="user" />
                <span>
                    <Link className='navlink' to='/investors'> Investors </Link>
                </span>
                </span>
              }
            >
              <Menu.Item key="3">Distributions</Menu.Item>
              <Menu.Item key="4">Transfer</Menu.Item>
              <Menu.Item key="5">Upload</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="team" />
                  <span>Properties</span>
                </span>
              }
            >
              <Menu.Item key="6">Pipeline</Menu.Item>
              <Menu.Item key="8">Performance</Menu.Item>
            </SubMenu>
            <Menu.Item key="2">
              <Icon type="desktop" />
              <span>
              <Link className='navlink' to='/cashflows'> Cashflows </Link>
              </span>
            </Menu.Item>
          </Menu>
        </Sider>
      </Layout>
    );
  }
}

