import { Provider } from "react-redux";
import AppStack from "./routes/appStack";
import store from "./stores";

export default function App() {
  return (
    <Provider store={store}>
      <AppStack />
    </Provider>
  );
}
