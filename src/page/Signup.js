import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import ErrorText from '../component/ErrorText'
import { useNavigate } from "react-router-dom";
// optional chaining practice from video 


export default function Signup() {
    const [data, setData] = useState({
        name: "", 
        email: "", 
        password: "",
        role: "buyer",
        is_checked: true
    })
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        role: ""
    })
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        let isError;
        Object.entries(data).forEach(([key, value]) => {

            if (!value) {
                setErrors((prev_errors)=>({
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
        const {name, email, password, role } = data
        // console.log("env, process.env.REACT_APP_SERVER_URL")
       
        axios.post(`${process.env.REACT_APP_SERVER_URL}/users/signup`, { 
            name, 
            email,
            password,
            role
            //you can use can as it is in the form of object 
            // you can also use object destructuring, practice some time, 
            // it helps to hit the api of selected data only 

        })
            .then(function (response) {
                // handle 
                //console.log(response);
                navigate("/login")
            })
            .catch(function (error) {
                // handle error
               // console.log(error.response.data.errors);
                setErrors({});
                error.response.data.errors.forEach(el => {
                    
                   
                    setErrors((prev_errors) => {
                        
                       return {
                        ...prev_errors,
                        [el.param]:[el.msg]
                       }
                })
                });
            })

    }
    function handleChange (e) {
        console.log(e)
        const{name, value} = e.target;
        setData({
            ...data, 
            [name]: value  

            })
        setErrors ({
            ...errors, 
            [name]: "",
        })

    }

    return (
        <form mt-5="true" onSubmit={handleSubmit}>
            <div className="mb-3 mt-5">
                <label htmlFor="name" class="form-label required">Name</label>
                <input type="text" class="form-control" name="name" id="name"  
                
                onChange={handleChange}
                value = {data.name} aria-describedby="emailHelp" />
                <ErrorText 
                errors = {errors}
                field = "name"
                data = {data}
                />
                {/*<ErrorText 
                msg = "required field"
                field = "name"
                data = {data}

                />*/}
               

                
            </div>
            <div class="mb-3 ">
                <label htmlFor="Email" class="form-label required">Email address</label>
                <input type="email" class="form-control" name="email" id="Email" 
                onChange={handleChange}
                value= {data.email} aria-describedby="emailHelp" />
                
                <ErrorText 
                errors = {errors}
                field = "email"
                data = {data}
                />
                
            </div>
            <div class="mb-3 ">
                <label htmlFor="Password" class="form-label required">Password</label>
                <input type="current-password" class="form-control" name = "password" id="current-password"
                onChange={handleChange} 
                value = {data.password}/>
                <ErrorText 
                errors = {errors}
                field = "password"
                data = {data}
                />
            </div>
            <div class="mb-3 ">

                <label class="form-check-label required" htmlFor="exampleCheck1">Check me out</label>
                <select class="form-select" aria-label="Default select example" name = "role"
                onChange={handleChange}
                value = {data.role}>
                    
                    <option value="buyer">Buyer</option>
                    <option value="seller">Seller</option>

                </select>
            </div>
            <div> 
            <label htmlFor = "is_checked" class = "check-label-required"> Accepts Conditions </label>
            <input type = "checkbox" onChange = {handleChange} class = "" name = "is_checked" 
            id = "is_checked" checked = {data.is_checked} />
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form >
    )
}
