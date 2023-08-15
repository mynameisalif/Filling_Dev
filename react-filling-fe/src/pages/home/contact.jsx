import React from 'react';
import { Descriptions } from 'antd';
import './contact.style.scss';
const App = () => (
  <Descriptions title="Contact Person" className="footer" id="contact">
    <Descriptions.Item label="Line">@putridian</Descriptions.Item>
    {/* <Descriptions.Item label="UserName">Alip Nurohman</Descriptions.Item> */}
    {/* <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item> */}
    {/* <Descriptions.Item label="Remark">empty</Descriptions.Item> */}
    {/* <Descriptions.Item label="Address">No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China</Descriptions.Item> */}
  </Descriptions>
);
export default App;
