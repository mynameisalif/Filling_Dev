import { createElement } from 'react';

import { Link } from "react-router-dom";
import LogoCore from "../assets/logo/logo-core.svg"
import LogoTransport from "../assets/logo/logo-transport.svg"
import LogoSetting from "../assets/logo/logo-setting.svg"
import LogoPower from "../assets/logo/logo-power.svg"
import LogoDatacomm from  "../assets/logo/logo-datacomm.svg"
import { GoHome } from 'react-icons/go';
import { GrWorkshop } from 'react-icons/gr';
import { PiMonitorThin } from 'react-icons/pi';
import { MdPayments } from 'react-icons/md';
import { AiOutlineUser } from 'react-icons/ai';
import { BsClipboard2Check } from 'react-icons/bs';
import { CiMonitor } from 'react-icons/ci';















const Bullet = <div id="bullet" style={{ minWidth:0,width:"7px" , height:'7px', borderRadius:'100%', backgroundColor:"rgba(0, 0, 0, 0.5)"}}></div>
export const menus = [
    // {
    //     key : "Home",
    //     label : "Home",
    //     icon : <GoHome/>,
    //     // children : [{
    //     //             key:"corechild1",
    //     //             label : <Link to="executive">{"Executive Summary"}</Link>,
    //     //             icon :Bullet,
    //     //         },
    //     //         {
    //     //             key:"corechild2",
    //     //             label : <Link to="surveilance">{"Traffic Capacity Surveilance & Monitoring"}</Link>,          
    //     //             icon :Bullet,
    //     //         },
    //     //         {
    //     //             key:"corechild3",
    //     //             label : "Topology & Capacity",    
    //     //             icon :Bullet,
    //     //         },
    //     //         {
    //     //             key:"corechild4",
    //     //             label : "Traffic & Capacity Projection",     
    //     //             icon :Bullet,
    //     //         },
    //     //         {
    //     //             key:"corechild5",
    //     //             label : "Traffic & Capacity Solution",     
    //     //             icon :Bullet,
    //     //         },
    //     //         {
    //     //             key:"corechild6",
    //     //             label : "BOQ Generation",     
    //     //             icon :Bullet,
    //     //         },
    //     //         {
    //     //             key:"corechild7",
    //     //             label : "Automation Network ID Management",     
    //     //             icon :Bullet,
    //     //         },
    //     //     ]
    // },
    {
        key : "Attendance",
         label :<Link to="attendance">{"Attendance"}</Link>,
        icon :  <BsClipboard2Check/>,
        // children : [
        //     {
        //         key:"att",
        //         label :  <Link to="payment">{"Payment"}</Link>,
        //         icon :Bullet,
        //     },
        // ]
    },
    {
        key : "Workshop",
        label :<Link to="workshop">{"Workshop"}</Link>,
        icon : <CiMonitor/>,
        // children : []
    },
    
    {
        key : "Payment",
        label :"Payment",
        icon : <MdPayments/>,
        children : [
            {
                key:"payment",
                label :  <Link to="payment">{"Payment"}</Link>,
                icon :Bullet,
            },
            {
                key:"approval",
                label :  <Link to="approve">{"Approve"}</Link>,
                icon :Bullet,
            },
            ]
    },
    
    {
        key : "usermanagement",
        label :"User management",
        icon : <AiOutlineUser/>,
        children : [{
                            key:"role",
                            label : <Link to="role">{"Role"}</Link>,
                            icon :Bullet,
                    },
                    {
                        key:"user",
                        label : <Link to="user">{"User"}</Link>,
                        icon :Bullet,
                },
                ]
    },
  
]
