

import React from 'react'
import { Tabs, Row, Col,Divider } from 'antd';
import { ArrowsAltOutlined } from '@ant-design/icons';

import { MonthBar } from "./monthBar";


function SummaryNE() {
  return (
    <div className='container-summaryne-excecutive'>
        <div className='body-summaryne'>
            <Row  style={{ marginTop:10}}>
              <Col xs={24}>
                <div  style={{border: '2px dotted #CED4DA'}}>
                  <h3 style={{color: '#FF8665', margin:0, padding: '0px 10px'}}>Summary : Volte HSS has High Util above 79%</h3>
                </div>
              </Col>
            </Row>
            <Row gutter={10}  style={{ marginTop:20}}>
              <Col xs={6}>
                <MonthBar/>
              </Col>
              
              <Col xs={6}>
                <MonthBar/>
              </Col>
              
              <Col xs={6}>
                <MonthBar/>
              </Col>
              
              <Col xs={6}>
                <MonthBar/>
              </Col>
            </Row>
            <Divider />
            <Row gutter={10}>
              <Col xs={6}>
                <MonthBar/>
              </Col>
              
              <Col xs={6}>
                <MonthBar/>
              </Col>
              
              <Col xs={6}>
                <MonthBar/>
              </Col>
              
              <Col xs={6}>
                <MonthBar/>
              </Col>
            </Row>
            <ArrowsAltOutlined style={{fontSize:'20px', color:'lightgray', position:'absolute', right:'5px' , top : '10px'}} />
        </div>      
    </div>
  )
}

export default SummaryNE