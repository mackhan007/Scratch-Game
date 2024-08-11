import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

const initialState = {
  play: false,
  reset: false,
};

const controllerSlice = createSlice({
  name: "controller",
  initialState,
  reducers: {
    playState: (state) => {
      state.play = true;
    },
    pauseState: (state) => {
      state.play = false;
    },
    resetState: (state) => {
      state.reset = true;
    },
    resetDoneState: (state) => {
      state.reset = false;
    },
  },
});

export const { playState, pauseState, resetDoneState, resetState } =
  controllerSlice.actions;

export const selectController = (state: RootState) => state.controller;

export default controllerSlice.reducer;
