import React from "react";
import { Card, Button , Image } from "antd";
import { useNavigate } from "react-router-dom";
import {truncateText} from "../../utils/useString"

const { Meta } = Card;
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
  const navigate = useNavigate();
  return (
    <Card
      hoverable
      style={{
        margin: "1em",
        ...style,
      }}
      cover={<Image alt="example"  style={{height:'250px'}}   src={img} />}
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
        <p>Kuota : {kuota}</p>
      </p>

      <p>Tempat : {place} </p>
      <p className="des">
        {truncateText(description , 20)}
        {description.length > 20 && <p id="more-link" onClick={()=>{onDetail()}}>selengkapnya</p>}
        {description.length < 20 && <p id="more-link" onClick={()=>{onDetail()}}>&nbsp;&nbsp;detail</p>}

      </p>
    
      <Button
        style={{ marginTop: "1em", backgroundColor: "green", color: "white" }}
        onClick={() => {
          onBuy();
        }}
      >
        Buy
      </Button>
    </Card>
  );
};
export default App;
