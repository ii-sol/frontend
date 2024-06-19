import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  functionCode: 0,
};

const notiSlice = createSlice({
  name: "notification",
  initialState: initialState,
  reducers: {
    setFunctionCode(state, action) {
      state.functionCode = action.payload;
    },
  },
});

export const { setFunctionCode } = notiSlice.actions;

export default notiSlice.reducer;
