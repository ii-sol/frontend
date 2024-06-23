import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  content: "",
  childSn: 0,
  parentSn: 0,
  price: 0,
  dueDate: "",
};

const missionSlice = createSlice({
  name: "mission",
  initialState: initialState,
  reducers: {
    setContent(state, action) {
      state.content = action.payload;
    },
    setPrice(state, action) {
      state.price = action.payload;
    },
    setDueDate(state, action) {
      state.dueDate = action.payload;
    },
    setParentSn(state, action) {
      state.parentSn = action.payload;
    },
    setChildSn(state, action) {
      state.childSn = action.payload;
    },
    setInitialState(state) {
      return { ...initialState };
    },
  },
});

export const { setContent, setPrice, setDueDate, setChildSn, setParentSn, setInitialState } = missionSlice.actions;

export default missionSlice.reducer;
