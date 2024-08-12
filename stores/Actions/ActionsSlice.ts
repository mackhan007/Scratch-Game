import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { iActionStore } from "./Typees";

const initialState: iActionStore = {
  actions: {
    "Action 1": [],
  },
  selectedAction: "Action 1",
  actionIndex: 2,
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
    addNewAction: (state) => {
      const name = `Action ${state.actionIndex}`;
      state.actions[name] = [];
      state.actionIndex += 1;
      state.selectedAction = name;
    },
    setSelectedAction: (state, action: PayloadAction<string>) => {
      state.selectedAction = action.payload;
    },
  },
});

export const { updatedAction, addNewAction, setSelectedAction } =
  actionsSlice.actions;

export const selectActions = (state: RootState): iActionStore => state.actions;

export default actionsSlice.reducer;
