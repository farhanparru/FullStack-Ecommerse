import { createSlice } from "@reduxjs/toolkit";
import toast from 'react-hot-toast'
import {
    getAddress,
    createAddress,
    deleteAddress,
    updateAddress
} from '../../actions/user/Addressactions'; // Check if the path is correct


const addressSlice = createSlice({
    name:"addresses",
    initialState:{
        loading: false,
        addresses: [],
        error: null,


    },

    extraReducers:(builder)=>{
        builder
        .addCase(getAddress.pending,(state)=>{
            state.loading = true;
        })
        .addCase(getAddress.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.addresses = payload; // Assuming payload contains address data
            state.error = null;
        })
        
        //address creation

        .addCase(createAddress.pending,(state)=>{
            state.loading = true;
         })

        .addCase(createAddress.fulfilled,(state,{payload})=>{
         state.loading = false;
         state.error = null;
         state.addresses = [...state.addresses,payload.address]
         toast.success('Address added')
         })

         .addCase(createAddress.rejected,(state,{payload})=>{
             state.loading = false;
             state.addresses = null;
             state.error = payload;
         })

         .addCase(deleteAddress.pending,(state)=>{
            state.loading = true;
         })

         .addCase(deleteAddress.fulfilled,(state,{payload})=>{
            state.loading = false;
            state.error = null;
            state.addresses = state.addresses.filter(
                (item) => item._id !== payload.address._id
            )
            toast.success('Address Deleted')
            
           })
           .addCase(deleteAddress.rejected,(state,{payload})=>{
             state.loading = false;
             state.addresses = null;
             state.error = payload;
           })

           .addCase(updateAddress.pending,(state,)=>{
              state.loading = true;

           })

           .addCase(updateAddress.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.error = null;
            const index = state.addresses.findIndex(
                (item) => item._id === payload.address._id
            );
        
            if (index !== -1) {
                state.addresses[index] = payload.address;
            }
        })
        

           .addCase(updateAddress.rejected,(state,{payload})=>{
              state.loading = false;
              state.addresses = null;
              state.error = payload;
           })      
      }
   })
   export default addressSlice.reducer;
