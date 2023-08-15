import "./about.style.scss"
import {Row ,Col} from "antd"
import { useMediaQuery } from 'react-responsive'

const About = ()=>{
  const isMobile = useMediaQuery({
    query: '(max-width: 768px)'
  })

  if(isMobile){
    return (
    <section id="about" className="about">
        <div className="container">
          <div className="row">
            <div className="title">
              <h1>about filing</h1>
            </div>
          </div>
          <div className="content">
            <div className="shadow-lg rounded caption data-tilt-max-glare">
              <p>
                FIKTI Learning (FILING) merupakan kegiatan yang diselengarakan oleh BEM FIKTI UG Periode 2021/2022
                khususnya Departement Akademik. FILING memiliki kegiatan seperti pengembangan minat dan bakat bagi
                mahasiswa/i FIKTI UG yang
                dilaksanakan dalam bentuk workshop secara bertahap dengan 4 kali pertemuan selama satu bulan, dengan
                pokok materi pembelajaran di bidang teknologi informasi. Kegitan FILING ini akan di laksanakan secara
                online dengan
                menggunakan media Zoom cloud meetings.
              </p>
            </div>
            <div className="shadow tujuan data-tilt-max-glare">
              <h2>TUJUAN </h2>
              <ul>
                <li><i className="bi bi-check-circle"></i>Sebagai wadah pembelajaran bagi mahasiswa FIKTI Universitas
                  Gunadarma dalam bidang teknologi informasi.</li>
                <li><i className="bi bi-check-circle"></i>Memberikan wawasan mengenai Data Science dan Laravel Basic kepada
                  mahasiswa FIKTI Universitas Gunadarma.</li>
                <li><i className="bi bi-check-circle"></i>Meningkatkan hardskill mahasiswa FIKTI Universitas Gunadarma
                  khususnya di bidang Data Science dan Laravel Basic.</li>
                <li><i className="bi bi-check-circle"></i>Memberikan motivasi kepada mahasiswa FIKTI Universitas Gunadarma
                  untuk
                  mendalami ilmu di bidang teknologi informasi.</li>
              </ul>
            </div>
            <div className="shadow tujuan data-tilt-max-glare">
              <h2>SYARAT PENDAFTARAN FILING </h2>
              <ul>
                <li><i className="bi bi-check-circle"></i>Peserta harus berasal dari jurusan Fakultas Ilmu
                  Komputer dan Teknologi Informasi Universitas Gunadarma.</li>
                <li><i className="bi bi-check-circle"></i>Peserta memiliki ketertarikan terhadap Data Science atau Laravel Basic.</li>
                <li><i className="bi bi-check-circle"></i>Peserta telah melunasi pembayaran workshop sebesar 25k/ materi , dan
                  mengupload bukti screenshot pembayaran pada form pendaftaran. Dengan format JPG dan ukuran maximal 5mb.
                </li>
                <li><i className="bi bi-check-circle"></i>Peserta bersedia mengikuti workshop selama 4 pertemuan.</li>
              </ul>
            </div>
          </div>
        </div>
        </section>
    )
  }


    return(
      <section id="about" className="about">
        <div className="container">
          <div className="row">
            <div className="title">
              <h1>about filing</h1>
            </div>
          </div>
          <div className="content">
            <div className="shadow-lg rounded caption data-tilt-max-glare">
              <p>
                FIKTI Learning (FILING) merupakan kegiatan yang diselengarakan oleh BEM FIKTI UG Periode 2021/2022
                khususnya Departement Akademik. FILING memiliki kegiatan seperti pengembangan minat dan bakat bagi
                mahasiswa/i FIKTI UG yang
                dilaksanakan dalam bentuk workshop secara bertahap dengan 4 kali pertemuan selama satu bulan, dengan
                pokok materi pembelajaran di bidang teknologi informasi. Kegitan FILING ini akan di laksanakan secara
                online dengan
                menggunakan media Zoom cloud meetings.
              </p>
            </div>
            <div className="shadow tujuan data-tilt-max-glare">
              <h2>TUJUAN </h2>
              <ul>
                <li><i className="bi bi-check-circle"></i>Sebagai wadah pembelajaran bagi mahasiswa FIKTI Universitas
                  Gunadarma dalam bidang teknologi informasi.</li>
                <li><i className="bi bi-check-circle"></i>Memberikan wawasan mengenai Data Science dan Laravel Basic kepada
                  mahasiswa FIKTI Universitas Gunadarma.</li>
                <li><i className="bi bi-check-circle"></i>Meningkatkan hardskill mahasiswa FIKTI Universitas Gunadarma
                  khususnya di bidang Data Science dan Laravel Basic.</li>
                <li><i className="bi bi-check-circle"></i>Memberikan motivasi kepada mahasiswa FIKTI Universitas Gunadarma
                  untuk
                  mendalami ilmu di bidang teknologi informasi.</li>
              </ul>
            </div>
            <div className="shadow tujuan data-tilt-max-glare">
              <h2>SYARAT PENDAFTARAN FILING </h2>
              <ul>
                <li><i className="bi bi-check-circle"></i>Peserta harus berasal dari jurusan Fakultas Ilmu
                  Komputer dan Teknologi Informasi Universitas Gunadarma.</li>
                <li><i className="bi bi-check-circle"></i>Peserta memiliki ketertarikan terhadap Data Science atau Laravel Basic.</li>
                <li><i className="bi bi-check-circle"></i>Peserta telah melunasi pembayaran workshop sebesar 25k/ materi , dan
                  mengupload bukti screenshot pembayaran pada form pendaftaran. Dengan format JPG dan ukuran maximal 5mb.
                </li>
                <li><i className="bi bi-check-circle"></i>Peserta bersedia mengikuti workshop selama 4 pertemuan.</li>
              </ul>
            </div>
          </div>
        </div>
        </section>
    )
}
export default About;