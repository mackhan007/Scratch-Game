import React from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SPRITS } from "../constants/SPRITS_IMAGES";
import { useAppDispatch, useAppSelector } from "../stores/Hooks";
import { addSpritAction, selectSprits } from "../stores/Sprits/SpritsSlice";

interface ShowAddSpritListComponentProps {
  clickClose: () => void;
}

const ShowAddSpritListComponent: React.FC<ShowAddSpritListComponentProps> = ({
  clickClose,
}) => {
  const { sprits } = useAppSelector(selectSprits);
  const dispatch = useAppDispatch();

  const spritList: Record<string, ImageSourcePropType> = {};

  Object.entries(SPRITS).forEach(([name, sprit]) => {
    if (sprits[name]) {
      return;
    }

    spritList[name] = SPRITS[name];
  });

  return (
    <View>
      {Object.entries(spritList).map(([name, sprit]) => (
        <TouchableOpacity
          key={`item-${name}`}
          style={styles.row}
          onPress={() => {
            dispatch(
              addSpritAction({
                spritName: name,
                spritImage: sprit,
              })
            );
            clickClose();
          }}
        >
          <Text>{name}</Text>
          <Image source={sprit} style={{ width: 50, height: 50 }} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
});

export default ShowAddSpritListComponent;
