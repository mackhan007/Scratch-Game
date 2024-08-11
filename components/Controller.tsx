import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { play, reset } from "../stores/Controller/ControllerSlice";
import { useAppDispatch } from "../stores/Hooks";

interface ControllerComponentProps {}

const ControllerComponent: React.FC<ControllerComponentProps> = ({}) => {
  const dispatch = useAppDispatch();

  return (
    <View style={styles.buttonContainer}>
      <View style={styles.buttonBoxContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            dispatch(play());
          }}
        >
          <MaterialIcons name="play-arrow" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            dispatch(reset());
          }}
        >
          <MaterialIcons name="replay" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    height: 70,
  },
  buttonBoxContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "white",
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 6,
    alignItems: "center",
    padding: 10,
  },
  button: {
    backgroundColor: "#2196f3",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default ControllerComponent;
