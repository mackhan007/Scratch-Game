import { View } from "react-native";
import { iBoxSizing } from "../types/commonTypes";

type tGetBoxSizingParams = {
  boxRef: React.RefObject<View>;
  setState: (_: iBoxSizing) => void;
};

const getBoxSizing = ({ boxRef, setState }: tGetBoxSizingParams) => {
  boxRef.current?.measure((_, _1, width, height, pageX, pageY) => {
    setState({ x: pageX, y: pageY, width, height });
  });
};

export { getBoxSizing };
