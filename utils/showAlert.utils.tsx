import { Alert } from "react-native";

const showAlert = ({ title, message }: { title: string; message: string }) => {
  Alert.alert(title, message, [
    { text: "OK", onPress: () => console.log("OK Pressed") },
  ]);
};

export { showAlert };
