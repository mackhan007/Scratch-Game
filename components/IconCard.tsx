import EvilIcons from "@expo/vector-icons/EvilIcons";
import { useNavigation } from "@react-navigation/native";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAppDispatch } from "../stores/Hooks";
import { updateSpritAction } from "../stores/Sprits/SpritsSlice";

interface IconCardComponentProps {
  name: string;
  image: ImageSourcePropType;
  selectedAction: tNullable<string>;
}

const IconCardComponent: React.FC<IconCardComponentProps> = ({
  name,
  image,
  selectedAction,
}) => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();

  const pushToActionsPage = () => {
    if (selectedAction === null) {
      navigation.navigate("actions");
      return;
    }

    dispatch(updateSpritAction({ spritName: name, selectedAction: null }));
  };

  return (
    <View style={styles.iconCardContainer}>
      <TouchableOpacity style={styles.deleteButton} onPress={() => {}}>
        <EvilIcons name="trash" size={24} color="white" />
      </TouchableOpacity>

      <View style={styles.iconBox}>
        <Image source={image} style={styles.image} />
      </View>

      {selectedAction && (
        <View style={styles.actionTag}>
          <Text style={{ color: "white" }}>{selectedAction}</Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.addActionsButton}
        onPress={pushToActionsPage}
      >
        <Text style={{ color: "white" }}>
          {selectedAction === null ? "Add" : "Remove"} Actions
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  iconCardContainer: {
    height: 150,
    width: 150,
    margin: 10,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: "white",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column",
    position: "relative",
  },
  iconBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 90,
    height: 90,
    resizeMode: "contain",
  },
  addActionsButton: {
    width: "100%",
    height: 40,
    backgroundColor: "#2196f3",
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  actionTag: {
    position: "absolute",
    width: 150,
    backgroundColor: "#4caf50",
    padding: 5,
    left: 0,
    top: "40%",
    alignItems: "center",
  },
  deleteButton: {
    position: "absolute",
    right: -5,
    top: -10,
    width: 30,
    height: 30,
    backgroundColor: "#2196f3",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default IconCardComponent;
