import { Space, Table, Tag, Button, Modal, Popconfirm, message, Image, Spin, Alert, Descriptions, Badge, Card } from "antd";
import { RobotOutlined, CheckCircleOutlined, CloseCircleOutlined, SyncOutlined } from "@ant-design/icons";
import { useState, useEffect, useCallback, useMemo } from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import PaymentStore from "../../stores/payment";
import moment from "moment";
import { BASEURLIMG } from "../../../config/config";

const ApprovePayment = () => {
  const { getPaymentApprove, update, verifyAI } = PaymentStore();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // State untuk Modal AI Verification
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const initial = useCallback(async () => {
    setLoading(true);
    try {
      const rest = await getPaymentApprove();
      setData(rest || []);
    } catch (error) {
      console.error(error);
      message.error("Gagal memuat data persetujuan pembayaran");
    } finally {
      setLoading(false);
    }
  }, [getPaymentApprove]);

  useEffect(() => {
    initial();
  }, [initial]);

  // Handle Setujui Pembayaran (Lunas)
  const handleApprove = useCallback(
    async (record) => {
      const formData = new FormData();
      formData.append("status", "Lunas");
      formData.append("uniq_code", "aaa");
      formData.append("user_id", record.user_id);
      formData.append("workshop_id", record.workshop_id);
      formData.append("metode_pembayaran", record.metode_pembayaran || "transfer");
      if (record.bukti_pembayaran) {
        formData.append("bukti_pembayaran", record.bukti_pembayaran);
      }

      try {
        setLoading(true);
        await update(record.id, formData);
        message.success("Pembayaran disetujui (Lunas) & Notifikasi tiket dikirim ke email peserta!");
        setIsAiModalOpen(false);
        initial();
      } catch (error) {
        message.error(error?.message || "Gagal menyetujui pembayaran");
      } finally {
        setLoading(false);
      }
    },
    [update, initial]
  );

  // Handle Tolak Pembayaran (Rejected)
  const handleReject = useCallback(
    async (record) => {
      const formData = new FormData();
      formData.append("status", "Rejected");
      formData.append("user_id", record.user_id);
      formData.append("workshop_id", record.workshop_id);
      formData.append("metode_pembayaran", record.metode_pembayaran || "transfer");
      if (record.bukti_pembayaran) {
        formData.append("bukti_pembayaran", record.bukti_pembayaran);
      }

      try {
        setLoading(true);
        await update(record.id, formData);
        message.warning("Pembayaran berhasil ditolak (Status: Rejected)");
        setIsAiModalOpen(false);
        initial();
      } catch (error) {
        message.error(error?.message || "Gagal menolak pembayaran");
      } finally {
        setLoading(false);
      }
    },
    [update, initial]
  );

  // Handle Buka Verifikasi AI
  const handleOpenAiVerify = useCallback(
    async (record) => {
      setSelectedRecord(record);
      setIsAiModalOpen(true);
      setAiLoading(true);
      setAiResult(null);

      try {
        const response = await verifyAI(record.id);
        setAiResult(response);
      } catch (error) {
        console.error(error);
        message.error(error?.message || "Gagal menganalisis bukti pembayaran dengan AI.");
      } finally {
        setAiLoading(false);
      }
    },
    [verifyAI]
  );

  const columns = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        width: 60,
      },
      {
        title: "Peserta",
        dataIndex: "User",
        key: "User",
        render: (user) => (user ? `${user.first_name || ""} ${user.last_name || ""}` : "-"),
      },
      {
        title: "Workshop",
        dataIndex: "Workshop",
        key: "Workshop",
        render: (workshop) => (workshop ? workshop.nama : "-"),
      },
      {
        title: "Harga",
        dataIndex: "Workshop",
        key: "harga",
        render: (workshop) => (workshop?.harga ? `Rp ${Number(workshop.harga).toLocaleString("id-ID")}` : "-"),
      },
      {
        title: "Metode",
        dataIndex: "metode_pembayaran",
        key: "metode_pembayaran",
        render: (text) => <Tag color="blue">{text?.toUpperCase() || "TRANSFER"}</Tag>,
      },
      {
        title: "Bukti Pembayaran",
        dataIndex: "bukti_pembayaran",
        key: "bukti_pembayaran",
        render: (text) =>
          text ? (
            <Image
              width={70}
              height={70}
              style={{ objectFit: "cover", borderRadius: 6, border: "1px solid #d9d9d9" }}
              src={`${BASEURLIMG}/Payment/${text}`}
              alt="Bukti Transfer"
            />
          ) : (
            <Tag color="red">Belum Upload</Tag>
          ),
      },
      {
        title: "Tanggal",
        dataIndex: "created_at",
        key: "created_at",
        render: (text) => (text ? moment(text).format("DD-MM-YYYY HH:mm") : "-"),
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (text) => <Tag color="orange">{text}</Tag>,
      },
      {
        title: "Aksi & AI Verifikasi",
        key: "action",
        fixed: "right",
        render: (_, record) => (
          <Space size="small">
            <Button
              type="primary"
              size="small"
              icon={<RobotOutlined />}
              style={{
                backgroundColor: "#722ed1",
                borderColor: "#722ed1",
                display: "inline-flex",
                alignItems: "center",
                fontWeight: 500,
              }}
              onClick={() => handleOpenAiVerify(record)}
            >
              Verifikasi AI
            </Button>
            <Popconfirm
              title="Setujui Pembayaran"
              description="Apakah Anda yakin ingin menyetujui pembayaran ini?"
              onConfirm={() => handleApprove(record)}
              okText="Ya, Setujui"
              cancelText="Batal"
            >
              <Button
                size="small"
                type="primary"
                style={{ backgroundColor: "#52c41a", borderColor: "#52c41a", display: "inline-flex", alignItems: "center" }}
                icon={<AiOutlineCheck />}
              />
            </Popconfirm>
            <Popconfirm
              title="Tolak Pembayaran"
              description="Apakah Anda yakin ingin menolak pembayaran ini?"
              onConfirm={() => handleReject(record)}
              okText="Tolak"
              cancelText="Batal"
              okButtonProps={{ danger: true }}
            >
              <Button size="small" danger icon={<AiOutlineClose />} />
            </Popconfirm>
          </Space>
        ),
      },
    ],
    [handleApprove, handleReject, handleOpenAiVerify]
  );

  return (
    <div
      style={{
        padding: "1.5em",
        boxShadow: "rgba(0, 0, 0, 0.08) 0px 2px 8px",
        backgroundColor: "white",
        borderRadius: 8,
      }}
    >
      <Space direction="vertical" style={{ width: "100%" }} size="middle">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ margin: 0, fontSize: "20px", fontWeight: 600 }}>Daftar Menunggu Persetujuan Pembayaran</h2>
            <p style={{ margin: 0, color: "#8c8c8c", fontSize: "13px" }}>
              Verifikasi bukti transfer peserta secara manual atau menggunakan asisten Gemini AI Vision.
            </p>
          </div>
          <Button icon={<SyncOutlined />} onClick={initial} loading={loading}>
            Segarkan
          </Button>
        </div>

        <Table
          loading={loading}
          columns={columns}
          dataSource={data}
          size="middle"
          scroll={{ x: "max-content" }}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Space>

      {/* Modal Verifikasi AI */}
      <Modal
        title={
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "17px" }}>
            <RobotOutlined style={{ color: "#722ed1", fontSize: "20px" }} />
            <span>AI Smart Payment Verification (Gemini Vision)</span>
          </div>
        }
        open={isAiModalOpen}
        onCancel={() => setIsAiModalOpen(false)}
        width={780}
        destroyOnClose={true}
        footer={[
          <Button key="close" onClick={() => setIsAiModalOpen(false)}>
            Tutup
          </Button>,
          selectedRecord && (
            <Popconfirm
              key="reject"
              title="Tolak Pembayaran"
              description="Apakah Anda yakin menolak pembayaran ini?"
              onConfirm={() => handleReject(selectedRecord)}
              okText="Tolak"
              cancelText="Batal"
            >
              <Button danger>Tolak Pembayaran</Button>
            </Popconfirm>
          ),
          selectedRecord && (
            <Button
              key="approve"
              type="primary"
              style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}
              icon={<CheckCircleOutlined />}
              onClick={() => handleApprove(selectedRecord)}
            >
              Setujui Pembayaran (Lunas)
            </Button>
          ),
        ]}
      >
        {aiLoading ? (
          <div style={{ textAlign: "center", padding: "50px 20px" }}>
            <Spin size="large" />
            <p style={{ marginTop: 20, fontSize: "15px", fontWeight: 500, color: "#722ed1" }}>
              Gemini Vision AI sedang membaca dan mengekstrak data dari bukti transfer...
            </p>
            <p style={{ color: "#8c8c8c", fontSize: "12px" }}>
              Mendeteksi nominal transfer, nama bank, nama pengirim, dan skor keaslian struk.
            </p>
          </div>
        ) : aiResult ? (
          <div style={{ marginTop: 12 }}>
            {/* Alert Rekomendasi AI */}
            {aiResult.ai_analysis?.recommendation === "APPROVE" && (
              <Alert
                message="Rekomendasi AI: SIAP DISETUJUI (VALID)"
                description={aiResult.ai_analysis?.analysis_summary}
                type="success"
                showIcon
                icon={<CheckCircleOutlined />}
                style={{ marginBottom: 16 }}
              />
            )}
            {aiResult.ai_analysis?.recommendation === "MANUAL_CHECK" && (
              <Alert
                message="Rekomendasi AI: PERLU PENGECEKAN MANUAL"
                description={aiResult.ai_analysis?.analysis_summary}
                type="warning"
                showIcon
                style={{ marginBottom: 16 }}
              />
            )}
            {aiResult.ai_analysis?.recommendation === "REJECT" && (
              <Alert
                message="Rekomendasi AI: DITOLAK / TIDAK VALID"
                description={aiResult.ai_analysis?.analysis_summary}
                type="error"
                showIcon
                icon={<CloseCircleOutlined />}
                style={{ marginBottom: 16 }}
              />
            )}

            <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 16, alignItems: "start" }}>
              {/* Gambar Struk */}
              <Card
                size="small"
                title="Bukti Transfer Asli"
                style={{ textAlign: "center", backgroundColor: "#fafafa" }}
              >
                {selectedRecord?.bukti_pembayaran ? (
                  <Image
                    src={`${BASEURLIMG}/Payment/${selectedRecord.bukti_pembayaran}`}
                    alt="Bukti Transfer"
                    style={{ maxWidth: "100%", maxHeight: 260, objectFit: "contain", borderRadius: 4 }}
                  />
                ) : (
                  <p>Tidak ada gambar</p>
                )}
                <div style={{ marginTop: 8, fontSize: "11px", color: "#8c8c8c" }}>
                  Klik gambar untuk memperbesar
                </div>
              </Card>

              {/* Data Hasil Analisis AI */}
              <Card size="small" title="Hasil Ekstraksi Data oleh AI">
                <Descriptions bordered size="small" column={1}>
                  <Descriptions.Item label="Tingkat Keyakinan AI">
                    <Badge
                      status={aiResult.ai_analysis?.confidence_score >= 80 ? "success" : "warning"}
                      text={`${aiResult.ai_analysis?.confidence_score}% (Confidence Score)`}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item label="Kecocokan Nominal">
                    {aiResult.ai_analysis?.is_amount_matching ? (
                      <Tag color="success" style={{ fontWeight: 600 }}>
                        NOMINAL COCOK
                      </Tag>
                    ) : (
                      <Tag color="error" style={{ fontWeight: 600 }}>
                        NOMINAL KURANG / TIDAK COCOK
                      </Tag>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="Nominal di Struk">
                    <b style={{ color: "#1890ff", fontSize: "14px" }}>
                      Rp {Number(aiResult.ai_analysis?.detected_amount || 0).toLocaleString("id-ID")}
                    </b>
                  </Descriptions.Item>
                  <Descriptions.Item label="Tagihan Workshop">
                    Rp {Number(selectedRecord?.Workshop?.harga || 0).toLocaleString("id-ID")}
                  </Descriptions.Item>
                  <Descriptions.Item label="Bank / E-Wallet">
                    <Tag color="purple">{aiResult.ai_analysis?.bank_or_platform || "Tidak Terbaca"}</Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Nama Pengirim">
                    {aiResult.ai_analysis?.sender_name || "Tidak Terbaca"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Nama Penerima">
                    {aiResult.ai_analysis?.recipient_name || "Tidak Terbaca"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Waktu Transaksi">
                    {aiResult.ai_analysis?.transaction_date || "-"}
                  </Descriptions.Item>
                  <Descriptions.Item label="No. Referensi">
                    <code>{aiResult.ai_analysis?.reference_number || "-"}</code>
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "30px" }}>
            <p style={{ color: "#8c8c8c", marginBottom: 16 }}>Belum ada hasil analisis atau gagal memuat data.</p>
            {selectedRecord && (
              <Button
                type="primary"
                icon={<RobotOutlined />}
                style={{ backgroundColor: "#722ed1", borderColor: "#722ed1" }}
                onClick={() => handleOpenAiVerify(selectedRecord)}
              >
                Analisis Ulang dengan AI
              </Button>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ApprovePayment;
