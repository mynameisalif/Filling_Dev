import React, { useEffect, useState } from 'react';
import './style.scss';
import { EditOutlined, EllipsisOutlined, SettingOutlined, SearchOutlined } from '@ant-design/icons';
import { Avatar, Card, Modal, Row, Col, Tag } from 'antd';
import { Input } from 'antd';
import CardsSimple from './cardSimple2';
import WorkshopStore from '../../stores/workshop';
import FormPayment from './form/payment';
import { useAuthUser } from 'react-auth-kit';
import ReviewList from './review';
import {BASEURLIMG} from "../../../config/config"


const { Meta } = Card;

const Index = () => {
  const auth = useAuthUser();
  const { getAll, deletes, getWorkshopNotPay } = WorkshopStore();
  const [data, setData] = useState([]);

  useEffect(() => {
    initial();
  }, []);

  const initial = async () => {
    // setLoading(true);
    const rest = await getWorkshopNotPay(auth().user_id);
    setData(rest);
    // setLoading(false);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState('');
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

  return (
    <>
      <div className="container-filter">
        {/* <Input style={{width:'300px'}} placeholder="Search Workshop" suffix={<SearchOutlined/>} /> */}
        <h1>List Workshop</h1>
      </div>
      <div className="container-workshop">
        <div className="body-workshop">
          {data.length < 1 && <h1>Workshop tidak ada</h1>}
          {data.map((card, a) => {
            return (
              <CardsSimple
                onBuy={() => {
                  setDataTmp(card);
                  showModal();
                }}
                onDetail={() => {
                  setDataDetail(card);
                  showModalDetail();
                }}
                img={`${BASEURLIMG}/Workshop/${card.img}`}
                title={card.nama}
                jam={card.jam}
                tgl={card.tanggal}
                price={card.harga}
                place={card.tempat}
                kuota={card.kuota}
                description={card.deskripsi}
                key={a + 'cardsimple'}
                style={{ width: '310px' }}
              />
            );
          })}
        </div>

        {/* payment */}
        <Modal title="Payment" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
          <Row gutter={[0, 12]} style={{ marginBottom: '1em' }}>
            <Col span={24}> Judul : {dataTmp.nama}</Col>
            <Col span={24}>Harga (IDR): {dataTmp.harga}</Col>
            <Col span={24}>Tanggal : {dataTmp.tanggal}</Col>
            <Col span={24}>Jam : {dataTmp.jam}</Col>
            <Col span={24}>
              Rekening (ABC) : <Tag color="magenta">12312321321</Tag>
            </Col>
          </Row>
          <FormPayment onOk={handleOk} dataTmp={dataTmp} status={status} />
        </Modal>
        {/* end payment */}

        <Modal title="Detail" width={900} open={isModalDetail} onOk={handleOkDetail} onCancel={handleCancelDetail} footer={null}>
          <Row gutter={[0, 12]} style={{ marginBottom: '1em' }}>
            <Col span={24}> Judul : {dataDetail.nama}</Col>
            <Col span={24}>Harga (IDR): {dataDetail.harga}</Col>
            <Col span={24}>Tanggal : {dataDetail.tanggal}</Col>
            <Col span={24}>Jam : {dataDetail.jam}</Col>
            <Col span={24}>
              Deskripsi : <span style={{ color: 'rgba(1,1,1,0.5)' }}>{dataDetail.deskripsi}</span>
            </Col>
            <Col span={24}>
              Feedback :
              <ReviewList workshopid={dataDetail.workshop_id} />
            </Col>
          </Row>
        </Modal>
      </div>
    </>
  );
};

export default Index;
