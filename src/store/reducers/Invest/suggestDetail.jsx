import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProposalDetail as reqFetchProposalDetail } from "../../../services/invest";

const initialState = {
  loading: true,
  companyInfo: null,
  requestProposal: null,
  responseProposal: null,
};

export const fetchProposalDetail = createAsyncThunk(
  "suggestDetail/fetchProposalDetail",
  async ({ proposeId, pathVariable }, thunkAPI) => {
    const response = await reqFetchProposalDetail(proposeId, pathVariable);
    console.log(response);
    return response;
  }
);

const suggestDetailSlice = createSlice({
  name: "suggestDetail",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProposalDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.companyInfo = action.payload.response.companyInfo;
        state.requestProposal = action.payload.response.requestProposal;
        state.responseProposal = action.payload.response.responseProposal;
      })
      .addCase(fetchProposalDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProposalDetail.rejected, (state) => {
        state.loading = true;
      });
  },
});

export const {} = suggestDetailSlice.actions;

export default suggestDetailSlice.reducer;
