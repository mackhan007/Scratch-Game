import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import AddIconsAndActionsComponent from "../components/AddIconsAndActions";
import ControllerComponent from "../components/Controller";
import DataShowCaseComponent from "../components/DataShowCase";
import PlaygroundComponent from "../components/Playground";
import TopBarComponent from "../components/TopBar";

const HomePage: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TopBarComponent />
        <PlaygroundComponent />
        <DataShowCaseComponent />
        <ControllerComponent />
        <AddIconsAndActionsComponent />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eceff1",
    marginTop: StatusBar.currentHeight,
  },
});

export default HomePage;
