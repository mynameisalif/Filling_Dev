import { Space, Table, Tag, Button, Modal, Popconfirm, message , Image } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import Form from "./form";
import { BsPencilSquare } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import UserStore from "../../stores/user";
import moment from "moment";
import {BASEURLIMG} from "../../../config/config"

const App = () => {
  const { getAll , deletes } = UserStore();
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
    const rest = await getAll();
    setData(rest);
    setLoading(false);

    const keys = Object.keys(rest[0]);
    let columnsx = await keys.map((key) =>{
      if(['role_id', 'deleted_at'].includes(key)){
       return null
      }
      if(key === "img"){
        return {
          title: (key.charAt(0).toUpperCase() + key.slice(1)).replace(/_/g," "),
          dataIndex: key,
          key: key,
          render: (text) => {
            return ( 
              <Image
              width={100}
              src={`${BASEURLIMG}/User/${text}`}
            />
            )
          },
        }
      }
      if(['updated_at', 'created_at'].includes(key)){
        return {
          title: (key.charAt(0).toUpperCase() + key.slice(1)).replace(/_/g," "),
          dataIndex: key,
          key: key,
          render: (text) => {
            return moment(text).format("DD-MM-YYYY");
          },
        }
      }
    
      if(key === "Role"){
        return {
          title: (key.charAt(0).toUpperCase() + key.slice(1)).replace(/_/g," "),
          dataIndex: key,
          key: key,
          render : (text, record)=>{
            return(
              <span>
                {text.nama}
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
            <BsPencilSquare
            style={{color:'olive'}}
              onClick={() => {
                showModal("edit", record);
              }}
            />
            <Popconfirm
              title="Delete the user"
              description="Are you sure to delete this user?"
              onConfirm={(e) => {
                confirm(e, record);
              }}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <AiFillDelete style={{color:'red'}} />
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
          User
          <Button icon={<PlusOutlined />} type="primary"  onClick={showModal}>
            Add Data
          </Button>
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
