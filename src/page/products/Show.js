import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { addTocart } from "../../redux/reducer/cart";
import {useDispatch} from "react-redux"




export default function Show() {
  const dispatch = useDispatch();
  let { id } = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/products/${id}`)
      .then((response) => {
        console.log(response.data.data);
        setProduct(response.data.data);
      })
      .catch((error) => {});
  }, []);
  // if(!product._id){
  //     return <><div class="spinner-grow" role="status">
  //     <span class="sr-only">Loading...</span>
  //   </div></>
  // }
  function handleaddToCard() {
      dispatch(addTocart({
        _id:product._id,
        name:product.name,
      }))

  }
  return (
    <div className="row">
      <div className="col-md-6">
        <div
          id="carouselExampleControls"
          class="carousel slide"
          data-ride="carousel"
        >
          <div class="carousel-inner">
            {product?.images?.length > 0 ? (
              product.images.map((image, index) => {
                return (
                  <div
                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                  >
                    <img
                      class="d-block w-100"
                      src={image}
                      alt={`${product.description}`}
                    />
                  </div>
                );
              })
            ) : (
              <div className={`carousel-item ${true ? "active" : ""}`}>
                <img
                  class="d-block w-100"
                  src={""}
                  className="img-thumbnail"
                  alt={`${product.description}`}
                />
              </div>
            )}
          </div>
          <a
            class="carousel-control-prev"
            href="#carouselExampleControls"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselExampleControls"
            role="button"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>
      <div className="col-md-6">
        <h2>{product.name}</h2>
        <p>${product.price}</p>
        <p>{product.in_stock}</p>
        <p>{product.description}</p>
        <p>{product.brand}</p>
        <hr/>
        <button onClick={handleaddToCard} className="btn btn-sd btn-primary" >Add to Cart</button>
      </div>
      
    </div>
  );
}
