import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 0,
  content: "",
  price: 0,
  status: null,
  createDate: null,
  dueDate: null,
};

const missionSlice = createSlice({
  name: "mission",
  initialState: initialState,
  reducers: {
    setContent(state, action) {
      state.content = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setPrice(state, action) {
      state.price = action.payload;
    },
    setDueDate(state, action) {
      state.dueDate = action.payload;
    },
    setCreateDate(state, action) {
      state.createDate = action.payload;
    },
    setInitialState(state) {
      return { ...initialState };
    },
  },
});

export const { setContent, setPrice, setDueDate, setParentId, setInitialState } = missionSlice.actions;

export default missionSlice.reducer;
