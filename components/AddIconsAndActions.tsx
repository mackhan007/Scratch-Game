import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useAppSelector } from "../stores/Hooks";
import { selectSprits } from "../stores/Sprits/SpritsSlice";
import IconCardComponent from "./IconCard";
import ModelViewComponent from "./ModelView";
import ShowAddSpritListComponent from "./ShowAddSpritList";

interface AddIconsAndActionsComponentProps {}

const AddIconsAndActionsComponent: React.FC<
  AddIconsAndActionsComponentProps
> = () => {
  const { sprits } = useAppSelector(selectSprits);
  const [showModel, setShowModel] = useState(false);

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

          <TouchableOpacity
            onPress={() => {
              setShowModel(true);
            }}
            style={styles.addOnCard}
          >
            <Ionicons name="add-sharp" size={60} color="black" />
          </TouchableOpacity>
        </ScrollView>
        <ModelViewComponent
          showModel={showModel}
          child={
            <ShowAddSpritListComponent
              clickClose={() => {
                setShowModel(false);
              }}
            />
          }
          onModelClose={() => {
            setShowModel(false);
          }}
        />
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
  addOnCard: {
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
    justifyContent: "center",
    flexDirection: "column",
    position: "relative",
  },
});

export default AddIconsAndActionsComponent;
