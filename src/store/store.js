import { createStore } from "redux";
import loanReducer from "./reducer";

const store = createStore(loanReducer);

export default store;
