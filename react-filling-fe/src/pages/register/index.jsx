import { Button, Checkbox, Form, Input, message  } from "antd";
import { useState, useEffect } from "react";
import { Link , useNavigate } from "react-router-dom";
import "./style.scss";
import Wallpaper from "../../assets/img/register.jpg";
import AuthStore from "../../stores/auth";
import { setRememberMeData, getRememberMeData, clearRememberMeData } from '../../utils/useRemember';
import { IoChevronBackCircleOutline } from 'react-icons/io5';
import { MdOutlineArrowBack } from 'react-icons/md';




const Register = () => {
  const { roles,register } = AuthStore();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
 
    setLoading(true);
    try {
       const obj = {
        username : values.email,
        email : values.email,
        password : values.password,
        confPassword : values.confirmPassword,
        role_id : roles.USER
       }
       await register(obj);
        message.success("Account created successfully")
       await message.loading("in a few moments it will redirect to the login page")

    
       navigate("/login")
       setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

 
 

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
            <Link to="/login"><MdOutlineArrowBack/></Link>
            
            Sign Up</p>
          <p>Create an Account</p>
          <Form.Item
            name="email"
            
            rules={[
              { required: true, message: "Please input your username!" } , 
              {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
              {
                min: 8,
                message: "Password must be at least 8 characters long!",
              },
              {
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/,
                message:
                  "Password must contain at least one uppercase letter, one lowercase letter, one number, and one character",
              },
              {
                pattern: /\S/,
                message: "Input cannot be only spaces",
              },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"

            // rules={[{ required: true, message: 'Please input your password!' }]}
            rules={[
              {
                required: true,
                message: "Please input your confirmation password",
              },
              {
                min: 8,
                message: "Password must be at least 8 characters long!",
              },
              {
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/,
                message:
                  "Password must contain at least one uppercase letter, one lowercase letter, one number, and one character",
              },
              {
                pattern: /\S/,
                message: "Input cannot be only spaces",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The new password that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirmation password"  />
          </Form.Item>
     

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="login-form-button"
            >
              Sign up
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
