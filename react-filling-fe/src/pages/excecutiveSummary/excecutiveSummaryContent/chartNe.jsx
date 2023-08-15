

import React from 'react'
import { Tabs } from 'antd';
import { ArrowsAltOutlined } from '@ant-design/icons';

import { ReactECharts } from "./barNE";

function ChartNE() {
  return (
    <div className='container-ne-excecutive'>
        <div className='header-ne'>
            <h3><strong>NE</strong></h3>
        </div>
        <div className='body-ne'>
            <ReactECharts/>
            <ArrowsAltOutlined style={{fontSize:'20px', color:'lightgray', position:'absolute', right:'5px' , top : '40px'}} />
        </div>      
    </div>
  )
}

export default ChartNE