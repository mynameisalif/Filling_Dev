

import React , {useState}from 'react'
import { Input , Button , Row , Col , Tag , message } from 'antd';
import PaymentStore from "../../stores/payment";
import AttendanceStore from "../../stores/attendance";

import {AiOutlineCloseCircle , AiOutlineCheck} from "react-icons/ai"




function checkin(props) {
  const { checkUniqCode } = PaymentStore();
  const {create} = AttendanceStore()
  const [uniq_code, setUniqCode] =  useState("")
  const [loading, setLoading] =  useState(false)
  const [status, setStatus] =  useState("")
  const [data, setData] =  useState({
    User:{
        last_name : "-",
        first_name:"-"
    }
  })




  return (
    <div style={{ backgroundColor:'white',boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' , padding:'1em'}}>
        <div style={{alignItems:'center', display:'flex', gap:'10px',}}>
        <span>Uniq Code :</span>
        <Input style={{width:'200px'}} onChange={(e)=>{setUniqCode(e.target.value)}} />
        <Button 
        loading={loading}
        onClick={async()=>{
            try {
                setLoading(true)
                const a = await checkUniqCode(uniq_code)
                console.log(a, 'dsdsa')
                if(a == "Payment not found handle error"){
                    setStatus("error")
                }else{
                    setStatus("done")
                }    
                setData(a)
                setLoading(false)
            } catch (error) {
                setStatus("error")
                setLoading(false)
            }
        }}>Check</Button>
        {status == "error" && <AiOutlineCloseCircle style={{color:'red'}}/>}
        {status == "done" && <AiOutlineCheck style={{color:'green'}}/>}
        </div>

        {status == "done" &&
        <div style={{alignItems:'center', display:'flex', gap:'10px', marginTop:'1em'}}>
            <Row gutter={[0,12]}>
                <Col span={24}>Nama :  {`${data.User.first_name} ${data.User.last_name}`}</Col>
                <Col span={24}>Workshop :  {`${data.Workshop.nama}`}</Col>
                <Col span={24}>Status Pembayaran :  <Tag color="green">{`${data.status}`}</Tag> </Col>
                <Col span={24}><Button onClick={async()=>{
                    try {
                        const formData = new FormData();
                        formData.append("user_id" , data.user_id  )
                        formData.append("workshop_id" , data.workshop_id  )
                        formData.append("kesimpulan_materi" , null  )
                        formData.append("image" , null )

                        await create(formData)
                        setStatus("")
                        message.success("data successfully added")
                        props.OnAttend()
                    } catch (error) {
                        message.error(error)
                    }
                }}> Add to attend </Button> </Col>
            </Row>
        </div>
        }
        

    </div>
  )
}

export default checkin