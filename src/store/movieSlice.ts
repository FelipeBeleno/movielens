import { createSlice } from "@reduxjs/toolkit";

interface MovieState {
    initializedPage: number;
}

const initialState: MovieState = {
    initializedPage: 1,
};

const movieSlice = createSlice({
    name: "movieStore",
    initialState,
    reducers: {
        uploadPage: (state, action) => {
            state.initializedPage = action.payload;
        },
    },
});

export const { uploadPage } = movieSlice.actions;
export default movieSlice.reducer;
