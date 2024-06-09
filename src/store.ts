import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './Slice/authSlice';
import { userSlice } from './Slice/userSlice';
import { productCategorySlice } from './Slice/productCategorySlice';
import { productListDataSlice } from './Slice/productListDataSlice';



export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        user: userSlice.reducer,
        productCategory: productCategorySlice.reducer,
        productListData: productListDataSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
