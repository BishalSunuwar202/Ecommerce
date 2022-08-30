import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import ErrorText from '../../component/ErrorText'

// optional chaining practice from video 

const access_token = localStorage.getItem("access_token")
export default function Create() {
    const [data, setData] = useState({
        name: "",
        price: "",
        categories: [],
        images: []
    })
    const [errors, setErrors] = useState({

    })


    function handleSubmit(event) {
        event.preventDefault();


        let { name, price, categories, images } = data

        let form_data = new FormData();
        form_data.append("name", name)
        form_data.append("price", price)
        let c_arr = categories.split(",")
        c_arr.forEach((el)=> {

            form_data.append("categories[]", el)
        })
        // multer package- look once 

        let arr_images = [...images]
        arr_images.forEach((el)=> {

            form_data.append("images", el)
        })
            
        

        axios.post(`${process.env.REACT_APP_SERVER_URL}/products`,
            form_data, {
            headers: { Authorization: `Bearer ${access_token}` }




        })
            .then(function (response) {
                // handle 
                //console.log(response);
                // navigate("/login")
            })
            .catch(function (error) {
                // handle error
                console.log(error.response);
                setErrors({});


                setErrors({
                    msg: error?.response?.data?.msg

                })
            })


    }
    function handleChange(e) {
        console.log(e)
        const { name, value } = e.target
        console.log(e.target.files);
        if(e.target.type === "file") {
            setData({
                ...data,
                [name]: e.target.files

            })
         } else {
            
            setData({
                ...data,
                [name]: value
                
            })
        }
        setErrors({
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
                    value={data.name} aria-describedby="emailHelp" />
                <ErrorText
                    errors={errors}
                    field="name"
                    data={data}
                />
                {/*<ErrorText 
                msg = "required field"
                field = "name"
                data = {data}

                />*/}



            </div>
            <div class="mb-3 ">
                <label htmlFor="price" class="form-label required">Price</label>
                <input type="text" class="form-control" name="price" id="Price"
                    onChange={handleChange}
                    value={data.price} aria-describedby="emailHelp" />

                <ErrorText
                    errors={errors}
                    field="price"
                    data={data}
                />

            </div>
            <div class="mb-3 ">
                <label htmlFor="Categories" class="form-label required">Categories</label>
                <input type="text" class="form-control" name="categories" id="categories"
                    onChange={handleChange}
                    value={data.categories} />
                <ErrorText
                    errors={errors}
                    field="categories"
                    data={data}
                />
            </div>
            <div class="mb-3 ">
            <label htmlFor="images" class="form-label required">Images</label>
            <input type="file" multiple class="form-control" name='images' id="images"
                onChange={handleChange}
                 />
            
            
        </div>
            
            <button type="submit" class="btn btn-primary">Submit</button>
        </form >
    )
}
