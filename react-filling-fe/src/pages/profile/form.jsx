import { Form, Input, Button, Upload, Row, Col , message } from 'antd';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import UserStore from "../../stores/user";

import Photo from "./photo"

const ProfilingForm = (props) => {
  const [form] = Form.useForm();
  const {update} =UserStore()
 

  useEffect(()=>{
    form.setFieldValue('first_name' , props.data.first_name)
    form.setFieldValue('last_name' , props.data.last_name)
    form.setFieldValue('npm' , props.data.npm)
    form.setFieldValue('kelas' , props.data.kelas)
    form.setFieldValue('jurusan' , props.data.jurusan)
    form.setFieldValue('email' , props.data.email)
    form.setFieldValue('line_account' , props.data.line_account)
    form.setFieldValue('wa_account' , props.data.wa_account)
    form.setFieldValue('phone_number' , props.data.phone_number)
  }, [props.data])

  const handleBeforeUpload = (file) => {
    const isImage = file.type.startsWith('image/');
    const isValid = isImage && file.size / 1024 / 1024 < 1; // Maximum file size of 1MB
    if (!isImage) {
      message.error('You can only upload image files!');
    } else if (!isValid) {
      message.error('Image size should be less than 1MB!');
    }
    return isImage && isValid;
  };

  const onFinish = async(values) => {
    console.log('Form values:', values);
  
    const formData = new FormData();

    formData.append('first_name', values.first_name);
    formData.append('last_name', values.last_name);
    formData.append('npm', values.npm);
    formData.append('kelas', values.kelas);
    formData.append('jurusan', values.jurusan);
    formData.append('email', values.email);
    formData.append('line_account', values.line_account);
    formData.append('wa_account', values.wa_account);
    formData.append('phone_number', values.phone_number);
    formData.append('img', values.image ? values.image[0].originFileObj :  null);

    try {

          
        await update(props.data.id ,formData);
        message.success("User updated successfully");

  
    } catch (error) {

        message.error(error);
    }
   
  };

  return (
    <Form onFinish={onFinish} form={form} layout="vertical">
      <Form.Item
        name="image"
        label=""
        style={{ display:'flex', justifyContent:'center'}}
        valuePropName="fileList"
        // getValueFromEvent={(e) => e.fileList}
        >           
            <Photo 
            image = {props.data.img}
            onChange={(e)=>{
                form.setFieldValue('img' , e[0].originFileObj)

            }}/>
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="First Name"
            name="first_name"
            rules={[{ required: true, message: 'Please enter your first name' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="First Name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Last Name"
            name="last_name"
            rules={[{ required: true, message: 'Please enter your last name' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Last Name" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="NPM"
            name="npm"
            rules={[{ required: true, message: 'Please enter your NPM' }]}
          >
            <Input placeholder="NPM" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Kelas"
            name="kelas"
            rules={[{ required: true, message: 'Please enter your kelas' }]}
          >
            <Input placeholder="Kelas" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Jurusan"
            name="jurusan"
            rules={[{ required: true, message: 'Please enter your jurusan' }]}
          >
            <Input placeholder="Jurusan" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email address' },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Line Account" name="line_account">
            <Input placeholder="Line Account" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="WhatsApp Account" name="wa_account">
            <Input placeholder="WhatsApp Account" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item label="Phone Number" name="phone_number">
        <Input placeholder="Phone Number" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProfilingForm;
    