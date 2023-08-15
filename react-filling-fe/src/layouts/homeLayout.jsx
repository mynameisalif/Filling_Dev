import React, { useState } from 'react';
import { Space, Avatar, Button } from 'antd';
import { Outlet, Link } from 'react-router-dom';
import { menus } from '../const/menu';
import { LaptopOutlined, NotificationOutlined, DeploymentUnitOutlined, CompressOutlined, PoweroffOutlined, SettingOutlined, DownOutlined, CloseOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import VerticalLogo from '../assets/logo/vertical_logo.png';
import Waves from '../assets/img/waves.jpg';
import MenuAtom from '../components/atoms/menu/menu';
import { HashLink } from 'react-router-hash-link';
import { useMediaQuery } from 'react-responsive';

import { RxDashboard } from 'react-icons/rx';
import './home.style.scss';

const { Header, Content, Sider } = Layout;

const HomeLayout = () => {
  const isMobile = useMediaQuery({
    query: '(max-width: 768px)',
  });

  const [collapsed, setCollapse] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Header className="header-container">
        <div className="header-content">
          <span style={{ display: 'inline-flex', gap: '5px', alignItems: 'center', fontWeight: 'bold', fontSize: '24px', fontFamily: 'Josefin Sans, sans-serif' }}>
            <RxDashboard style={{ color: '#a01996' }} />
            <span style={{ color: '#a01996' }}> Filing </span>
            {/* <span>Dev</span> */}
          </span>

          {!isMobile && (
            <Space size="middle">
              {/* <Link to="/home/#home">Home</Link> */}
              <HashLink className="nav-link active" aria-current="page" to="/#hero">
                Home
              </HashLink>
              <HashLink className="nav-link active" aria-current="page" to="/#about">
                About
              </HashLink>
              <HashLink className="nav-link active" aria-current="page" to="/#workshop">
                Workshop
              </HashLink>
              <HashLink className="nav-link active" aria-current="page" to="/#faq">
                FAQ
              </HashLink>
              <HashLink className="nav-link active" aria-current="page" to="/#contact">
                Contact
              </HashLink>

              {/* <Link to="/home/#about">About</Link> */}
              <Link></Link>
              <Link to="/login">Sign in</Link>
            </Space>
          )}

          {isMobile && isMenuOpen && (
            <div className={`nav-links active`}>
              <Space size="middle">
                <HashLink className="nav-link active" aria-current="page" to="/#hero">
                  Home
                </HashLink>
                <HashLink className="nav-link active" aria-current="page" to="/#about">
                  About
                </HashLink>
                <HashLink className="nav-link active" aria-current="page" to="/#workshop">
                  Workshop
                </HashLink>
                <HashLink className="nav-link active" aria-current="page" to="/#faq">
                  FAQ
                </HashLink>
                <HashLink className="nav-link active" aria-current="page" to="/#contact">
                  Contact
                </HashLink>

                {/* <Link to="/home/#about">About</Link> */}
                <Link></Link>
                <Link to="/login">Sign in</Link>
              </Space>
            </div>
          )}

          {isMobile && (
            <div className="menu-icon" onClick={toggleMenu}>
              <div className={`bar ${isMenuOpen ? 'active' : ''}`} />
              <div className={`bar ${isMenuOpen ? 'active' : ''}`} />
              <div className={`bar ${isMenuOpen ? 'active' : ''}`} />
            </div>
          )}
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
export default HomeLayout;
