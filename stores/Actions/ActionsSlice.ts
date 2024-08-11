import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { iActionStore } from "./Typees";

const initialState: iActionStore = {
  actions: {
    "Action 1": [],
  },
  selectedAction: "Action 1",
};

export const actionsSlice = createSlice({
  name: "actions",
  initialState,
  reducers: {
    updatedAction: (
      state,
      action: PayloadAction<{
        actionName: string;
        actionList: string[];
      }>
    ) => {
      const { actionName, actionList } = action.payload;
      state.actions[actionName] = actionList;
    },
  },
});

export const { updatedAction } = actionsSlice.actions;

export const selectActions = (state: RootState): iActionStore => state.actions;

export default actionsSlice.reducer;
