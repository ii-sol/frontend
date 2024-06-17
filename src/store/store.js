import { createStore } from "redux";
import loanReducer from "./reducers/Loan/loan";

const store = createStore(loanReducer);

export default store;
