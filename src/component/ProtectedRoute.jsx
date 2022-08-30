import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

export default function ProtectedRoute(props) {
  const is_logged = useSelector((state) => state.auth.is_logged_in)
  let user = useSelector((state) => state.auth.user)
  console.log(is_logged);
  console.log(props.role)
  
  // let user1 = user.map((el)=> {
    
    
  //   return(el.role)
  // })
  
  console.log(user[0].role)
  
  if(props.role && (user[0].role !== props.role)){
     return <><h1> forbidden </h1></>
  } 

    return is_logged ? <Outlet /> : <Navigate to='/' /> 
  
  


  
  
  
}
