import { Image, StyleSheet, Text, View } from "react-native";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import ScratchTitle from "../assets/scratch.png";

interface TopBarComponentProps {
  showDoneButton?: boolean;
  onDonePress?: () => void;
}

const TopBarComponent: React.FC<TopBarComponentProps> = ({
  showDoneButton = false,
  onDonePress,
}) => {
  return (
    <View style={styles.topBar}>
      <Image source={ScratchTitle} style={styles.titleImg} />
      <GestureHandlerRootView style={{}}>
        <TouchableOpacity onPress={onDonePress}>
          <Text style={styles.signInText}>
            {showDoneButton ? "Done" : "Sign In"}
          </Text>
        </TouchableOpacity>
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: "#2196f3",
    height: 50,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleImg: {
    width: 100,
    height: 40,
    marginLeft: 10,
    resizeMode: "contain",
  },
  signInText: {
    marginRight: 10,
    fontSize: 16,
    color: "white",
  },
});

export default TopBarComponent;
