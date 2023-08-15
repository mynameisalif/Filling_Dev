import { HashLink } from 'react-router-hash-link';
import Artboard30 from '../../assets/Artboard30.png';
// import { HashLink} from 'react-router-hash-link';
import './home.style.scss';
import { Row, Col } from 'antd';
import { useMediaQuery } from 'react-responsive';

const InitialSection = () => {
  const isMobile = useMediaQuery({
    query: '(max-width: 768px)',
  });

  if (isMobile) {
    return (
      <Row className="homeMobile">
        <Col span={24}>
          <div className="caption">
            <h1>FILING</h1>
            <h1>(FIKTI Learning)</h1>
            <h2>
              {'"Ready to Face Global Competition by'}
              <br></br>
              {'\n Improving Data Science and Laravel Basic Skills”'}
            </h2>
            <HashLink to="/#about" className="btn-get-started">
              Pelajari Lebih Lanjut
            </HashLink>
          </div>
        </Col>
        <Col span={24}>
          <div className="image">
            <img src={Artboard30} alt="logo-filing" width="400" />
          </div>
        </Col>
      </Row>
    );
  }

  return (
    <section id="hero" className="container-home">
      <div className="container-banner">
        <div className="caption">
          <h1>FILiNG</h1>
          <h1>(FIKTI Learning)</h1>
          <h2>
            {'"Ready to Face Global Competition by'}
            <br></br>
            {'\n Improving Data Science and Laravel Basic Skills”'}
          </h2>
          <HashLink to="/#about" className="btn-get-started">
            Pelajari Lebih Lanjut
          </HashLink>
        </div>
        <div className="image">
          <img src={Artboard30} alt="logo-filing" width="600px" />
        </div>
      </div>
    </section>
  );
};
export default InitialSection;
