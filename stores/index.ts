import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import actionsSlice from "./Actions/ActionsSlice";
import controllerSlice from "./Controller/ControllerSlice";
import spritsSlice from "./Sprits/SpritsSlice";

const store = configureStore({
  reducer: {
    actions: actionsSlice,
    sprits: spritsSlice,
    controller: controllerSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk),
});

export type StoreType = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
