import { ImageSourcePropType } from "react-native";

interface iSpritsStore {
  sprits: tSprits;
  selectedSprit: string;
}

type tSprits = Record<string, iSprit>;
type tPosition = { x: number; y: number };

interface iSprit {
  selectedAction: tNullable<string>;
  image: ImageSourcePropType;
  position: tPosition;
}

export { iSprit, iSpritsStore, tPosition, tSprits };
