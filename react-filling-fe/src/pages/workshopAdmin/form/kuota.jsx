import { Button, Form, Input , message  , Select , Upload , DatePicker , TimePicker} from "antd";
import React, { useState , useEffect } from "react";
import { UploadOutlined } from "@ant-design/icons";
import WorkshopStore from "../../../stores/workshop";
import TextArea from "antd/es/input/TextArea";
import moment from "moment";


const App = (props) => {
  const [form] = Form.useForm();
  const {create , update} = WorkshopStore();
  const [loading , setLoading] = useState(false)


  useEffect(()=>{
    initial()
    if(props.status == "edit"){
        form.setFieldValue("nama" , props.dataTmp.nama);
        form.setFieldValue("tanggal" , moment(props.dataTmp.tanggal));
        form.setFieldValue("jam" , moment(props.dataTmp.jam , "HH:mm:ss"));
        form.setFieldValue("tempat" , props.dataTmp.tempat);
        form.setFieldValue("harga" , props.dataTmp.harga);
        form.setFieldValue("deskripsi" , props.dataTmp.deskripsi);    
    }else{
      form.resetFields();
    }
   
  }, [props.status , props.dataTmp])


  const initial= async(r)=>{
    try {     
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
      }else if(key === "jam"){
        
        formData.append("jam" , moment(props.status === "edit" ? values : values.$d).format("HH:mm:ss") )
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
        label="Total"
        name="total"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
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
