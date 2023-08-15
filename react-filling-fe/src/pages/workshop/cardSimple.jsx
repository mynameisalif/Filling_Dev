import React , {useState  } from 'react';
import { Card , Button, Modal , Row , Col ,Image } from 'antd';
import ReviewList from "./review"

import { useNavigate } from 'react-router-dom';
import {truncateText} from "../../utils/useString"
const { Meta } = Card;
const App = ({id, title = "workshop", kuota = 10, description="deskripsi", tgl="2023-07-12" ,jam = "13:04:15", price = "10k", place="jakarta", img ="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"}) => {
    const navigate =  useNavigate()


  const [isModalDetail, setIsModalDetail] = useState(false);
  const [dataDetail, setDataDetail] = useState([]);   

  const showModalDetail = () => {
    setIsModalDetail(true);
  };
  const handleOkDetail = () => {
    setIsModalDetail(false);
  };
  const handleCancelDetail = () => {
    setIsModalDetail(false);
  };

 
    return(
        <Card
          hoverable
          style={{
              maxWidth:'400px',
              minWidth:'350px',
              maxHeight:'600px',
              margin: '1em' ,
              flex: '1 0 250px'
              }}
          cover={<Image alt="example"  style={{height:'300px'}}  src={img}/>}
        >
      
          <p style={{display:'flex', lineHeight:'0px', justifyContent: 'space-between'}}>
              <p>Judul : {title}</p>
            
              <p style={{color:'rgba(0,0,0,0.5)'}}>{`${tgl}, ${jam}`}</p>
      
              {/* <p>{Kuota : {kuota}}</p> */}
          </p>
          <p style={{display:'flex', lineHeight:'0px', justifyContent: 'space-between'}}>
              <p>Harga (IDR) : {price}</p>
              <p>Kuota : {kuota}</p>
          </p>
      
          <p>Tempat : {place} </p>
          <p className="des">
          
        {truncateText(description, 20)}
        {description.length > 20 && (
          <p
            id="more-link"
            onClick={() => {             
              showModalDetail();
            }}
          >
            selengkapnya
          </p>
        )}
      </p>
          <Button style={{marginTop:'1em', backgroundColor:'green' , color:'white'}} onClick={()=>{
                navigate("/login")
          }}>Buy</Button>


        <Modal title="Detail" width={900} open={isModalDetail} onOk={handleOkDetail} onCancel={handleCancelDetail} footer={null}>
          <Row gutter={[0,12]} style={{marginBottom:'1em'}}>
              <Col span={24}> Judul : {title}</Col>
              <Col span={24}>Harga (IDR): {price}</Col>
              <Col span={24}>Tanggal : {tgl}</Col>
              <Col span={24}>Jam : {jam}</Col>
              <Col span={24}>Deskripsi : <span style={{color:'rgba(1,1,1,0.5)'}}>{description}</span></Col>
              <Col span={24}>Feedback :
                 <ReviewList workshopid={id}/>
              </Col>

          </Row>

        </Modal>


       
        </Card>
      );
} 
export default App;