export const SET_ACCOUNT_DETAILS = "SET_ACCOUNT_DETAILS";
export const SET_LOAN_DETAILS = "SET_LOAN_DETAILS";

export const setLoanDetails = (details) => ({
  type: SET_LOAN_DETAILS,
  payload: details,
});

export const setAccountDetails = (details) => ({
  type: SET_ACCOUNT_DETAILS,
  payload: details,
});
