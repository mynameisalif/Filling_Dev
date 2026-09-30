import { Button, Form, Input, message, Upload, DatePicker, TimePicker } from "antd";
import { useState, useEffect } from "react";
import { UploadOutlined } from "@ant-design/icons";
import WorkshopStore from "../../../stores/workshop";
import moment from "moment";

const App = (props) => {
  const [form] = Form.useForm();
  const { create, update } = WorkshopStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.status === "edit" && props.dataTmp) {
      form.setFieldValue("nama", props.dataTmp.nama);
      form.setFieldValue("tanggal", moment(props.dataTmp.tanggal));
      form.setFieldValue("jam", moment(props.dataTmp.jam, "HH:mm:ss"));
      form.setFieldValue("tempat", props.dataTmp.tempat);
      form.setFieldValue("harga", props.dataTmp.harga);
      form.setFieldValue("kuota", props.dataTmp.kuota);
      form.setFieldValue("deskripsi", props.dataTmp.deskripsi);
    } else {
      form.resetFields();
    }
  }, [props.status, props.dataTmp, form]);

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
      return Upload.LIST_IGNORE;
    }
    if (!isValid) {
      message.error('Image size should be less than 1MB!');
      return Upload.LIST_IGNORE;
    }
    return false; // Mencegah Ant Design auto-upload via AJAX ke URL 404
  };


  const onFinish = async(value) => {
    const formData = new FormData();
  
    Object.entries(value).forEach(([key, values]) => {
      if(key === "img") {
        if (values && values.length > 0) {
          const fileObj = values[0]?.originFileObj || values[0];
          if (fileObj instanceof File || fileObj instanceof Blob) {
            formData.append("img", fileObj);
          }
        }
      } else if(key === "jam") {
        const timeVal = props.status === "edit" ? values : (values?.$d || values);
        formData.append("jam", moment(timeVal).isValid() ? moment(timeVal).format("HH:mm:ss") : values);
      } else if(key === "tanggal") {
        formData.append("tanggal", moment(values).isValid() ? moment(values).format("YYYY-MM-DD") : values);
      } else if(values !== undefined && values !== null) {
        formData.append(key, values);
      }
    });

    try {
        setLoading(true);
       
        if(props.status === "edit"){
            await update(props.dataTmp.id, formData);
            message.success("Workshop updated successfully");
        } else {
            await create(formData);
            message.success("Workshop created successfully");
        }
     
        setLoading(false);
        props.onOk();
    } catch (error) {
        setLoading(false);
        message.error(error?.message || error || "Failed to update workshop");
    }
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
        label="Name"
        name="nama"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Date"
        name="tanggal"
        rules={[
          {
            required: true,
          },
        ]}
      >
         <DatePicker style={{width:'100%'}} />
      </Form.Item>

      <Form.Item
        label="Time"
        name="jam"
        rules={[
          {
            required: true,
          },
        ]}
      >
         <TimePicker  style={{width:'100%'}} format={"HH:mm:ss"} onSelect={(time)=>{
          if(props.status == "edit"){
              form.setFieldValue("jam" , moment(time, "HH:mm:ss") )
          }
        
          }} />
      </Form.Item>
   
      <Form.Item
        label="Place"
        name="tempat"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

     
      <Form.Item
        label="Price"
        name="harga"          
        rules={[
          { required: true } , 
          ]}>
        <Input />
      </Form.Item>
      
      <Form.Item
        label="Kuota"
        name="kuota"          
        rules={[
          { required: true } , 
          ]}>
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

    
    <Form.Item
        label="Description"
        name="deskripsi"          
        rules={[
          { required: true } , 
          ]}>
          <Input.TextArea />
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
