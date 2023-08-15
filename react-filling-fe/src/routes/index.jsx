import React from 'react'
import { Route , Routes , Navigate} from "react-router-dom"
import { RequireAuth , useIsAuthenticated} from 'react-auth-kit'
import ProtectedRoute from "./guarded"

import DashboardLayout from "../layouts/dashboardLayout"
import Attendance from "../pages/attendance"
import WorkshopAdmin from "../pages/workshopAdmin"
import Payment from "../pages/payment"
import Approve from "../pages/payment/approve"
import Role from "../pages/role/index"
import User from "../pages/user/index"

import HomeLayout from "../layouts/homeLayout"
import Home from "../pages/home/index"


import UserLayout from "../layouts/userLayout"
import Workshop from "../pages/workshop"
import YourWorkshop from "../pages/yourworkshop"
import ProfilingForm from "../pages/profile"


import LoginLayout from "../pages/login"
import RegisterPage from "../pages/register"

import AuthStore from "../stores/auth"


function index() {
  const {roles} = AuthStore()
  
 
  return (
    <Routes>
            <Route path="/" element={ <Navigate to="/home" />}>
          
            </Route>
              <Route path="app" element={<RequireAuth loginPath={"/login"}><DashboardLayout></DashboardLayout></RequireAuth>}>
              <Route path="attendance" element={<ProtectedRoute  allowedRoles={[roles.ADMIN]} > <Attendance></Attendance></ProtectedRoute> }></Route> 
              <Route path="workshop" element={<ProtectedRoute  allowedRoles={[roles.ADMIN]} ><WorkshopAdmin></WorkshopAdmin></ProtectedRoute> }></Route>   
              <Route path="payment" element={<ProtectedRoute  allowedRoles={[roles.ADMIN]} ><Payment></Payment></ProtectedRoute>}></Route>    
              <Route path="approve" element={<ProtectedRoute  allowedRoles={[roles.ADMIN]} ><Approve></Approve></ProtectedRoute>}></Route>                                   
              <Route path="role" element={<ProtectedRoute  allowedRoles={[roles.ADMIN]} ><Role></Role></ProtectedRoute>}></Route> 
              <Route path="user" element={<ProtectedRoute  allowedRoles={[roles.ADMIN]} ><User></User></ProtectedRoute>}></Route>           
              <Route path="*" element={<>Not Found</>}></Route> 
            </Route>


      
            <Route path="home" element={<HomeLayout></HomeLayout>}>
                <Route path='' element={<Home/>}></Route>
            </Route>

            <Route path="user" element={<RequireAuth loginPath={"/login"}><UserLayout></UserLayout></RequireAuth>}>
              <Route path="profile" element={<ProtectedRoute  allowedRoles={[roles.USER]} > <ProfilingForm/></ProtectedRoute>}></Route> 

              <Route path="workshop" element={<ProtectedRoute  allowedRoles={[roles.USER]} > <Workshop/></ProtectedRoute>}></Route> 
              <Route path="yours" element={<ProtectedRoute  allowedRoles={[roles.USER]} > <YourWorkshop/></ProtectedRoute>}></Route> 
              <Route path="*" element={<>Not Found</>}></Route> 
                {/* <Route path="surveilance" element={<Surveilance></Surveilance>}></Route>    
                <Route path="executive" element={<Excecutive></Excecutive>}></Route>          */}
            </Route>

            <Route path="/login" exact element={<LoginLayout></LoginLayout>}></Route>
            <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
            <Route path={"unauthorized"} element={<span>Unauthorize</span>} />

    </Routes>
  )
}

export default index