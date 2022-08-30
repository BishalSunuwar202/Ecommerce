import axios from 'axios'
import React, { useState, useEffect } from 'react'


export default function Home() {
    const [products, setProducts] = useState([]);
    const [search_term, setSearchTerm] = useState("product-1")
    useEffect(() => {

        axios.get(`${process.env.REACT_APP_SERVER_URL}/products?search_term=${search_term}`)
            .then(response => {
                console.log(response.data.data[0].data)
                setProducts(response.data.data[0].data)

            })
            .catch(
                error => {
                    console.log(error)

                }
            )
    },[search_term])
    return (
        <div>
            <h1>Products</h1>
            <hr />
            <input
                value={search_term}
                onChange={(e) => { setSearchTerm(e.target.value) }} />
            <div className='row'>
                {
                    products.map((el) => {
                        return <div class="col-3 p-4" >
                            <div class="card">
                                <img src={`${el.images[0]}`} class="card-img-top" alt="..." />
                                <div class="card-body">
                                    <h4 class="card-price">${el.price}</h4>
                                    <h5 class="card-title">{el.name}</h5>
                                    <p class="card-text">{el.description}</p>

                                </div>
                            </div>
                        </div>
                    })

                }
            </div>

        </div>

    )
}
