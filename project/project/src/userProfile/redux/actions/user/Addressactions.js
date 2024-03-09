import { createAsyncThunk } from '@reduxjs/toolkit';
import { commonReduxRequest } from "../../../../common/api";
import { appJson } from  '../../../../common/configuration';

export const createAddress = createAsyncThunk (
    'address/createAddress',
    async(fromData,{rejectwithValue})=>{
        return commonReduxRequest(
            'post',
            `/user/address`,
            fromData,
            appJson,
            rejectwithValue
        )
    }
 );

export const getAddress = createAsyncThunk( // Changed from getAddresses to getAddress
    'address/getAddress', // Changed from getAddresses to getAddress
    async(_, { rejectWithValue }) => {
        return commonReduxRequest(
            'get',
            `/user/address`,
            null,
            appJson,
            rejectWithValue
        )
    }
);

export const deleteAddress = createAsyncThunk(
    'address/deleteAddress',
    async (id, { rejectWithValue }) =>{
       return commonReduxRequest(
         'delete',
         `/user/address/${id}`,
         {},
         appJson,
         rejectWithValue
       )
    }
);

export const updateAddress = createAsyncThunk(
    'address/updateAddress',
    async ({ id, fromData }, { rejectWithValue }) =>{
        return commonReduxRequest(
            'patch',
            `/user/address/${id}`,
            fromData,
            appJson,
            rejectWithValue
        )
    }
);
