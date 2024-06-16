import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trade: 0, //0: 구매, 1: 판매
  price: 80000,
  myAmount: 0,
  name: "삼성전자",
  code: "005930",
  quantity: 0,
  changePrice: 0,
  changeRate: 0,
  isNew: false,
  parent: 10,
  message: "",
};

const investSlice = createSlice({
  name: "invest",
  initialState: initialState,
  reducers: {
    setTrade(state, action) {
      state.trade = action.payload;
    },
    setName(state, action) {
      state.name = action.payload;
    },
    setPrice(state, action) {
      state.price = action.payload;
    },
    setMyAmount(state, action) {
      state.myAmount = action.payload;
    },
    setCode(state, action) {
      state.code = action.payload;
    },
    setQuantity(state, action) {
      state.quantity = action.payload;
    },
    setIsNew(state, action) {
      state.isNew = action.payload;
    },
    setParent(state, action) {
      state.parent = action.payload;
    },
    setMessage(state, action) {
      state.message = action.payload;
    },
  },
});

export const {
  setTrade,
  setName,
  setPrice,
  setMyAmount,
  setCode,
  setQuantity,
  setIsNew,
  setParent,
  setMessage,
} = investSlice.actions;

export default investSlice.reducer;
