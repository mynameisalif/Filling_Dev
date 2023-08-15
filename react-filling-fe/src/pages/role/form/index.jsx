import { Button, Form, Input , message } from "antd";
import React, { useState , useEffect } from "react";
import RoleStore from "../../../stores/role";
const App = (props) => {
  const [form] = Form.useForm();
  const { create , update} = RoleStore();
  const [loading , setLoading] = useState(false)

  useEffect(()=>{
    if(props.status == "edit"){
        form.setFieldValue("nama" , props.dataTmp.nama);
        form.setFieldValue("deskripsi" , props.dataTmp.deskripsi);
    }else{
        form.setFieldValue("nama" ,null);
        form.setFieldValue("deskripsi" , null);
    }
   
  }, [props.status , props.dataTmp])

  const onFinish = async(value) => {

    try {
        setLoading(true)
       
        if(props.status === "edit"){
            await update({id:props.dataTmp.id ,...value});
            message.success("Role updated successfully");
        }else{
            await create(value);
            message.success("Role created successfully");
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
        label="Role Name"
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
        label="Deskripsi"
        name="deskripsi"
        rules={[
          {
            required: true,
          },
        ]}
      >
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
