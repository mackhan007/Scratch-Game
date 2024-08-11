import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

const initialState = {
  play: false,
};

const controllerSlice = createSlice({
  name: "controller",
  initialState,
  reducers: {
    play: (state) => {
      state.play = true;
    },
    reset: (state) => {
      state.play = false;
    },
  },
});

export const { play, reset } = controllerSlice.actions;

export const selectController = (state: RootState) => state.controller;

export default controllerSlice.reducer;
