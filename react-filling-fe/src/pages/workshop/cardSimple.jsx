import { useState } from 'react';
import { Card, Button, Modal, Row, Col, Image } from 'antd';
import ReviewList from "./review";
import { useNavigate } from 'react-router-dom';
import { truncateText } from "../../utils/useString";

const App = ({
  id,
  title = "workshop",
  kuota = 10,
  description = "deskripsi",
  tgl = "2023-07-12",
  jam = "13:04:15",
  price = "10k",
  place = "jakarta",
  img = "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
}) => {
  const navigate = useNavigate();
  const [isModalDetail, setIsModalDetail] = useState(false);

  const showModalDetail = () => {
    setIsModalDetail(true);
  };
  const handleOkDetail = () => {
    setIsModalDetail(false);
  };
  const handleCancelDetail = () => {
    setIsModalDetail(false);
  };

  return (
    <Card
      hoverable
      style={{
        maxWidth: '400px',
        minWidth: '350px',
        maxHeight: '600px',
        margin: '1em',
        flex: '1 0 250px',
      }}
      cover={<Image alt={title} style={{ height: '300px', objectFit: 'cover' }} src={img} />}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <span>Judul : {title}</span>
        <span style={{ color: 'rgba(0,0,0,0.5)', fontSize: '12px' }}>{`${tgl}, ${jam}`}</span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <span>Harga (IDR) : {price}</span>
        <span>Kuota : {kuota}</span>
      </div>

      <div style={{ marginBottom: '8px' }}>Tempat : {place}</div>

      <div className="des">
        <span>{truncateText(description, 20)}</span>
        {description && description.length > 20 && (
          <span
            id="more-link"
            style={{ color: '#1890ff', cursor: 'pointer', marginLeft: '6px' }}
            onClick={() => {
              showModalDetail();
            }}
          >
            selengkapnya
          </span>
        )}
      </div>

      <Button
        style={{ marginTop: '1em', backgroundColor: 'green', color: 'white' }}
        onClick={() => {
          navigate("/login");
        }}
      >
        Buy
      </Button>

      <Modal
        title="Detail"
        width={900}
        open={isModalDetail}
        onOk={handleOkDetail}
        onCancel={handleCancelDetail}
        footer={null}
      >
        <Row gutter={[0, 12]} style={{ marginBottom: '1em' }}>
          <Col span={24}>Judul : {title}</Col>
          <Col span={24}>Harga (IDR): {price}</Col>
          <Col span={24}>Tanggal : {tgl}</Col>
          <Col span={24}>Jam : {jam}</Col>
          <Col span={24}>
            Deskripsi : <span style={{ color: 'rgba(1,1,1,0.5)' }}>{description}</span>
          </Col>
          <Col span={24}>
            Feedback :
            <ReviewList workshopid={id} />
          </Col>
        </Row>
      </Modal>
    </Card>
  );
};

export default App;