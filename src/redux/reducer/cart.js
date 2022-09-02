import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
   items: []
  },
  reducers: {
    
    addTocart: (state, action) => {

      // filter out selected product
      // copy rest of the product 
    
      const {payload} = action
      let quantity = state.items.find((el)=>el._id === payload._id)?.quantity || 0;
      state.items = [
        ...state.items.filter((el)=> el._id!==payload._id),
        {
          _id:payload._id,
          name:payload.name,
          quantity : quantity + 1
        } 

        
      ]
    },
    
    // setUser: (state, action) => {
    //   state.user.push(action.payload)
    // },
  },
})

// Action creators are generated for each case reducer function
export const { addTocart } = cartSlice.actions

export default cartSlice.reducer