import { Button, Form, Input , message  , Select , Upload} from "antd";
import React, { useState , useEffect } from "react";
import { UploadOutlined } from "@ant-design/icons";
import RoleStore from "../../../stores/role";
import UserStore from "../../../stores/user";


const App = (props) => {
  const [form] = Form.useForm();
  const { getAll } = RoleStore();
  const {create , update} = UserStore();
  const [loading , setLoading] = useState(false)
  const [roles , setRole] = useState([])


  useEffect(()=>{
    initial()
    if(props.status == "edit"){
        form.setFieldValue("first_name" , props.dataTmp.first_name);
        form.setFieldValue("last_name" , props.dataTmp.last_name);
        form.setFieldValue("npm" , props.dataTmp.npm);
        form.setFieldValue("kelas" , props.dataTmp.kelas);
        form.setFieldValue("jurusan" , props.dataTmp.jurusan);
        form.setFieldValue("email" , props.dataTmp.email);
        form.setFieldValue("line_account" , props.dataTmp.line_account);
        form.setFieldValue("wa_account" , props.dataTmp.wa_account);
        form.setFieldValue("phone_number" , props.dataTmp.phone_number);
        form.setFieldValue("role_id" , props.dataTmp.role_id);
    }else{
      form.resetFields();
    }
   
  }, [props.status , props.dataTmp])


  const initial= async(r)=>{
    try {
        const data = await getAll();
        setRole(data)
    } catch (error) {
      
    }
  }

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

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


  const onFinish = async(value) => {
   
    const formData = new FormData();
    
    Object.entries(value).forEach(([key, values]) => {
      if(key === "img") {
        formData.append("img" , values ?  values[0].originFileObj : null  )
      }else{
        formData.append(key, values);
      }
     
    });

    try {
        setLoading(true)
       
        if(props.status === "edit"){
            await update(props.dataTmp.id ,formData);
            message.success("User updated successfully");
        }else{
            await create(formData);
            message.success("User created successfully");
        }
       
    
        setLoading(false)
        props.onOk()
    } catch (error) {
        setLoading(false)
        message.error(error);
    }
   
  };

  const onFinishFailed = () => {
    message.error("Submit failed!");
  };

  const onFill = () => {
    form.setFieldsValue({
      url: "https://taobao.com/",
    });
  };

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item
        label="Fist Name"
        name="first_name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Last Name"
        name="last_name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="NPM"
        name="npm"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Kelas"
        name="kelas"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
   
      <Form.Item
        label="Jurusan"
        name="jurusan"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

     
      <Form.Item
        label="Email"
        name="email"          
        rules={[
          { required: true } , 
          {
          type: 'email',
          message: 'The input is not valid E-mail!',
        },]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Line Account"
        name="line_account"          
        rules={[
          { required: true } ] }        
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="WA Account"
        name="wa_account"          
        rules={[
          { required: true } ] }        
      >
        <Input />
      </Form.Item>
   
      <Form.Item
        label="Phone Number"
        name="phone_number"          
        rules={[
          { required: true } ] }        
      >
        <Input />
      </Form.Item>

      <Form.Item
      name="img"
      label="Upload"
      valuePropName="fileList"
      getValueFromEvent={normFile}
    >
      <Upload 
        beforeUpload={handleBeforeUpload}
        showUploadList={true}
        multiple={false}
        maxCount={1}
        accept={"image/png,image/jpeg,image/jpg"}
        name="img" 
        listType="picture">
        <Button icon={<UploadOutlined />}>Click to upload</Button>
      </Upload>
    </Form.Item>

  
      <Form.Item label="Role" name="role_id">
        <Select>
          {roles.map(e=>{
            return(
              <Select.Option key={e.id} value={e.id}>{e.nama}</Select.Option>
            )
          })}            
        </Select>
      </Form.Item>

    

      <Form.Item label=" ">
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default App;
