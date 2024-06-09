import { createSlice } from "@reduxjs/toolkit";

interface UserState {
    fullName: string;
    email: string;
    password: string;
}

const loadState = (): UserState => {
    const storedData = localStorage.getItem("user");
    return storedData ? JSON.parse(storedData) : initialState;
};

const initialState: UserState = {
    fullName: "",
    email: "",
    password: "",
};

export const userSlice = createSlice({
    name: "user",
    initialState: loadState(),
    reducers: {
        updateUser: (state, action) => {
            state.fullName = action.payload.fullName;
            state.email = action.payload.email;
            state.password = action.payload.password;
            localStorage.setItem("user", JSON.stringify(state));
        },
    },
});

export const { updateUser } = userSlice.actions;

export const selectUser = (state: { user: UserState }) => state.user;

export default userSlice.reducer;
