import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import {
  deleteProduct
} from '../features/product/productslice'

const Product_Item = () => {

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const [products, setProducts] = useState([])

  const [search, setSearch] = useState("")

  const [sort, setSort] = useState("")

  const [category, setCategory] = useState("")

  const getProducts = async () => {

    try {

      let res = await fetch(
        "http://localhost:3000/products"
      )

      let data = await res.json()

      setProducts(data)

    } catch (error) {

      console.log(error)

    }

  }

  useEffect(() => {

    getProducts()

  }, [])

  const handleEdit = (item) => {

    navigate("/add-product",
      {
        state: item
      }
    )

  }

  const handleDelete = (id) => {

    dispatch(deleteProduct(id))

    setProducts(
      products.filter((item) => item.id !== id)
    )

    alert("Product Deleted Successfully")

  }

  let filteredProducts = [...products]

  filteredProducts = filteredProducts.filter((item) =>

    item.title.toLowerCase().includes(
      search.toLowerCase()
    )

  )

  if (category !== "") {

    filteredProducts = filteredProducts.filter(
      (item) => item.category === category
    )

  }

  if (sort === "lowToHigh") {

    filteredProducts.sort(
      (a, b) => a.price - b.price
    )

  }

  if (sort === "highToLow") {

    filteredProducts.sort(
      (a, b) => b.price - a.price
    )

  }

  return (
    <>

      <div className="container mt-5">

        <div className="row mb-4">

          <div className="col-lg-4">

            <input
              type="text"
              className="form-control"
              placeholder="Search Product"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          <div className="col-lg-4">

            <select
              className="form-select"
              value={sort}
              onChange={(e) =>
                setSort(e.target.value)
              }
            >

              <option value="">
                Sort By Price
              </option>

              <option value="lowToHigh">
                Low To High
              </option>

              <option value="highToLow">
                High To Low
              </option>

            </select>

          </div>

          <div className="col-lg-4">

            <select
              className="form-select"
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
            >

              <option value="">
                Filter By Category
              </option>

              <option value="Clothes">
                Clothes
              </option>

              <option value="Electronics">
                Electronics
              </option>

              <option value="Snacks">
                Snacks
              </option>

            </select>

          </div>

        </div>

        <div className="row">

          {
            filteredProducts.map((item) => (

              <div
                className="col-lg-4 mb-4"
                key={item.id}
              >

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

                    <button
                      className="btn btn-primary w-100 mt-3"
                      onClick={() => handleEdit(item)}
                    >
                      Edit Product
                    </button>

                    <button
                      className="btn btn-danger w-100 mt-2"
                      onClick={() =>
                        handleDelete(item.id)
                      }
                    >
                      Delete Product
                    </button>

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

export default Product_Item