import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { iSpritsStore, tPosition } from "./Types";

import CatImage from "../../assets/scratch-cat.png";
import { tNullable } from "./../../types/commonTypes";

const initialState: iSpritsStore = {
  sprits: {
    Cat: {
      selectedAction: null,
      image: CatImage,
      position: { x: 0, y: 0 },
    },
  },
  selectedSprit: "Cat",
};

const SpritsSlice = createSlice({
  name: "sprits",
  initialState,
  reducers: {
    updateSpritAction: (
      state,
      action: PayloadAction<{
        spritName: string;
        selectedAction: tNullable<string>;
      }>
    ) => {
      const { spritName, selectedAction } = action.payload;
      state.sprits[spritName].selectedAction = selectedAction;
    },
    updateSpritPosition: (
      state,
      action: PayloadAction<{
        spritName: string;
        position: tPosition;
      }>
    ) => {
      const { spritName, position } = action.payload;
      state.sprits[spritName].position = position;
    },
  },
});

export const { updateSpritAction, updateSpritPosition } = SpritsSlice.actions;

export const selectSprits = (state: RootState): iSpritsStore => state.sprits;

export default SpritsSlice.reducer;
