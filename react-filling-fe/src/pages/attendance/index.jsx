import { Space, Table, Tag, Button, Modal, Popconfirm, message , Image } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import Form from "./form";
import { BsPencilSquare } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import AttendanceStore from "../../stores/attendance";
import moment from "moment";
import Checkin from "./checkin.jsx"
import { useMediaQuery } from 'react-responsive'
import {BASEURLIMG} from "../../../config/config"


const App = () => {
  const { getAll , deletes } = AttendanceStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [columns, setColumn] = useState([]);

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [dataTmp, setDataTmp] = useState([]);

  const isMobile = useMediaQuery({
    query: '(max-width: 768px)'
  })



  useEffect(() => {
    initial();
  }, []);

  const initial = async () => {
    setLoading(true);
    const rest = await getAll();
    setData(rest);
    setLoading(false);

    const keys = Object.keys(rest[0]);
    let columnsx = await keys.map((key) =>{
      if(['updated_at' , 'deleted_at'].includes(key)){
       return null
      }
      if(key === "image"){
        return {
          title: (key.charAt(0).toUpperCase() + key.slice(1)).replace(/_/g," "),
          dataIndex: key,
          key: key,
          render: (text) => {
            return ( 
              <Image
              width={100}
              src={`${BASEURLIMG}/attend/${text}`}
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
      // {
      //   title: "Action",
      //   key: "action",
      //   fixed: "right",
      //   render: (_, record) => (
      //     <Space size="middle">
      //       <BsPencilSquare
      //       style={{color:'olive'}}
      //         onClick={() => {
      //           showModal("edit", record);
      //         }}
      //       />
      //       <Popconfirm
      //         title="Delete the user"
      //         description="Are you sure to delete this user?"
      //         onConfirm={(e) => {
      //           confirm(e, record);
      //         }}
      //         onCancel={cancel}
      //         okText="Yes"
      //         cancelText="No"
      //       >
      //         <AiFillDelete style={{color:'red'}} />
      //       </Popconfirm>
      //     </Space>
      //   ),
      // },
    ].filter(e=>e)

    console.log(columnsx)

    setColumn(columnsx)

  };



 //confirm
 const confirm = async(e , record) => {
  try {

      await deletes({id:record.id});
      message.success("User deleted successfully");
      initial()
  } catch (error) {
      message.error(error);
  }
  
};
  const cancel = (e) => {
    // console.log(e);
    // message.error("Click on No");
  };

  //endconfirm


  const showModal = (status ="" , data =[]) => {
    setStatus(status)
    setDataTmp(data)
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    initial();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Checkin OnAttend={()=>{  initial()}}></Checkin>
      <div
      style={{     
        padding: "1em",
        marginTop:"1em",
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
        backgroundColor: "white",
      }}
    >
      <Space direction="vertical" style={{ width: "100%"  }}>
        <span
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "17px",
          }}
        >
          Attendance
          {/* <Button icon={<PlusOutlined />} type="primary"  onClick={showModal}>
            Add Data
          </Button> */}
        </span>
        <Table
          columns={columns}
          dataSource={data}
          size="small"
          scroll={{ x: isMobile ? true : "max-content" }}
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
    </>
   
  );
};
export default App;
