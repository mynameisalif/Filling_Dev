import React, { useEffect, useState } from 'react';
import WorkshopCardSample from '../../pages/workshop/cardSimple';

import './workshop.style.scss';
import WorkshopStore from '../../stores/workshop';

import { useMediaQuery } from 'react-responsive';
import {BASEURLIMG} from "../../../config/config"


const CardContainer = (props) => (
  <div className="cards-container">
    {props.cards.map((card) => (
      <WorkshopCardSample img={`${BASEURLIMG}/Workshop/${card.img}`} title={card.nama} jam={card.jam} id={card.id} tgl={card.tanggal} price={card.harga} place={card.tempat} kuota={card.kuota} description={card.deskripsi} />
      //   <Card title={ card.title }
      //     content={ card.content }
      //     imgUrl={ card.imgUrl } />
    ))}
  </div>
);

function workshop() {
  const isMobile = useMediaQuery({
    query: '(max-width: 768px)',
  });

  const { getAll, deletes } = WorkshopStore();
  const [data, setData] = useState([]);

  useEffect(() => {
    initial();
  }, []);
  const initial = async () => {
    const rest = await getAll();
    setData(rest);
  };

  return (
    <div className="container-workshop-home" id="workshop">
      <h1 style={{ 'text-align': 'center' }}>Workshop</h1>

      <CardContainer cards={data} />
    </div>
  );
}

export default workshop;
