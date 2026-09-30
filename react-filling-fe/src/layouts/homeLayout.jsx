import { useState } from 'react';
import { Space, Layout } from 'antd';
import { Outlet, Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useMediaQuery } from 'react-responsive';
import { useIsAuthenticated, useAuthUser, useSignOut } from 'react-auth-kit';
import AuthStore from '../stores/auth';
import { RxDashboard } from 'react-icons/rx';
import './home.style.scss';

const { Header, Content } = Layout;

const HomeLayout = () => {
  const isMobile = useMediaQuery({
    query: '(max-width: 768px)',
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAuthenticated = useIsAuthenticated();
  const auth = useAuthUser();
  const signout = useSignOut();
  const { roles } = AuthStore();

  const isAuth = isAuthenticated();
  const currentUser = isAuth ? auth() : null;
  const dashboardLink = currentUser?.role_id === roles.ADMIN ? '/app/workshop' : '/user/workshop';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = () => {
    signout();
    setIsMenuOpen(false);
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Header className="header-container">
        <div className="header-content">
          <span style={{ display: 'inline-flex', gap: '5px', alignItems: 'center', fontWeight: 'bold', fontSize: '24px', fontFamily: 'Josefin Sans, sans-serif' }}>
            <RxDashboard style={{ color: '#a01996' }} />
            <span style={{ color: '#a01996' }}> Filing </span>
          </span>

          {!isMobile && (
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

              {isAuth ? (
                <>
                  <Link to={dashboardLink} className="nav-link active" style={{ fontWeight: 600, color: '#a01996' }}>
                    Dashboard
                  </Link>
                  <a
                    onClick={handleSignOut}
                    className="nav-link"
                    style={{ cursor: 'pointer', color: '#ff4d4f' }}
                  >
                    Sign out
                  </a>
                </>
              ) : (
                <Link to="/login" className="nav-link active" style={{ fontWeight: 600, color: '#a01996' }}>
                  Sign in
                </Link>
              )}
            </Space>
          )}

          {isMobile && isMenuOpen && (
            <div className={`nav-links active`}>
              <Space size="middle" direction="vertical">
                <HashLink className="nav-link active" aria-current="page" to="/#hero" onClick={() => setIsMenuOpen(false)}>
                  Home
                </HashLink>
                <HashLink className="nav-link active" aria-current="page" to="/#about" onClick={() => setIsMenuOpen(false)}>
                  About
                </HashLink>
                <HashLink className="nav-link active" aria-current="page" to="/#workshop" onClick={() => setIsMenuOpen(false)}>
                  Workshop
                </HashLink>
                <HashLink className="nav-link active" aria-current="page" to="/#faq" onClick={() => setIsMenuOpen(false)}>
                  FAQ
                </HashLink>
                <HashLink className="nav-link active" aria-current="page" to="/#contact" onClick={() => setIsMenuOpen(false)}>
                  Contact
                </HashLink>

                {isAuth ? (
                  <>
                    <Link to={dashboardLink} className="nav-link active" onClick={() => setIsMenuOpen(false)} style={{ fontWeight: 600, color: '#a01996' }}>
                      Dashboard
                    </Link>
                    <a
                      onClick={handleSignOut}
                      className="nav-link"
                      style={{ cursor: 'pointer', color: '#ff4d4f' }}
                    >
                      Sign out
                    </a>
                  </>
                ) : (
                  <Link to="/login" className="nav-link active" onClick={() => setIsMenuOpen(false)} style={{ fontWeight: 600, color: '#a01996' }}>
                    Sign in
                  </Link>
                )}
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
