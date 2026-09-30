import { Card, Button, Tag, Image } from "antd";
import { truncateText } from "../../utils/useString";

const statusCard = {
  Bayar: "Sudah bayar, Menunggu approval",
};
const App = ({
  status,
  onDetail,
  onFeedback,
  onCertificate,
  style,
  title = "workshop",
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
        //   maxWidth:'400px',
        //   maxHeight:'600px',
        margin: "1em",
        //   flex: '1 0 250px',
        ...style,
      }}
      cover={<Image alt="example" src={img} />}
    >
      <p
        style={{
          display: "flex",
          alignItems: "center",
          lineHeight: "0px",
          justifyContent: "space-between",
        }}
      >
        <p>Judul : {title}</p>

        <p
          style={{ color: "rgba(0,0,0,0.5)", fontSize: "11px" }}
        >{`${tgl}, ${jam}`}</p>

        {/* <p>{Kuota : {kuota}}</p> */}
      </p>
      <p
        style={{
          display: "flex",
          lineHeight: "0px",
          justifyContent: "space-between",
        }}
      >
        <p>Harga (IDR) : {price}</p>
      </p>

      <p>Tempat : {place} </p>
      <p className="des">
        {truncateText(description, 20)}
        {description.length > 20 && (
          <p
            id="more-link"
            onClick={() => {
              onDetail();
            }}
          >
            selengkapnya
          </p>
        )}
      </p>
      {status.toLowerCase() != "lunas" && (
        <Tag color="magenta" style={{ marginTop: "1em" }}>
          {" "}
          {statusCard[status]}
        </Tag>
      )}

      {status.toLowerCase() == "lunas" && (
        <div style={{display:'flex' , gap:'8px' , alignItems:'center ', flexWrap: 'wrap'}}>
          <Tag color="green">
            {"Lunas"}
          </Tag>
          <Button
            size="small"
            onClick={() => {
              onDetail();
            }}
          >
             Detail
          </Button>
          <Button
            size="small"
            onClick={() => {
              onFeedback();
            }}
          >
             Feedback
          </Button>
          <Button
            type="primary"
            size="small"
            style={{ backgroundColor: "#553580", borderColor: "#553580" }}
            onClick={() => {
              onCertificate && onCertificate();
            }}
          >
             🎓 E-Sertifikat
          </Button>
        </div>
      )}
    </Card>
  );
};
export default App;
