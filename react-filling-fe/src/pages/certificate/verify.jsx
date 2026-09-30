import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Result, Button, Spin, Tag, Descriptions, Space } from 'antd';
import {
  CheckCircleFilled,
  CloseCircleFilled,
  HomeOutlined,
  SafetyCertificateOutlined,
  PrinterOutlined,
} from '@ant-design/icons';
import { paymentService } from '../../services/paymentService';
import CertificateView from '../../components/certificate/CertificateView';

const CertificateVerifyPage = () => {
  const { code } = useParams();
  const [loading, setLoading] = useState(true);
  const [certData, setCertData] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showCertificateView, setShowCertificateView] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchVerification = async () => {
      try {
        setLoading(true);
        setErrorMsg(null);
        const data = await paymentService.getCertificate(code);
        if (isMounted) {
          setCertData(data);
        }
      } catch (err) {
        if (isMounted) {
          setErrorMsg(
            err.response?.data?.message ||
              'Sertifikat dengan kode unik ini tidak ditemukan atau belum diverifikasi oleh panitia.'
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (code) {
      fetchVerification();
    } else {
      setLoading(false);
      setErrorMsg('Kode sertifikat tidak disertakan.');
    }

    return () => {
      isMounted = false;
    };
  }, [code]);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
        padding: '30px 16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Brand Header */}
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <h1
          style={{
            margin: 0,
            fontSize: '28px',
            fontWeight: 800,
            color: '#553580',
            letterSpacing: '1px',
          }}
        >
          FILING (FIKTI Learning)
        </h1>
        <p style={{ margin: '4px 0 0 0', color: '#8c8c8c', fontSize: '14px' }}>
          Portal Resmi Verifikasi Keaslian E-Sertifikat & Dokumen Digital
        </p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
          <Spin size="large" />
          <p style={{ marginTop: 20, fontSize: '16px', color: '#553580', fontWeight: 600 }}>
            Menghubungkan ke basis data sertifikat resmi...
          </p>
          <p style={{ color: '#8c8c8c', fontSize: '13px' }}>
            Memverifikasi tanda tangan digital dan keabsahan kode unik.
          </p>
        </div>
      ) : certData && certData.valid ? (
        <div style={{ width: '100%', maxWidth: 900 }}>
          {/* Status Banner */}
          <Card
            style={{
              marginBottom: 24,
              borderRadius: 12,
              border: '2px solid #52c41a',
              boxShadow: '0 4px 16px rgba(82, 196, 26, 0.12)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <CheckCircleFilled style={{ fontSize: '36px', color: '#52c41a' }} />
                <div>
                  <h3
                    style={{
                      margin: 0,
                      color: '#52c41a',
                      fontSize: '20px',
                      fontWeight: 700,
                    }}
                  >
                    SERTIFIKAT RESMI & TERVERIFIKASI
                  </h3>
                  <p style={{ margin: '2px 0 0 0', color: '#595959', fontSize: '13px' }}>
                    Dokumen ini terdaftar sah dalam basis data BEM FIKTI Universitas Gunadarma.
                  </p>
                </div>
              </div>

              <Space>
                <Button
                  type="primary"
                  icon={<SafetyCertificateOutlined />}
                  style={{ backgroundColor: '#553580', borderColor: '#553580' }}
                  onClick={() => setShowCertificateView(!showCertificateView)}
                >
                  {showCertificateView ? 'Tutup Preview Sertifikat' : 'Lihat Desain Sertifikat'}
                </Button>
                <Button
                  icon={<PrinterOutlined />}
                  onClick={() => {
                    setShowCertificateView(true);
                    setTimeout(() => window.print(), 300);
                  }}
                >
                  Cetak / PDF
                </Button>
              </Space>
            </div>
          </Card>

          {/* Optional Certificate Render */}
          {showCertificateView && (
            <div style={{ marginBottom: 30 }}>
              <CertificateView data={certData} showActions={true} />
            </div>
          )}

          {/* Verification Details Table */}
          <Card
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#553580' }}>
                <SafetyCertificateOutlined />
                <span>Rincian Verifikasi Dokumen</span>
              </div>
            }
            bordered={false}
            style={{
              borderRadius: 12,
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
            }}
          >
            <Descriptions bordered column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}>
              <Descriptions.Item label="Nomor Sertifikat">
                <b style={{ color: '#553580', fontSize: '14px' }}>{certData.certificate_number}</b>
              </Descriptions.Item>

              <Descriptions.Item label="Status Validasi">
                <Tag color="success" style={{ fontWeight: 600 }}>
                  TERVERIFIKASI & SAH (LUNAS)
                </Tag>
              </Descriptions.Item>

              <Descriptions.Item label="Nama Penerima">
                <b style={{ fontSize: '15px' }}>{certData.recipient?.name}</b>
              </Descriptions.Item>

              <Descriptions.Item label="Email Peserta">
                {certData.recipient?.email || '-'}
              </Descriptions.Item>

              <Descriptions.Item label="Kegiatan Pelatihan">
                <span style={{ fontWeight: 600, color: '#722ed1' }}>
                  {certData.workshop?.title}
                </span>
              </Descriptions.Item>

              <Descriptions.Item label="Tanggal Workshop">
                {certData.workshop?.date} {certData.workshop?.time ? `(${certData.workshop.time})` : ''}
              </Descriptions.Item>

              <Descriptions.Item label="Lokasi">
                {certData.workshop?.location}
              </Descriptions.Item>

              <Descriptions.Item label="Penerbit Resmi">
                {certData.issuer}
              </Descriptions.Item>

              <Descriptions.Item label="Kode Unik (UUID)" span={2}>
                <code style={{ fontSize: '12px', color: '#888' }}>{certData.uniq_code}</code>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </div>
      ) : (
        <Card
          style={{
            maxWidth: 600,
            width: '100%',
            borderRadius: 12,
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
          }}
        >
          <Result
            status="error"
            icon={<CloseCircleFilled style={{ color: '#ff4d4f' }} />}
            title="Sertifikat Tidak Valid atau Tidak Ditemukan"
            subTitle={errorMsg || 'Kode sertifikat tidak terdaftar dalam basis data resmi kami.'}
            extra={[
              <Link to="/home" key="home">
                <Button type="primary" icon={<HomeOutlined />}>
                  Kembali ke Beranda
                </Button>
              </Link>,
            ]}
          />
        </Card>
      )}

      {/* Footer */}
      <div style={{ marginTop: 40, textAlign: 'center', color: '#bfbfbf', fontSize: '12px' }}>
        &copy; {new Date().getFullYear()} BEM FIKTI Universitas Gunadarma &bull; FIKTI Learning Verification Service
      </div>
    </div>
  );
};

export default CertificateVerifyPage;
