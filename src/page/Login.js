import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import ErrorText from '../component/ErrorText'
import Alert from '../component/Alert'
import { useNavigate } from 'react-router-dom'
import { useselecter, useDispatch } from "react-redux"
import {login, logout, setUser} from '../redux/reducer/auth'



export default function Login() {
  const dispatch = useDispatch(); 
  const [data, setData] = useState({

    email: "",
    password: ""

  })
  const [errors, setErrors] = useState({

    email: "",
    password: ""

  })
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    let isError;
    Object.entries(data).forEach(([key, value]) => {

      if (!value) {
        setErrors((prev_errors) => ({
          ...prev_errors,
          [key]: key + " field is required!!!"
        }))
        isError = true;
      }
    })
    console.log(errors)
    if (isError) return;
    // console.log(event.target.name.value);
    // console.log(event.target.email.value);
    // async function handleSubmit(event) {
    //     event.preventDefault();
    //     console.log(event.target.name.value);
    //     console.log(event.target.email.value);
    //     // try {
    //     const response = await axios.post('https://mern-ecommerce70.herokuapp.com/api/users/signup', { 
    //         name: event.target.name.value,
    //         email: event.target.email.value,
    //         role: "buyer", 
    //         "password": "password"
    //     })
    //     console.log(response)
    // } catch(error){
    //     console.log(error)
    // }
    const { email, password } = data
    // console.log("env, process.env.REACT_APP_SERVER_URL")

    axios.post(`${process.env.REACT_APP_SERVER_URL}/users/login`, {

      email,
      password,

      //you can use can as it is in the form of object 
      // you can also use object destructuring, practice some time, 
      // it helps to hit the api of selected data only 

    })
      .then(function (response) {
        // handle 
        setErrors({
          status: "success",
          msg: "success"
          
        })
        localStorage.setItem("access_token", response.data.access_token)
        dispatch(login())
        navigate("/")

      })
      .catch(function (error) {
        
        // handle error
        // console.log(error.response.data.errors);
        setErrors({});
        

          setErrors({
            status: "danger",
            msg: error?.response?.data?.msg
          })
          
        });
      
  }
  function handleChange(e) {
    
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value

    })
    setErrors({
      ...errors,
      [name]: "",
    })

  }

  return (
    <form className="mt-5" onSubmit={handleSubmit}>
    {
      errors.msg && errors.status &&
      <Alert 
      errors = {errors}
      />
      
    }  
      <div class="">
        <label htmlFor="Email" class="form-label required">Email address</label>
        <input type="email" class="form-control" name="email" id="Email"
          onChange={handleChange}
          value={data.email} aria-describedby="emailHelp" />

        <ErrorText
          errors={errors}
          field="email"
          data={data}
        />

      </div>
      <div class="mb-3 ">
        <label htmlFor="Password" class="form-label required">Password</label>
        <input type="current-password" class="form-control" name="password" id="current-password"
          onChange={handleChange}
          value={data.password} />
        <ErrorText
          errors={errors}
          field="password"
          data={data}
        />
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form >
  )
}
