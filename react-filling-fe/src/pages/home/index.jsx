import React from 'react';
import Home from './home';
import About from './about';
import Faq from './faq';
import Contact from './contact';
import Workshop from './workshop';

export default function index() {
  return (
    <>
      <Home />
      <About />
      <Workshop />
      <Faq />
      <Contact />
    </>
  );
}
