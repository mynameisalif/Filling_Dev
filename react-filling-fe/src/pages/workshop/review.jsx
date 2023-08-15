import { Avatar, List } from 'antd';
import React , {useEffect, useState} from 'react';
import FeedbackStore from "../../stores/feedback";
import moment from "moment";
import { useMediaQuery } from 'react-responsive'
import {BASEURLIMG} from "../../../config/config"


const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];
const App = (props) => {
    const isMobile = useMediaQuery({
      query: '(max-width: 768px)'
    })
    const {  getAllByWorkshop } = FeedbackStore();
    const [data , setData] = useState([])

    useEffect(()=>{
        initial()
    } , [props.workshopid])

    const initial = async()=>{
        const rest = await getAllByWorkshop(props.workshopid)
        setData(rest)
        console.log(rest)
    }

    if(isMobile){
      return (
        <List
        grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 4 }}
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item
            extra={
                item.image ?
                <img
                  width={272}
                  alt="img"
                  src={`${BASEURLIMG}/Feedback/${item.image}`}
                />
                :  <div>No Image Available</div>
              }
            >
              <List.Item.Meta
              
                avatar={<Avatar src={`${BASEURLIMG}/User/${item.User.image}`} />}
                title={<a href="#">{item.User.first_name} {item.User.last_name}  &nbsp; <span style={{color:'lightgray' , fontWeight:'normal'}}>{moment(item.created_at).format("DD-MM-YYYYY")}</span></a>}
                description={item.feedback}
               
              />
            </List.Item>
          )}
        />
      )
    }
    return(
        <List       
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item
            extra={
                item.image ?
                <img
                  width={272}
                  alt="img"
                  src={`${BASEURLIMG}/Feedback/${item.image}`}
                />
                :  <div>No Image Available</div>
              }
            >
              <List.Item.Meta
              
                avatar={<Avatar src={`${BASEURLIMG}/User/${item.User.image}`} />}
                title={<a href="#">{item.User.first_name} {item.User.last_name}  &nbsp; <span style={{color:'lightgray' , fontWeight:'normal'}}>{moment(item.created_at).format("DD-MM-YYYYY")}</span></a>}
                description={item.feedback}
               
              />
            </List.Item>
          )}
        />
      );

}
export default App;