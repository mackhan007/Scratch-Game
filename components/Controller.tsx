import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
  pauseState,
  playState,
  resetState,
  selectController,
} from "../stores/Controller/ControllerSlice";
import { useAppDispatch, useAppSelector } from "../stores/Hooks";

interface ControllerComponentProps {}

const ControllerComponent: React.FC<ControllerComponentProps> = () => {
  const { play } = useAppSelector(selectController);

  const dispatch = useAppDispatch();

  return (
    <View style={styles.buttonContainer}>
      <View style={styles.buttonBoxContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (play) {
              dispatch(pauseState());
            } else {
              dispatch(playState());
            }
          }}
        >
          {play ? (
            <MaterialIcons name="pause" size={24} color="white" />
          ) : (
            <MaterialIcons name="play-arrow" size={24} color="white" />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            dispatch(resetState());
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
