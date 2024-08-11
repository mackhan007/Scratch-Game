import { ScrollView, StyleSheet, View } from "react-native";
import { useAppSelector } from "../stores/Hooks";
import { selectSprits } from "../stores/Sprits/SpritsSlice";
import IconCardComponent from "./IconCard";

interface AddIconsAndActionsComponentProps {}

const AddIconsAndActionsComponent: React.FC<
  AddIconsAndActionsComponentProps
> = () => {
  const { sprits } = useAppSelector(selectSprits);

  return (
    <View style={styles.addIconAndActionsContainer}>
      <View style={styles.addIconAndActionsBoxContainer}>
        <ScrollView horizontal={true}>
          {Object.entries(sprits).map(([name, sprit]) => (
            <IconCardComponent
              key={`icon-${name}`}
              name={name}
              image={sprit.image}
              selectedAction={sprit.selectedAction}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  addIconAndActionsContainer: {
    height: 180,
  },
  addIconAndActionsBoxContainer: {
    flex: 1,
    margin: 10,
    marginTop: 0,
    backgroundColor: "white",
    borderRadius: 6,
    flexDirection: "row",
  },
});

export default AddIconsAndActionsComponent;
