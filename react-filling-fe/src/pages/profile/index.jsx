
import React, {useEffect , useState} from 'react'
import "./style.scss"
import {useAuthUser} from 'react-auth-kit'
import Form from "./form"
import UserStore from "../../stores/user";




function index() {
    const auth = useAuthUser()
    const {getAllById } = UserStore()
    const [data , setData] = useState({
        "id": null,
        "first_name":null,
        "last_name": null,
        "npm": null,
        "kelas": null,
        "jurusan": null,
        "email": null,
        "line_account": null,
        "wa_account": null,
        "phone_number": null,
        "img": null,       
    });

    useEffect(()=>{
        init()
    },[]);

    const init = async()=>{
       const data =  await getAllById(auth().user_id);
       console.log(data , 'data')
       setData(data)

    }

  return (
    <div className='container-profile'>
        <Form data={data}/>
    </div>
  )
}

export default index