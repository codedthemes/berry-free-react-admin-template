import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import assetService from "../services/assetService";

const initialState = [];

export const retrieveAsset = createAsyncThunk(
    "assets/retrieve",
    async () => {
        const res = await assetService.getAll();
        return res.data;
    }
);
export const updateAsset = createAsyncThunk(
    "assets/update",
    async ({ id, data }) => {
        const res = await assetService.update(id, data);
        return res.data;
    }
);

export const findDetailAsset = createAsyncThunk(
    "assets/findDetail",
    async ({ id }) => {
        const res = await assetService.get(id);
        return res.data;
    }
);
const assetSlice = createSlice({
    name: "asset",
    initialState,
    extraReducers: {
        [retrieveAsset.fulfilled]: (state, action) => {
            return [...action.payload];
        },
        [updateAsset.fulfilled]: (state, action) => {
            const index = state.findIndex(asset => asset.id === action.payload.id);
            state[index] = {
                ...state[index],
                ...action.payload,
              };
        },
        [findDetailAsset.fulfilled]: (state, action) => {
            return [...action.payload];
        },
    },
});
const { reducer } = assetSlice;
export default reducer;