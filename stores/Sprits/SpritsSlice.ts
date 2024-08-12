import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { iSpritsStore, tPosition } from "./Types";

import { ImageSourcePropType } from "react-native";
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
    addSpritAction: (
      state,
      action: PayloadAction<{
        spritName: string;
        spritImage: ImageSourcePropType;
      }>
    ) => {
      state.sprits[action.payload.spritName] = {
        selectedAction: null,
        image: action.payload.spritImage,
        position: { x: 0, y: 0 },
      };

      state.selectedSprit = action.payload.spritName;
    },
    deleteSpritAction: (state, action: PayloadAction<string>) => {
      delete state.sprits[action.payload];
    },
    setSelectedSprit: (state, action: PayloadAction<string>) => {
      state.selectedSprit = action.payload;
    },
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

export const {
  updateSpritAction,
  updateSpritPosition,
  addSpritAction,
  deleteSpritAction,
  setSelectedSprit,
} = SpritsSlice.actions;

export const selectSprits = (state: RootState): iSpritsStore => state.sprits;

export default SpritsSlice.reducer;
