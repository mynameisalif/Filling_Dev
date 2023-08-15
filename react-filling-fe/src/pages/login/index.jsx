import { Button, Checkbox, Form, Input, message } from "antd";
import { useState, useEffect } from "react";
import "./style.scss";
import { Link , useNavigate } from "react-router-dom";
import Wallpaper from "../../assets/img/wallpaper.jpg";
import AuthStore from "../../stores/auth";
import { setRememberMeData, getRememberMeData, clearRememberMeData } from '../../utils/useRemember';
import { useSignIn , useIsAuthenticated } from 'react-auth-kit'
import { MdOutlineArrowBack } from 'react-icons/md';




const Login = () => {
  const signIn = useSignIn()
  const isAuthenticated = useIsAuthenticated()
  const { roles,login } = AuthStore();
  const navigate = useNavigate()
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);


  

  const onFinish = async (values) => {
    const { username , password , remember } = values;
    setLoading(true);
    try {
       const rest = await login(values.username, values.password);
  

      if(signIn(
        {
            token: rest.token,
            expiresIn:1440,
            tokenType: "Bearer",
            authState: rest,
            // refreshToken: res.data.refreshToken,                    // Only if you are using refreshToken feature
            // refreshTokenExpireIn: res.data.refreshTokenExpireIn     // Only if you are using refreshToken feature
        }
      )){
        if (values.remember) {
          setRememberMeData(true, username);
        } else {
          clearRememberMeData();
        }

        if(rest.role_id === roles.ADMIN){
            navigate("/app/workshop")
        }else{
          navigate("/user/workshop")
        }
        
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
  };

  const setupRememberMe = (remember) => {
    setRememberMe(e.target.checked);
  };

  useEffect(() => {

    if (isAuthenticated()) {
      navigate(-1); // Redirect to dashboard    
    }

    const { rememberMeStatus, username: storedUsername } = getRememberMeData();
    form.setFieldsValue({
      username: storedUsername,
      remember:      rememberMeStatus
  }); 
    setRememberMe(rememberMeStatus);
    
  }, []);

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="illustration-wrapper">
          <img src={Wallpaper} alt="Login" />
        </div>
        <Form
          name="login-form"
          form={form}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <p className="form-title">
          <Link to="/home"><MdOutlineArrowBack/></Link>
            Welcome back
          </p>
          <p>Login to the Dashboard</p>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            // rules={[{ required: true, message: 'Please input your password!' }]}
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
              // {
              //   min: 8,
              //   message: "Password must be at least 8 characters long!",
              // },
              // {
              //   pattern:
              //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/,
              //   message:
              //     "Password must contain at least one uppercase letter, one lowercase letter, one number, and one character",
              // },
              // {
              //   pattern: /\S/,
              //   message: "Input cannot be only spaces",
              // },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox checked={rememberMe} onChange={()=>{
                setupRememberMe(!rememberMeActive)
                
                if(!rememberMeActive ){
                  clearRememberMeData();
                }

                }}>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="login-form-button"
            >
              LOGIN
            </Button>
          </Form.Item>
          <span>Dont have account ? <Link to="/register">Sign up</Link></span>
        </Form>
      </div>
    </div>
  );
};

export default Login;
