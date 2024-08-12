import { ImageSourcePropType } from "react-native";
import BallImage from "../assets/baseball.png";
import FrogImage from "../assets/frog-cartoon.png";

const SPRITS: Record<string, ImageSourcePropType> = {
  Ball: BallImage,
  Frog: FrogImage,
};

export { SPRITS };
