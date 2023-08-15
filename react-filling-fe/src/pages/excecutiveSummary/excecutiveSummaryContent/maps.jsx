

import React from 'react'
import { Tabs } from 'antd';
import { ArrowsAltOutlined } from '@ant-design/icons';
import GGSN from "./ggsn"


function Maps() {
  return (
    <div className='container-map-excecutive'>
        <div className='header-map'>
            <h3><strong>POP Profiling</strong></h3>
        </div>
        <div className='body-maps'>
            <Tabs
                style={{
                    color:'rgba(0,0,0,0.5'
                }}
                defaultActiveKey="1"
                items={[
                {
                    label: 'GGSN',
                    key: '1',
                    children: <div style={{width:'100px' , height:'100px'}}><GGSN/></div> ,
                },
                {
                    label: 'SGSN/MME',
                    key: '2',
                    children: 'Underconstruct',
                },
                {
                    label: 'HLR',
                    key: '3',
                    children: 'Underconstruct',
                },
                {
                    label: 'EIR',
                    key: '4',
                    children: 'Underconstruct',
                },
                {
                    label: 'IMS',
                    key: '5',
                    children: 'Underconstruct',
                },
                {
                    label: 'CDN',
                    key: '6',
                    children: 'Underconstruct',
                },
                {
                    label: 'DRA',
                    key: '7',
                    children: 'Underconstruct',
                },
            
                ]}
            />
            <ArrowsAltOutlined style={{fontSize:'20px', color:'lightgray', position:'absolute', right:'5px' , top : '40px'}} />
        </div>      
    </div>
  )
}

export default Maps