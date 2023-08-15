import React from 'react';
import { Navigate } from 'react-router-dom';
import {useAuthUser} from 'react-auth-kit'


const ProtectedRoute = ({children , allowedRoles}) => {
 const auth = useAuthUser()
 return ( allowedRoles.includes(auth().role_id) ? children : <Navigate to="/unauthorized" replace />)
//   return (
//     <Route
//       {...rest}
//       element={
//         allowedRoles.includes(auth().id_role ) ? (
//           <Component />
//         ) : (
//           <Navigate to="/unauthorized" replace />
//         )
//       }
//     />
//   );
};

export default ProtectedRoute;