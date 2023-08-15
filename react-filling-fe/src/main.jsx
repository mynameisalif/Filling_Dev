import React from 'react'
import ReactDOM from 'react-dom/client'
import Routes from './routes'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from "react-auth-kit";
import { ConfigProvider } from 'antd';


import "./styles/global.scss"
// import 'antd/dist/antd.dark.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider
        authType={"cookie"}
        authName={"_auth"}
        cookieDomain={window.location.hostname}
        cookieSecure={window.location.protocol === "https:"}
      >
    <ConfigProvider   theme={{ hashed: false }}>
      <BrowserRouter>
          <Routes />
      </BrowserRouter>
    </ConfigProvider>
    </AuthProvider>
  </React.StrictMode>,
)
