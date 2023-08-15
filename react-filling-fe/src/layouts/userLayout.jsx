import React, { useState } from 'react';
import { Space, Avatar, Button, Popover } from 'antd';
import { Outlet, Link } from 'react-router-dom';
import { menus } from '../const/menu';
import { LaptopOutlined, NotificationOutlined, DeploymentUnitOutlined, CompressOutlined, PoweroffOutlined, SettingOutlined, DownOutlined, CloseOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import VerticalLogo from '../assets/logo/vertical_logo.png';
import Waves from '../assets/img/waves.jpg';
import MenuAtom from '../components/atoms/menu/menu';
import { LiaSignOutAltSolid } from 'react-icons/lia';

import { RxDashboard } from 'react-icons/rx';
import { CiMonitor } from 'react-icons/ci';
import { AiOutlineUser } from 'react-icons/ai';
import { useSignOut as logout, useAuthUser } from 'react-auth-kit';

import {BASEURLIMG} from "../../config/config"


const { Header, Content, Sider } = Layout;

const UserLayout = () => {
  // const {
  //   token: { colorBgContainer },
  // } = theme.useToken();
  const [collapsed, setCollapse] = useState(false);
  const auth = useAuthUser();
  const signout = logout();

  console.log(auth());

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
                <Link to="profile" style={{ display: 'flex', margin: '1em', alignItems: 'center', color: 'rgba(1, 1,1, 0.5)' }}>
                  <AiOutlineUser /> &nbsp;Profile
                </Link>
                <Link to="yours" style={{ display: 'flex', margin: '1em', alignItems: 'center', color: 'rgba(1, 1,1, 0.5)' }}>
                  <CiMonitor /> &nbsp;Your Workshop
                </Link>
                <Link to="workshop" style={{ display: 'flex', margin: '1em', alignItems: 'center', color: 'rgba(1, 1,1, 0.5)' }}>
                  <CiMonitor /> &nbsp;Workshop
                </Link>
                <Link
                  to="/login"
                  onClick={() => {
                    signout();
                  }}
                  style={{ display: 'flex', margin: '1em', alignItems: 'center', color: 'rgba(1, 1,1, 0.5)' }}
                >
                  <LiaSignOutAltSolid /> &nbsp;Signout
                </Link>
              </>
            }
            trigger="click"
          >
            <Space size="middle">
              <Avatar size="large" src={`${BASEURLIMG}/User/${auth().img}`} />
              <DownOutlined style={{ color: 'lightgray' }} />
            </Space>
          </Popover>
        </div>
      </Header>
      <Layout>
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
export default UserLayout;
