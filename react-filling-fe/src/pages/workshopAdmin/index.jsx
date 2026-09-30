import { Space, Table, Button, Modal, Popconfirm, message, Image } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState, useEffect, useCallback, useMemo } from "react";
import Form from "./form";
import { BsPencilSquare } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import WorkshopStore from "../../stores/workshop";
import moment from "moment";
import { BASEURLIMG } from "../../../config/config";

const App = () => {
  const { getAll, deletes } = WorkshopStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [dataTmp, setDataTmp] = useState([]);

  const initial = useCallback(async () => {
    setLoading(true);
    try {
      const rest = await getAll();
      setData(rest || []);
    } catch (err) {
      message.error(err?.message || "Failed to fetch workshops");
    } finally {
      setLoading(false);
    }
  }, [getAll]);

  useEffect(() => {
    initial();
  }, [initial]);

  //confirm
  const confirm = useCallback(
    async (record) => {
      try {
        await deletes({ id: record.id });
        message.success("Workshop deleted successfully");
        initial();
      } catch (error) {
        message.error(error?.message || error || "Failed to delete workshop");
      }
    },
    [deletes, initial]
  );

  const cancel = useCallback(() => {}, []);

  const showModal = useCallback((modalStatus = "", modalData = []) => {
    setStatus(modalStatus);
    setDataTmp(modalData);
    setIsModalOpen(true);
  }, []);

  const handleOk = useCallback(() => {
    setIsModalOpen(false);
    initial();
  }, [initial]);

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const columns = useMemo(
    () => [
      {
        title: "Id",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Nama",
        dataIndex: "nama",
        key: "nama",
      },
      {
        title: "Tanggal",
        dataIndex: "tanggal",
        key: "tanggal",
      },
      {
        title: "Jam",
        dataIndex: "jam",
        key: "jam",
      },
      {
        title: "Tempat",
        dataIndex: "tempat",
        key: "tempat",
      },
      {
        title: "Harga",
        dataIndex: "harga",
        key: "harga",
      },
      {
        title: "Kuota",
        dataIndex: "kuota",
        key: "kuota",
      },
      {
        title: "Img",
        dataIndex: "img",
        key: "img",
        render: (text) => (
          <Image
            width={100}
            src={`${BASEURLIMG}/Workshop/${text}`}
          />
        ),
      },
      {
        title: "Deskripsi",
        dataIndex: "deskripsi",
        key: "deskripsi",
      },
      {
        title: "Created at",
        dataIndex: "created_at",
        key: "created_at",
        render: (text) => (text ? moment(text).format("DD-MM-YYYY") : "-"),
      },
      {
        title: "Action",
        key: "action",
        fixed: "right",
        render: (_, record) => (
          <Space size="middle">
            <BsPencilSquare
              style={{ color: "olive", cursor: "pointer" }}
              onClick={() => {
                showModal("edit", record);
              }}
            />
            <Popconfirm
              title="Delete the workshop"
              description="Are you sure to delete this workshop?"
              onConfirm={() => {
                confirm(record);
              }}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <AiFillDelete style={{ color: "red", cursor: "pointer" }} />
            </Popconfirm>
          </Space>
        ),
      },
    ],
    [confirm, cancel, showModal]
  );

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
          Workshop
          <Button icon={<PlusOutlined />} type="primary" onClick={() => showModal("add")}>
            Add Data
          </Button>
        </span>
        <Table
          loading={loading}
          columns={columns}
          dataSource={data}
          size="small"
          scroll={{ x: "max-content" }}
          rowKey="id"
        />
      </Space>
      <Modal
        title="Form Workshop"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose={true}
      >
        <Form onOk={handleOk} dataTmp={dataTmp} status={status} />
      </Modal>
    </div>
  );
};

export default App;
