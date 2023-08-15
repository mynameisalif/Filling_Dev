import React, { useState } from 'react';
import { Space, Avatar, Button, Popover } from 'antd';
import { Outlet, Link } from 'react-router-dom';
import { menus } from '../const/menu';
import { LaptopOutlined, NotificationOutlined, DeploymentUnitOutlined, CompressOutlined, PoweroffOutlined, SettingOutlined, DownOutlined, CloseOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import VerticalLogo from '../assets/logo/vertical_logo.png';
import Waves from '../assets/img/waves.jpg';
import MenuAtom from '../components/atoms/menu/menu';
import { RxDashboard } from 'react-icons/rx';
import { LiaSignOutAltSolid } from 'react-icons/lia';
import { useSignOut as logout, useAuthUser } from 'react-auth-kit';

import {BASEURLIMG} from "../../config/config"

const { Header, Content, Sider } = Layout;

const DashboardLayout = () => {
  // const {
  //   token: { colorBgContainer },
  // } = theme.useToken();
  const auth = useAuthUser();
  const [collapsed, setCollapse] = useState(false);
  const signout = logout();

  return (
    <Layout style={{ height: '100vh' }}>
      <Header className="header-container">
        <div className="header-content">
          <span style={{ display: 'inline-flex', gap: '5px', alignItems: 'center', fontWeight: 'bold', fontSize: '18px', fontFamily: 'Josefin Sans, sans-serif' }}>
            <RxDashboard style={{ color: '#a01996' }} />
            <span style={{ color: '#a01996' }}> Filing </span>
            {/* <span>Dev</span> */}
          </span>
          <Popover
            placement="bottomRight"
            title={''}
            content={
              <>
                <Link
                  to="/login"
                  onClick={() => {
                    signout();
                  }}
                  style={{ display: 'flex', alignItems: 'center', color: 'rgba(1, 1,1, 0.5)' }}
                >
                  <LiaSignOutAltSolid /> &nbsp;Signout
                </Link>
              </>
            }
            trigger="click"
          >
            <Space size="middle">
              {/* <Avatar size="large" src="https://eyemartnepal.com/wp-content/uploads/2019/05/Screenshot_20200303-215853__01.jpg"/> */}
              <Avatar size="large" src={`${BASEURLIMG}/User/${auth().img}`} />

              <DownOutlined style={{ color: 'lightgray' }} />
            </Space>
          </Popover>
        </div>
      </Header>
      <Layout>
        <Sider
          width={220}
          className="sidebar-container"
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
          // collapsible
          // collapsed={collapsed}
          style={
            {
              // background: colorBgContainer,
              // backgroundImage:'url(../assets/img/sidebaropen.svg)'
            }
          }
        >
          {/* <div className='container-collapse'>
              <Button  onClick={()=>{
                setCollapse(!collapsed)
              
                }} className="icon-sidebar">
                  <CloseOutlined />
              </Button>
          </div> */}
          {/* <div className='container-menu'> */}
          <MenuAtom items={menus}></MenuAtom>
          {/* </div>         */}
        </Sider>
        <Layout
          style={{
            padding: 0,
          }}
        >
          <Content
            style={{
              margin: 0,
              height: 'calc(100vh - 100px)',
              minHeight: 280,
              padding: '1em',
              backgroundColor: 'rgba(255,225,255,0',
              overflowY: 'auto',
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default DashboardLayout;
