import React from "react";
import { Card, Button, Tag , Image } from "antd";
import { useNavigate } from "react-router-dom";
import { truncateText } from "../../utils/useString";
const { Meta } = Card;
const statusCard = {
  Bayar: "Sudah bayar, Menunggu approval",
};
const App = ({
  status,
  onDetail,
  onFeedback,
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
  const navigate = useNavigate();
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
        <div style={{display:'flex' , gap:'10px' , alignItems:'center '}}>
          <Tag color="green">
            {"Lunas"}
          </Tag>
          <Button
            onClick={() => {
              onDetail();
            }}
          >
             Detail
          </Button>
          <Button
            onClick={() => {
              onFeedback();
            }}
          >
             Feedback
          </Button>
        </div>
      )}
    </Card>
  );
};
export default App;
