import React from 'react'
import { Tabs, Row, Col,Divider } from 'antd';

import { ReactECharts } from "./barSummary";

export function MonthBar() {
  return (
    <Row >
        <Col xs={12}>
            <Row style={{fontSize:10, color:'#6A7178', marginBottom:5}}>Traffic : 8.6 Tbps</Row>
            <Row>
                <Col xs={18} style={{fontWeight:'bold'}}>Volte HSS</Col>
                <Col xs={6} style={{fontSize:11, color:'#29823B',fontWeight:'bold'}}>74%<span style={{fontSize:16,color:'#29823B'}}>▴</span></Col>
            </Row>
            <Row style={{fontSize:10, color:'#ADB5BD'}}>Cap : 11.7 Tbps (Retail)</Row>
            <Row>
                <Col xs={12} style={{fontSize:9}}><span style={{fontSize:16,color:'#29823B'}}>▴</span>15% WoW </Col>
                <Col xs={12} style={{fontSize:9}}><span style={{fontSize:16,color:'#D83232'}}>▾</span>1% MoM</Col>
            </Row>
        </Col>
        <Col xs={12}>
            <div style={{width:'110px',height:'83px'}}> <ReactECharts/></div>
        </Col>
    </Row>
  );
}


