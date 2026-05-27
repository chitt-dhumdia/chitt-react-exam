import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const addProduct = createAsyncThunk("products/addProduct",async (addProduct, { rejectWithValue }) => {

    try {

      let res = await fetch(
        "http://localhost:3000/products",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(addProduct)
        }
      )

      let data = await res.json()

      return data

    } catch (error) {

      return rejectWithValue(error)

    }

  }
)

export const updateProduct = createAsyncThunk("products/updateProduct",async (updateData, { rejectWithValue }) => {

    try {

      let res = await fetch(

        `http://localhost:3000/products/${updateData.id}`,

        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(updateData)
        }
      )

      let data = await res.json()

      return data

    } catch (error) {

      return rejectWithValue(error)

    }

  }

)

export const deleteProduct = createAsyncThunk(

  "products/deleteProduct",

  async (id, { rejectWithValue }) => {

    try {

      await fetch(

        `http://localhost:3000/products/${id}`,

        {
          method: "DELETE"
        }
      )

      return id

    } catch (error) {

      return rejectWithValue(error)

    }

  }
)

const productSlice = createSlice({

  name: "product",

  initialState: {
    products: [],
    loading: false,
    error: null
  },

  reducers: {},

  extraReducers: (builder) => {

    builder

   

      .addCase(addProduct.pending, (state) => {
        state.loading = true
        state.error = null
      })

      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false
        state.products.push(action.payload)
      })

      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })


      .addCase(updateProduct.pending, (state) => {
        state.loading = true
        state.error = null
      })

      .addCase(updateProduct.fulfilled, (state, action) => {

        state.loading = false

        state.products = state.products.map((item) =>

          item.id === action.payload.id
            ? action.payload
            : item
        )

      })

      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(deleteProduct.pending, (state) => {
  state.loading = true
})

.addCase(deleteProduct.fulfilled, (state, action) => {

  state.loading = false

  state.products = state.products.filter(
    (item) => item.id !== action.payload
  )

})

.addCase(deleteProduct.rejected, (state, action) => {

  state.loading = false

  state.error = action.payload

})

  }

})

export default productSlice.reducer