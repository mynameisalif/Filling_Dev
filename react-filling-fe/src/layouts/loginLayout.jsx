import React from 'react'
import { Form, Col, Row, Checkbox, Input, Button, message } from 'antd'

import VerticalLogo from "../assets/logo/logo-login.svg";
const LoginLayout = () => {
  
  const [form] = Form.useForm();
  return (
    <div className='page-login'>
      <div className='login-content'>
        <Row style={{ height: '100%' }}>
          <Col sm={16}>
            <div className='login-content-sub'>
              <div style={{ marginTop: 20, textAlign: 'center'}}>
                <img src={VerticalLogo} height={"58px"} alt=''></img>
              </div>
              <h1>Log in</h1>
              <span style={{marginTop:-12, color:'#B8B8B8',fontSize: '21px'}}>Please log in first to use Smart Planning application</span>
              <Form
                form={form}
                layout="vertical"
                onFinish={null}
                autoComplete="on"
                style={{ textAlign: 'left' }}
              >
                <Form.Item
                  name="userid"
                  label={ <h2 style={{fontSize:16, margin:'14px 0px 0px 0px'}}>User id</h2> }
                >
                  <Input placeholder="John Doe" />
                </Form.Item>
                <Form.Item
                  name="password"
                  label={ <h2 style={{fontSize:16, margin:0}}>Password</h2> }
                  style={{margin:'5px 0px'}}
                >
                  <Input.Password placeholder="********" />
                </Form.Item>
                <Row>
                  <Col sm={12}>
                    <Checkbox onChange={null} style={{fontSize:12}}>Remember Me</Checkbox>
                  </Col>
                  
                  <Col sm={12} style={{textAlign:'right'}}>
                    <a style={{color:'#CB0022'}} href="#">Forgot Password?</a>
                  </Col>

                </Row>

                <Form.Item>
                  <Button className='btn-primary' loading={false} style={{ width: "100%", height: "42px", marginTop: 16 }} type="primary" htmlType="submit">
                    Login
                  </Button>
                </Form.Item>

                
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default LoginLayout;