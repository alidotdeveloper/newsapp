import React from 'react'
import { useContext } from "react";
import { AuthContext, AuthProvider } from '../Context/Context';
import { Navigate } from 'react-router-dom';

const Protected = ({element,roles }) =>{
  const { Auth, role, setrole } = useContext(AuthContext);
    console.log("Auth value", Auth)
    if (!Auth) {
        return <Navigate to="/login" />;
  }

    if (!roles.includes(role)) {
      return <Navigate to="/404" />;
    }
  
 
    return element;
  
}

export default Protected