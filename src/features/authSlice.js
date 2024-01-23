import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    seller: null,
    isSellerLoggedIn: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setSeller: (state, action) => {
            state.isSellerLoggedIn = true
            state.seller = action.payload
        },
        clearSeller:(state)=>{
            state.isSellerLoggedIn = false
            state.seller = null
        }
    },

})

export const { setSeller, clearSeller } = authSlice.actions

export default authSlice.reducer