import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ActionsPage from "../pages/Actions";
import HomePage from "../pages/Home";

const Stack = createNativeStackNavigator();
const { Navigator, Screen } = Stack;

const AppStack = () => {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen
          name="home"
          component={HomePage}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name="actions"
          component={ActionsPage}
          options={{
            headerShown: false,
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
};

export default AppStack;
