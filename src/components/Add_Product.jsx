import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import {addProduct,updateProduct} from '../features/product/productslice'
import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom'
const Add_Product = () => {

  const dispatch = useDispatch()

  const location = useLocation()

  const editItem = location.state

  const [addProducts, setaddProducts] = useState({})

  useEffect(() => {

    if (editItem) {

      setaddProducts(editItem)

    }

  }, [editItem])

  const handleChange = (e) => {

    const { name, value } = e.target

    setaddProducts({...addProducts,[name]: value})

  }

  const handleSubmit = (e) => {

    e.preventDefault()

    if (editItem) {

      dispatch(updateProduct(addProducts))

      toast.info("Product Updated Successfully")
      navigate("/product-item")

    } else {

      dispatch(addProduct(addProducts))

      toast.success("Product Added Successfully")

    }

    setaddProducts({
      title: "",
      price: "",
      image: "",
      category: ""
    })

  }

  return (
    <div className="container mt-5">

      <form
        className="w-50 mx-auto border p-4 shadow"
        onSubmit={handleSubmit}
      >

        <h2 className="text-center mb-4">

          {
            editItem
              ? "Update Product"
              : "Add Product"
          }

        </h2>

        <div className="mb-3">

          <label className="form-label">
            Product Title
          </label>

          <input
            type="text"
            className="form-control"
            placeholder="Enter product title"
            required
            name="title"
            value={addProducts.title || ""}
            onChange={handleChange}
          />

        </div>

        <div className="mb-3">

          <label className="form-label">
            Product Price
          </label>

          <input
            type="number"
            className="form-control"
            placeholder="Enter product price"
            required
            name="price"
            value={addProducts.price || ""}
            onChange={handleChange}
          />

        </div>

        <div className="mb-3">

          <label className="form-label">
            Product Image URL
          </label>

          <input
            type="text"
            className="form-control"
            placeholder="Enter image URL"
            required
            name="image"
            value={addProducts.image || ""}
            onChange={handleChange}
          />

        </div>

        <div className="mb-3">

          <label className="form-label">
            Product Category
          </label>

          <select
            className="form-select"
            required
            name="category"
            value={addProducts.category || ""}
            onChange={handleChange}
          >

            <option value="">
              Select Category
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

        <button className="btn btn-success w-100">

          {
            editItem
              ? "Update Product"
              : "Add Product"
          }

        </button>

      </form>

    </div>
  )
}

export default Add_Product