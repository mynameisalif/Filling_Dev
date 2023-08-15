import { Space, Table, Tag, Button, Modal, Popconfirm , message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import Form from "./form";
import RoleStore from "../../stores/role";
import moment from "moment";
import { BsPencilSquare } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";


// const data = [
//   {
//     key: '1',
//     name: 'Admin',
//     deskripsi: "Admin role untuk all akses",
//     created_at: '08-07-2023',
//   },
//   {
//     key: '1',
//     name: 'User',
//     deskripsi: "User role untuk user akses",
//     created_at: '08-07-2023',
//   }
// ];
const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status , setStatus] =  useState("");
  const [dataTmp , setDataTmp] =  useState([]);



  const { getAll , deletes } = RoleStore();

  const columns = [
    {
      title: "Name",
      dataIndex: "nama",
      key: "nama",
    },
    {
      title: "Deskripsi",
      dataIndex: "deskripsi",
      key: "deskripsi",
    },
    {
      title: "Created Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => {
        return moment(text).format("DD-MM-YYYY");
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <BsPencilSquare onClick={()=>{showModal("edit" , record)}}  style={{color:'olive'}} />
          <Popconfirm
            title="Delete the role"
            description="Are you sure to delete this role?"
            onConfirm={(e)=>{confirm(e,record)}}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <AiFillDelete style={{color:'red'}} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    initial();
  }, []);

  const initial = async () => {
    setLoading(true);
    const rest = await getAll();
    setData(rest);
    setLoading(false);
  };

  //confirm
  const confirm = async(e , record) => {

    try {

        await deletes({id:record.id});
        message.success("Role deleted successfully");
        initial()
    } catch (error) {
        message.error(error);
    }
    
    // message.success("Click on Yes");
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };
  //end confirm

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
          Roles
          <Button icon={<PlusOutlined />} onClick={showModal} type="primary">
            Add Data
          </Button>
        </span>
        <Table
          columns={columns}
          dataSource={data}
          size="small"
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </Space>

      <Modal
        title="Form Roles"
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
