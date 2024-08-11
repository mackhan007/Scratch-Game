import React from "react";
import { StyleSheet, View } from "react-native";
import { useAppSelector } from "../stores/Hooks";
import { selectSprits } from "../stores/Sprits/SpritsSlice";
import PlaygroundIconComponent from "./PlaygroundIcon";

interface PlaygroundComponentProps {}

const PlaygroundComponent: React.FC<PlaygroundComponentProps> = ({}) => {
  const { sprits } = useAppSelector(selectSprits);

  return (
    <View style={styles.playgroundContainer}>
      <View style={styles.playgroundBoxContainer}>
        {Object.entries(sprits).map(([name, sprit]) => (
          <PlaygroundIconComponent key={name} name={name} image={sprit.image} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  playgroundContainer: {
    height: "50%",
  },
  playgroundBoxContainer: {
    flex: 1,
    margin: 10,
    backgroundColor: "white",
    borderRadius: 6,
  },
  image: {
    width: 90,
    height: 90,
    resizeMode: "cover",
  },
});

export default PlaygroundComponent;
