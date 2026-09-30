import { Button, QRCode, message, Space, Tag } from 'antd';
import { PrinterOutlined, CopyOutlined, CheckCircleOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import './certificate.style.scss';

const CertificateView = ({ data, showActions = true }) => {
  if (!data) return null;

  // Resolve recipient's real full name (NEVER output email address)
  const getCleanFullName = () => {
    const candidate = data.recipient?.name;
    if (candidate && !candidate.includes('@')) {
      return candidate;
    }

    const fromUser = `${data.User?.first_name || ''} ${data.User?.last_name || ''}`.trim();
    if (fromUser) {
      return fromUser;
    }

    const emailCandidate = data.recipient?.email || data.User?.email;
    if (emailCandidate) {
      const username = emailCandidate.split('@')[0];
      const cleaned = username.replace(/[0-9]/g, '').replace(/[._-]/g, ' ').trim();
      if (cleaned) {
        return cleaned
          .split(' ')
          .filter(Boolean)
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
          .join(' ');
      }
    }

    return 'Peserta Workshop';
  };

  const recipientName = getCleanFullName();
  const npm = data.recipient?.npm || data.User?.npm || '-';
  const workshopTitle = data.workshop?.title || data.Workshop?.nama || 'Workshop FIKTI Learning';
  const workshopDate = data.workshop?.date || data.Workshop?.tanggal || '-';
  const workshopLocation = data.workshop?.location || data.Workshop?.tempat || 'Online / Jakarta';
  const certNumber = data.certificate_number || `CERT/FILING/2026/${String(data.id || 1).padStart(5, '0')}`;
  const uniqCode = data.uniq_code;

  const verificationUrl = `${window.location.origin}/verify-certificate/${uniqCode}`;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(verificationUrl);
    message.success('Tautan verifikasi sertifikat berhasil disalin ke clipboard!');
  };

  return (
    <div className="certificate-container">
      {showActions && (
        <div className="certificate-actions">
          <Button
            type="primary"
            icon={<PrinterOutlined />}
            size="large"
            style={{ backgroundColor: '#553580', borderColor: '#553580' }}
            onClick={handlePrint}
          >
            Cetak / Simpan PDF
          </Button>
          <Button
            icon={<CopyOutlined />}
            size="large"
            onClick={handleCopyLink}
          >
            Salin Link Validasi
          </Button>
          <Button
            icon={<SafetyCertificateOutlined />}
            size="large"
            onClick={() => window.open(`/verify-certificate/${uniqCode}`, '_blank')}
          >
            Buka Halaman Validator
          </Button>
        </div>
      )}

      <div className="certificate-card" id="certificate-print-area">
        {/* Corner Ornaments */}
        <div className="corner-decor top-left"></div>
        <div className="corner-decor top-right"></div>
        <div className="corner-decor bottom-left"></div>
        <div className="corner-decor bottom-right"></div>

        {/* Header */}
        <div className="cert-header">
          <div className="cert-org">BEM FIKTI UNIVERSITAS GUNADARMA</div>
          <div className="cert-title">SERTIFIKAT PENGHARGAAN</div>
          <div className="cert-subtitle">CERTIFICATE OF APPRECIATION</div>
          <div className="cert-number">No: {certNumber}</div>
        </div>

        {/* Body */}
        <div className="cert-body">
          <div className="cert-awarded-text">Diberikan dengan bangga kepada:</div>
          <div className="cert-recipient-name">{recipientName}</div>
          {npm !== '-' && <div className="cert-recipient-meta">NPM / ID: {npm}</div>}

          <div className="cert-desc">
            Atas partisipasi aktif, dedikasi, dan kelulusannya sebagai:
          </div>
          <Space style={{ marginBottom: 10 }}>
            <Tag color="#553580" style={{ fontSize: '13px', padding: '3px 14px', fontWeight: 600 }}>
              PESERTA (PARTICIPANT)
            </Tag>
          </Space>

          <div className="cert-desc">dalam kegiatan pelatihan resmi:</div>
          <div className="cert-workshop-title">{workshopTitle}</div>
          <div className="cert-date-loc">
            Dilaksanakan pada tanggal {workshopDate} &bull; Tempat: {workshopLocation}
          </div>
        </div>

        {/* Footer with Signatures, Seal, and Active QR Code */}
        <div className="cert-footer">
          {/* Ketua BEM FIKTI */}
          <div className="signature-block">
            <div className="signature-img-container">
              <svg className="dummy-signature" viewBox="0 0 160 55" width="135" height="46" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 14 36 C 24 10, 32 8, 40 24 C 46 38, 35 44, 48 18 C 56 6, 64 20, 70 34 C 76 20, 86 14, 96 28 C 102 36, 108 16, 120 14 C 130 12, 114 42, 144 36" stroke="#0f2b5c" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M 24 43 C 50 40, 98 42, 140 38" stroke="#0f2b5c" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="signature-line"></div>
            <div className="signee-person-name">M. Fadhil Ramadhan, S.Kom.</div>
            <div className="signee-role">Ketua BEM FIKTI</div>
            <div className="signee-org">Universitas Gunadarma</div>
          </div>

          {/* Official Gold Seal */}
          <div className="stamp-badge">
            <div className="seal-circle">
              <CheckCircleOutlined style={{ fontSize: '18px', marginBottom: 2 }} />
              BEM FIKTI<br />OFFICIAL<br />VERIFIED
            </div>
            <div className="seal-caption">Dokumen Resmi Digital</div>
          </div>

          {/* Ketua Pelaksana */}
          <div className="signature-block">
            <div className="signature-img-container">
              <svg className="dummy-signature" viewBox="0 0 160 55" width="135" height="46" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 18 16 C 30 44, 38 6, 50 30 C 58 44, 64 24, 74 18 C 84 12, 88 34, 100 26 C 110 18, 118 12, 130 24 C 122 34, 92 44, 138 38" stroke="#0f2b5c" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M 32 41 C 62 44, 104 40, 130 42" stroke="#0f2b5c" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="signature-line"></div>
            <div className="signee-person-name">Ahmad Raihan Pratama</div>
            <div className="signee-role">Ketua Pelaksana</div>
            <div className="signee-org">FIKTI Learning (FILING)</div>
          </div>

          {/* Verification QR Code */}
          <div className="qr-block">
            <div className="qr-wrapper">
              <QRCode value={verificationUrl} size={80} bordered={false} />
            </div>
            <div className="qr-caption">Scan QR untuk Validasi Resmi</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateView;

