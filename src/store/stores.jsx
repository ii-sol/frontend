import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from "redux-persist";
import logger from "redux-logger";
import loanReducer from "./reducers/Loan/loan";
import historyReducer from "./reducers/common/history";
import investReducer from "./reducers/Invest/invest";
import portfolioReducer from "./reducers/Invest/portfolio";
import missionReducer from "./reducers/Mission/mission";
import notiReducer from "./reducers/Noti/notification";
import userReducer from "./reducers/Auth/user";
import profileReducer from "./reducers/common/profile";
import allowanceReducer from "./reducers/Allowance/allowance";

const rootPersistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["invest", "user", "profile", "portfolio"],
};

const rootReducer = combineReducers({
  history: historyReducer,
  invest: investReducer,
  portfolio: portfolioReducer,
  mission: missionReducer,
  loan: loanReducer,
  noti: notiReducer,
  user: userReducer,
  profile: profileReducer,
  allowance: allowanceReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const myMiddlewares = [logger];

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(myMiddlewares),
});

const persistor = persistStore(store);

export { store, persistor };
