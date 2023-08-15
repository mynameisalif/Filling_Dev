import { Collapse } from 'antd';
import "./faq.style.scss"
import React from 'react';
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const items = [
  {
    key: '1',
    label: ' Apa itu FILING ?',
    children: `FIKTI Learning (FILING) merupakan program kerja dari
    Departemen Akademik. FILING memiliki kegiatan seperti
    pengembangan minat dan bakat bagi mahasiswa/i FIKTI UG
    yang dilaksanakan dalam bentuk workshop secara bertahap
    dengan 4 kali pertemuan selama satu bulan. FILING berfokus
    untuk mengasah hardskill para peserta dengan pokok materi
    pembelajaran di bidang teknologi informasi.`,
  },
  {
    key: '2',
    label: 'Kapan dan dimana FILING dilaksanakan?',
    children: "Pada Hari, Tanggal : Minggu, 10, 17, 24 April dan 8 mei 2022 Di Zoom Cloud Meeting",
  },
  {
    key: '3',
    label: 'Apakah ada biaya pendaftaran di FILING?',
    children: "Iya ada biaya pendaftaran. Sebesar Rp.25.000,- per materi workshop"
  },
  {
    key: '4',
    label: 'Bagaimana saya mengetahui bahwa saya berhasil meregistrasi?',
    children: "Setelah berhasil mendaftar para peserta akan diundang ke dalam grup yang disediakan oleh panitia."
  },
  {
    key: '5',
    label: 'Apa kita bisa memilih 2 materi workshop sekaligus?',
    children: "Iya boleh memilih 2 materi workshop."
  },
  {
    key: '6',
    label: 'Kapan pendaftaran workshop FILING ditutup?',
    children: 'Pendaftran di tutup pada tanggal 10 april 2022'
  },
];
const App = () => <div className='container-collaps' id="faq">
  <span className='faqtitle'>FAQ</span>
  <Collapse className='accordion' accordion items={items} />
  </div>;
export default App;

