import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import img1 from "../assets/ban-1.jpg"
import img2 from "../assets/ban-2.jpg"
import img3 from "../assets/ban3.jpg"

const Home = () => {
      const [products, setProducts] = useState([])

  const getProducts = async () => {

    try {

      let res = await fetch("http://localhost:3000/products")

      let data = await  res.json()

      setProducts(data)

    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    getProducts()
  }, [])
  return (
    <>

        <div id="carouselExample" className="carousel slide">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src={img1} className="d-block w-100" style={{ height: '600px', objectFit: 'cover'}} alt="..." />
    </div>
    <div className="carousel-item">
      <img src={img2} className="d-block w-100" style={{ height: '600px', objectFit: 'cover'}} alt="..." />
    </div>
    <div className="carousel-item">
      <img src={img3} className="d-block w-100" style={{ height: '600px', objectFit: 'cover'}} alt="..." />
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true" />
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true" />
    <span className="visually-hidden">Next</span>
  </button>
</div>

<div className="container mt-5">
    <div className="row">
        <div className="col-lg-12 mb-4">
            <h2 className="text-center">Latest Products</h2>
        </div>
    </div>
</div>
<div className="container">
    <div className="row">
        <div className="col-lg-12 mb-4 d-flex justify-content-end">
            <Link className="" to="/product-item" style={{ textDecoration: 'underline',color: 'black' }}>
                All Products
            </Link>
        </div>
    </div>
</div>

    <div className="container mt-5">

      <div className="row">

        {
          products.slice(0, 3).map((item) => (

            <div className="col-lg-4 mb-4" key={item.id}>

              <div className="card p-3 shadow h-100">

                <img
                  src={item.image}
                  alt={item.title}
                  className="card-img-top"
                  style={{
                    height: "250px",
                    objectFit: "cover"
                  }}
                />

                <div className="card-body">

                  <h3>{item.title}</h3>

                  <h5>₹ {item.price}</h5>

                  <p>{item.category}</p>

                </div>

              </div>

            </div>

          ))
        }

      </div>

    </div>

      
    </>
  )
}

export default Home
