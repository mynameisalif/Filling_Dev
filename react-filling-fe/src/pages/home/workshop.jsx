import { useEffect, useState } from 'react';
import WorkshopCardSample from '../../pages/workshop/cardSimple';
import './workshop.style.scss';
import WorkshopStore from '../../stores/workshop';
import { BASEURLIMG } from "../../../config/config";

const CardContainer = (props) => (
  <div className="cards-container">
    {props.cards?.map((card) => (
      <WorkshopCardSample
        key={card.id}
        img={`${BASEURLIMG}/Workshop/${card.img}`}
        title={card.nama}
        jam={card.jam}
        id={card.id}
        tgl={card.tanggal}
        price={card.harga}
        place={card.tempat}
        kuota={card.kuota}
        description={card.deskripsi}
      />
    ))}
  </div>
);

function Workshop() {
  const getAll = WorkshopStore((state) => state.getAll);
  const [data, setData] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const initial = async () => {
      try {
        const rest = await getAll();
        if (isMounted) {
          setData(rest || []);
        }
      } catch (error) {
        console.error(error);
      }
    };

    initial();

    return () => {
      isMounted = false;
    };
  }, [getAll]);

  return (
    <div className="container-workshop-home" id="workshop">
      <h1 style={{ textAlign: 'center' }}>Workshop</h1>
      <CardContainer cards={data} />
    </div>
  );
}

export default Workshop;
