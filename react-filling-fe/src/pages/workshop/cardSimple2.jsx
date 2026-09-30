import { Card, Button, Image } from "antd";
import { truncateText } from "../../utils/useString";

const App = ({
  onBuy,
  onDetail,
  style,
  title = "workshop",
  kuota = 10,
  description = "deskripsi",
  tgl = "2023-07-12",
  jam = "13:04:15",
  price = "10k",
  place = "jakarta",
  img = "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
}) => {
  return (
    <Card
      hoverable
      style={{
        margin: "1em",
        ...style,
      }}
      cover={<Image alt={title} style={{ height: '250px', objectFit: 'cover' }} src={img} />}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "8px",
        }}
      >
        <span>Judul : {title}</span>
        <span style={{ color: "rgba(0,0,0,0.5)", fontSize: "11px" }}>{`${tgl}, ${jam}`}</span>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "8px",
        }}
      >
        <span>Harga (IDR) : {price}</span>
        <span>Kuota : {kuota}</span>
      </div>

      <div style={{ marginBottom: "8px" }}>Tempat : {place}</div>

      <div className="des">
        <span>{truncateText(description, 20)}</span>
        {description && description.length > 20 && (
          <span
            id="more-link"
            style={{ color: '#1890ff', cursor: 'pointer', marginLeft: '6px' }}
            onClick={() => onDetail && onDetail()}
          >
            selengkapnya
          </span>
        )}
        {description && description.length <= 20 && (
          <span
            id="more-link"
            style={{ color: '#1890ff', cursor: 'pointer', marginLeft: '6px' }}
            onClick={() => onDetail && onDetail()}
          >
            detail
          </span>
        )}
      </div>

      <Button
        style={{ marginTop: "1em", backgroundColor: "green", color: "white" }}
        onClick={() => {
          if (onBuy) onBuy();
        }}
      >
        Buy
      </Button>
    </Card>
  );
};

export default App;
