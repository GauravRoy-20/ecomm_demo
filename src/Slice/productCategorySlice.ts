import { createSlice } from "@reduxjs/toolkit";

interface ProductCategoryState {
    categories: string[];
}


const loadState = (): ProductCategoryState => {
    const storedproductCategoriesString = localStorage.getItem("productCategories");
    const storedproductCategories = storedproductCategoriesString ? JSON.parse(storedproductCategoriesString) : null;
    return storedproductCategories && storedproductCategories.categories.length > 0 ? storedproductCategories : initialState;
};



const initialState: ProductCategoryState = {
    categories: []
};

export const productCategorySlice = createSlice({
    name: "productCategory",
    initialState: loadState(),
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
            localStorage.setItem("productCategories", JSON.stringify({
                categories: action.payload
            }));
        },
    },
});

export const { setCategories } = productCategorySlice.actions;

export const selectProductCategory = (state: {
    productCategory: ProductCategoryState;
}) => state.productCategory;

export default productCategorySlice.reducer;
