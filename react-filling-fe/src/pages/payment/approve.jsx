import { Space, Table, Tag, Button, Modal, Popconfirm, message , Image } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import Form from "./form";
import { BsPencilSquare } from "react-icons/bs";
import { AiFillDelete , AiOutlineCheck  , AiOutlineClose} from "react-icons/ai";

import PaymentStore from "../../stores/payment";
import moment from "moment";

import {BASEURLIMG} from "../../../config/config"

const App = () => {
  const { getAll , getPaymentApprove , deletes , update } = PaymentStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [columns, setColumn] = useState([]);

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [dataTmp, setDataTmp] = useState([]);


  useEffect(() => {
    initial();
  }, []);

  const initial = async () => {
    setLoading(true);
    const rest = await getPaymentApprove();
    setData(rest);
    setLoading(false);

    const keys = Object.keys(rest[0]);
    let columnsx = await keys.map((key) =>{
      if(['updated_at' , 'deleted_at' , 'workshop_id' , 'user_id'].includes(key)){
       return null
      }
      if(key === "bukti_pembayaran"){
        return {
          title: (key.charAt(0).toUpperCase() + key.slice(1)).replace(/_/g," "),
          dataIndex: key,
          key: key,
          render: (text) => {
            return ( 
              <Image
              width={100}
              src={`${BASEURLIMG}/Payment/${text}`}
            />
            )
          },
        }
      }
      if([ 'created_at'].includes(key)){
        return {
          title: (key.charAt(0).toUpperCase() + key.slice(1)).replace(/_/g," "),
          dataIndex: key,
          key: key,
          render: (text) => {
            return moment(text).format("DD-MM-YYYY");
          },
        }
      }
    
      if(key === "User"){
        return {
          title: (key.charAt(0).toUpperCase() + key.slice(1)).replace(/_/g," "),
          dataIndex: key,
          key: key,
          render : (text, record)=>{
            return(
              <span>
                {`${text.first_name} ${text.last_name}`}
              </span>
            )
          }
        }
      }

      if(key === "Workshop"){
        return {
          title: (key.charAt(0).toUpperCase() + key.slice(1)).replace(/_/g," "),
          dataIndex: key,
          key: key,
          render : (text, record)=>{
            return(
              <span>
                {`${text.nama}`}
              </span>
            )
          }
        }
      }

      return {
        title:(key.charAt(0).toUpperCase() + key.slice(1)).replace(/_/g," "),
        dataIndex: key,
        key: key,
      }
    } )
  
    columnsx = [
      ...columnsx,
      {
        title: "Action",
        key: "action",
        fixed: "right",
        render: (_, record) => (
          <Space size="middle">
            <AiOutlineCheck
            style={{color:'olive'}}
              onClick={() => {
                showModal("edit", record);
              }}
            />
            <Popconfirm
              title="Reject the payment "
              description="Are you sure to reject this payment?"
              onConfirm={(e) => {
                confirm(e, record);
              }}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <AiOutlineClose style={{color:'red'}} />
            </Popconfirm>
          </Space>
        ),
      },
    ].filter(e=>e)

    console.log(columnsx)

    setColumn(columnsx)

  };



 //confirm
 const confirm = async(e , record) => {
    const formData = new FormData();
    
    Object.entries(record).forEach(([key, values]) => {
      if(key === "bukti_pembayaran") {
        formData.append("bukti_pembayaran" , null  )
      }
      else if(key === "status"){
        formData.append("status", "Rejected");
      }
      else if(key === "uniq_code"){
        formData.append("uniq_code", null);
      }
      else{
        formData.append(key, values);
      }
     
    });
    try {
        setLoading(true)
        await  update(record.id , formData)    
        initial()
        setLoading(false)
    } catch (error) {
        setLoading(false)
        message.error(error);
    }
  
};
  const cancel = (e) => {
    // console.log(e);
    // message.error("Click on No");
  };

  //endconfirm


  const showModal = async(status ="" , data =[]) => {
    const formData = new FormData();
    
    Object.entries(data).forEach(([key, values]) => {
      if(key === "bukti_pembayaran") {
        formData.append("bukti_pembayaran" , null  )
      }
      else if(key === "status"){
        formData.append("status", "Lunas");
      }
      else if(key === "uniq_code"){
        formData.append("uniq_code", "aaa");
      }
      else{
        formData.append(key, values);
      }
     
    });
    try {
        setLoading(true)
        await  update(data.id , formData)    
        initial()

        setLoading(false)
    } catch (error) {
        setLoading(false)
        message.error(error);
    }
  
  };
  const handleOk = () => {
    setIsModalOpen(false);
    initial();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      style={{
        padding: "1em",
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
        backgroundColor: "white",
      }}
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <span
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "17px",
          }}
        >
          List Payment
          {/* <Button icon={<PlusOutlined />} type="primary"  onClick={showModal}>
            Add Data
          </Button> */}
        </span>
        <Table
          columns={columns}
          dataSource={data}
          size="small"
          scroll={{ x: "max-content" }}
        />
      </Space>
      <Modal
        title="Form User"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onOk={handleOk} dataTmp={dataTmp} status={status} />
      </Modal>
    </div>
  );
};
export default App;
