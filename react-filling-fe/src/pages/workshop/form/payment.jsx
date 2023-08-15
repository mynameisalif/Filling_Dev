import { Button, Form, Input , message  , Select , Upload} from "antd";
import React, { useState , useEffect } from "react";
import { UploadOutlined } from "@ant-design/icons";
import RoleStore from "../../../stores/role";
import UserStore from "../../../stores/user";
import PaymentStore from "../../../stores/payment";
import {useAuthUser} from 'react-auth-kit'




const App = (props) => {
   const auth = useAuthUser()
  const [form] = Form.useForm();
  const { getAll } = RoleStore();

  const {create } = PaymentStore()
  const [loading , setLoading] = useState(false)
  const [roles , setRole] = useState([])


  useEffect(()=>{
    console.log(auth())
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

    if(!value.img){
         message.warning("Silahkan upload bukti transfer terlebih dahulu !")
         return 
    }

    formData.append("workshop_id" , props.dataTmp.id  )
    formData.append("user_id" , auth().user_id  )
    formData.append("status" , "Bayar" )
    formData.append("metode_pembayaran" , "transfer" )
    formData.append("uniq_code" , null )
    formData.append("bukti_pembayaran" , value.img ?  value.img[0].originFileObj : null  )

    try {
        setLoading(true)
       
        await create(formData);
        message.success("User created successfully");
    
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
      name="img"
      label="Upload bukti transfer"
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

      <Form.Item label=" ">
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default App;
