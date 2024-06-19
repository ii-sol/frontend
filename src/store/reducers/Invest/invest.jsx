import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchStocks as reqFetchStocks } from "../../../services/stock";

const initialState = {
  trade: 0, //0: 구매, 1: 판매
  price: 80000,
  myAmount: 0,
  name: "삼성전자",
  code: "005930",
  quantity: 0,
  changePrice: 0,
  changeRate: 0,
  changeSign: 3,
  isNew: false,
  parent: 10,
  message: "",
  charts: [],
  indi: {
    marketCapitalization: "1670765",
    dividendYield: "2.40",
    pbr: "3.00",
    per: "-18.34",
    psr: "-1506396184",
    roe: "14.08",
  },
};

export const fetchStocks = createAsyncThunk(
  "invest/fetchStocks",
  async ({ code, pathVariable }, thunkAPI) => {
    const response = await reqFetchStocks(code, pathVariable);
    console.log(response);
    return response;
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchStocks.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.charts = action.payload.data.charts;
        state.name = action.payload.data.companyName;
        state.price = action.payload.data.currentPrice;
        state.changePrice = action.payload.data.changePrice;
        state.changeRate = action.payload.data.changeRate;
        state.changeSign = action.payload.data.changeSign;
        state.indi.marketCapitalization =
          action.payload.data.marketCapitalization;
        state.indi.dividendYield = action.payload.data.dividendYield;
        state.indi.pbr = action.payload.data.pbr;
        state.indi.per = action.payload.data.per;
        state.indi.roe = action.payload.data.roe;
        state.indi.psr = action.payload.data.psr;
      })
      .addCase(fetchStocks.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchStocks.rejected, (state) => {
        state.loading = "rejected";
      });
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
