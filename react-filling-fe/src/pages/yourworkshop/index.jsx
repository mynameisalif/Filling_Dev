import { useEffect, useState } from 'react';
import "./style.scss";
import { Modal, Row, Col, QRCode, message } from 'antd';
import CardsSimple from "./cardSimple2";
import CertificateView from "../../components/certificate/CertificateView";
import WorkshopStore from "../../stores/workshop";
import FeedbackStore from "../../stores/feedback";

import { useAuthUser } from 'react-auth-kit';
import CommentForm from "./CommentForm";
import ReviewList from "./review";
import { BASEURLIMG } from "../../../config/config";

const Index = () => {
  const auth = useAuthUser();
  const { getWorkshopPay } = WorkshopStore();
  const { create: createFeedback } = FeedbackStore();
  
  const [data, setData] = useState([]);
  const [updateFeedback, setUpdateFeedback] = useState("");

  useEffect(() => {
    initial();
  }, []);

  const initial = async () => {
    const rest = await getWorkshopPay(auth().user_id);
    setData(rest || []);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataTmp, setDataTmp] = useState([]);   
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

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

  const [isModalCert, setIsModalCert] = useState(false);
  const [dataCert, setDataCert] = useState(null);

 

 

  return (
    <>
    <div className='container-filter'>
        {/* <Input style={{width:'300px'}} placeholder="Search Workshop" suffix={<SearchOutlined/>} /> */}
        <h1>List your workshop</h1>
    </div>
    <div className='container-workshop'>        
        <div className='body-workshop'>
            {data.length < 1 &&  <h1>Workshop tidak ada</h1>}
            {data.map((card,a)=>{
               return <CardsSimple 
               onDetail = {()=>{
                showModal()
                setDataTmp(card)
               }}
               onFeedback = {()=>{
                showModalDetail()
                setDataDetail(card)
               }}
               onCertificate = {()=>{
                setDataCert(card);
                setIsModalCert(true);
               }}
               img={`${BASEURLIMG}/Workshop/${card.Workshop.img}`} 
               title={ card.Workshop.nama } 
               jam={card.Workshop.jam }
               tgl={card.Workshop?.tanggal || card.Workshoptanggal }
               price={card.Workshop.harga}
               place={card.Workshop.tempat}
               kuota ={card.Workshop.kuota}
               status = {card.status}
               description={ card.Workshop.deskripsi }
               key={a+"cardsimple232"} style={{width:'310px'}}/>
            })}         
        </div>

        <Modal title="Detail" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
            <Row gutter={[0,12]} style={{marginBottom:'1em'}}>
              <Col span={12}>
                {/* <Col span={24}> Judul : {dataTmp?.Workshop?.nama ?? "-"}</Col> */}
                <Col span={24}>Harga (IDR): {dataTmp?.Workshop?.harga ?? "-"}</Col>
                <Col span={24}>Tanggal : {dataTmp?.Workshop?.tanggal ?? "-"}</Col>
                <Col span={24}>Jam : {dataTmp?.Workshop?.jam ?? "-"}</Col>   
                <Col span={24}>Uniq Code :  {dataTmp?.uniq_code ?? "-"}</Col>  
              </Col>              
                <Col span={12}> <QRCode value={dataTmp?.uniq_code} /></Col> 
                <Col span={24}>Deskripsi : <span style={{color:'rgba(1,1,1,0.5)'}}>{dataTmp?.Workshop?.deskripsi}</span></Col> 
            </Row>          
        </Modal>

        <Modal title="Feedback" width={900} open={isModalDetail} onOk={handleOkDetail} onCancel={handleCancelDetail} footer={null}>
          <Row gutter={[0,12]} style={{marginBottom:'1em'}}>
              <Col span={24}><CommentForm onSubmit={async(e, file)=>{
                     
                          const formData = new FormData();
                          console.log('form')

                          // if(!e){
                          //     message.warning("Silahkan isi feedback  terlebih dahulu !")
                          //     return 
                          // }

                          formData.append("user_id" , dataDetail.user_id )
                          console.log('userid')
                          formData.append("workshop_id" , dataDetail.workshop_id  )
                          console.log('workshop_id')
                   
                          formData.append("feedback" , e )
                          console.log('feedback')

                          formData.append("image" , file )
                          console.log('image')

                          
                          try {                        
                          console.log('try')
                            
                              await  createFeedback(formData);
                          console.log('create')

                              setUpdateFeedback(Math.random())
                              message.success("User created successfully");

                       
                          } catch (error) {             
                          console.log('error' , error)

                              message.error(error);
                          }
                         

              }}/></Col>            
              <Col span={24}>Feedback  :</Col>            
              <ReviewList workshopid={dataDetail.workshop_id} update={updateFeedback} userId={dataDetail.user_id}/>
          </Row>

        </Modal>

        <Modal 
          title="E-Sertifikat Resmi Workshop" 
          width={960} 
          open={isModalCert} 
          onCancel={() => setIsModalCert(false)} 
          footer={null}
          destroyOnClose
          centered
        >
          {dataCert && <CertificateView data={dataCert} />}
        </Modal>
    </div>
    </>

  )
}

export default Index