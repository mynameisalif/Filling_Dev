import { Button, Form, message, Upload } from "antd";
import { useState, useEffect } from "react";
import { UploadOutlined } from "@ant-design/icons";
import PaymentStore from "../../../stores/payment";
import { useAuthUser } from "react-auth-kit";

const App = (props) => {
  const auth = useAuthUser();
  const [form] = Form.useForm();
  const { create } = PaymentStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    form.resetFields();
  }, [props.status, props.dataTmp, form]);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleBeforeUpload = (file) => {
    const isImage = file.type ? file.type.startsWith("image/") : /\.(jpg|jpeg|png)$/i.test(file.name);
    const isLt5M = file.size / 1024 / 1024 <= 5; // Allow up to 5MB
    if (!isImage) {
      message.error("Hanya dapat mengunggah file gambar (JPG/PNG)!");
      return Upload.LIST_IGNORE;
    }
    if (!isLt5M) {
      message.error("Ukuran gambar tidak boleh melebihi 5MB!");
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  const onFinish = async (value) => {
    if (!value.img || value.img.length === 0) {
      message.warning("Silakan upload bukti transfer terlebih dahulu!");
      return;
    }

    const file = value.img[0]?.originFileObj || value.img[0];
    if (!file) {
      message.warning("File bukti transfer tidak terbaca, silakan pilih ulang file!");
      return;
    }

    const formData = new FormData();
    formData.append("workshop_id", props.dataTmp.id);
    formData.append("user_id", auth().user_id);
    formData.append("status", "Bayar");
    formData.append("metode_pembayaran", "transfer");
    formData.append("uniq_code", null);
    formData.append("bukti_pembayaran", file);

    try {
      setLoading(true);
      await create(formData);
      message.success("Bukti pembayaran berhasil dikirim! Menunggu konfirmasi admin.");
      setLoading(false);
      props.onOk();
    } catch (error) {
      setLoading(false);
      const errMsg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        (typeof error === "string" ? error : "Gagal mengunggah pembayaran");
      message.error(errMsg);
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
        name="img"
        label="Upload bukti transfer"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        rules={[{ required: true, message: "Bukti transfer wajib diunggah!" }]}
      >
        <Upload
          beforeUpload={handleBeforeUpload}
          customRequest={({ onSuccess }) => {
            setTimeout(() => {
              onSuccess("ok");
            }, 0);
          }}
          showUploadList={true}
          multiple={false}
          maxCount={1}
          accept="image/png,image/jpeg,image/jpg"
          name="img"
          listType="picture"
        >
          <Button icon={<UploadOutlined />}>Pilih File Bukti Pembayaran</Button>
        </Upload>
      </Form.Item>

      <Form.Item style={{ marginTop: 24, textAlign: "right" }}>
        <Button type="primary" htmlType="submit" loading={loading} size="large">
          Kirim Bukti Pembayaran
        </Button>
      </Form.Item>
    </Form>
  );
};

export default App;

