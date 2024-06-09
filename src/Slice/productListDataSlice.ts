import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PRODUCT_RESPONSE } from "../Module/HomeModule/Types/ResponseTypes";

interface ProductListDataState {
    data: PRODUCT_RESPONSE[] | null;
}


const loadState = (): ProductListDataState => {
    const storedproductListDataString = localStorage.getItem("productListData");
    const storedproductList = storedproductListDataString
        ? JSON.parse(storedproductListDataString)
        : null;

    return storedproductList && storedproductList.data.length > 0
        ? storedproductList
        : initialState;
};

const initialState: ProductListDataState = {
    data: null,
};

export const productListDataSlice = createSlice({
    name: "productListData",
    initialState: loadState(),
    reducers: {
        setData: (state, action: PayloadAction<PRODUCT_RESPONSE[] | null>) => {
            state.data = action.payload;
            localStorage.setItem(
                "productListData",
                JSON.stringify({ data: action.payload ?? null }),
            );
        },
    },
});

export const { setData } = productListDataSlice.actions;

export const selectProductListData = (state: {
    productListData: ProductListDataState;
}) => state.productListData;

export default productListDataSlice.reducer;
