


import React from 'react'
import "./style.scss"
import ExcecutiveSummaryContent from "./excecutiveSummaryContent"
import Cube3d from "../../../src/assets/img/3dcube.svg";

function Index() {
  return (
    <div className='container-excecutive'>
        <div className='body-red'>
            <img src={Cube3d} height={"24px"} style={{marginBottom:-6}}  alt=''></img><span className='navigationPath'> / {'Smartplanning'} / <strong>{'Dashboard Core'}</strong></span>
            <h2 className='titleHeader'>Excecutive Summary</h2>
            <ExcecutiveSummaryContent/>
        </div>
    </div>
  )
}

export default Index