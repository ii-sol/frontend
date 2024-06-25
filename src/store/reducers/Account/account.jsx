import { SET_ACCOUNT_DETAILS } from "../../action";

const initialState = {
  receiverAccountNum: null,
  amount: null,
  status: null,
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACCOUNT_DETAILS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default accountReducer;
