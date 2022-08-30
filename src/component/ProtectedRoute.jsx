import React from 'react'
import { useSelector } from 'react-redux'
import {  Outlet, useNavigate } from 'react-router-dom'

export default function ProtectedRoute() {
    const is_logged = useSelector((state)=>state.auth.is_logged_in)
    // let user = useSelector((state)=>state.auth.user)
     console.log(is_logged);
    // console.log(user)
    let Navigate = useNavigate();
  return (
    is_logged? <Outlet /> : <Navigate to = '/' />
    
  )
  
}
