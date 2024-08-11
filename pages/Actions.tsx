import EvilIcons from "@expo/vector-icons/EvilIcons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import uuid from "react-native-uuid";
import DraggableItemComponent from "../components/DraggableItem";
import TopBarComponent from "../components/TopBar";
import { actionCode } from "../constants/ACTIONS_CODE";
import { selectActions, updatedAction } from "../stores/Actions/ActionsSlice";
import { useAppDispatch, useAppSelector } from "../stores/Hooks";
import { selectSprits, updateSpritAction } from "../stores/Sprits/SpritsSlice";
import { getBoxSizing } from "../utils/getBoxSizing.utils";
import { showAlert } from "../utils/showAlert.utils";

const ActionsPage: React.FC = () => {
  const [dropZoneBounds, setDropZoneBounds] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const dropZoneRef = useRef<View>(null);
  const { actions, selectedAction } = useAppSelector(selectActions);
  const { selectedSprit } = useAppSelector(selectSprits);
  const navigation = useNavigation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      getBoxSizing({ boxRef: dropZoneRef, setState: setDropZoneBounds });
    }, 0);
  }, []);

  const handleDrop = (item: string) => {
    const lastItem =
      actions[selectedAction][actions[selectedAction].length - 1];

    if (lastItem === "Repeat") {
      showAlert({
        title: "Adding after loop...",
        message:
          "Repeat should be in the end. Please remove repeat and continue adding.",
      });

      return;
    }

    dispatch(
      updatedAction({
        actionName: selectedAction,
        actionList: [...actions[selectedAction], item],
      })
    );

    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  const handleDelete = (index: number) => {
    const actionsCopy = { ...actions };
    const newActions = actionsCopy[selectedAction].filter(
      (_, i) => i !== index
    );
    dispatch(
      updatedAction({ actionName: selectedAction, actionList: newActions })
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaStyles}>
      <TopBarComponent
        showDoneButton
        onDonePress={() => {
          dispatch(
            updateSpritAction({
              spritName: selectedSprit,
              selectedAction: selectedAction,
            })
          );
          navigation.goBack();
        }}
      />
      <GestureHandlerRootView>
        <View style={styles.container}>
          <View style={styles.row}>
            <View style={styles.codeActionBox}>
              <Text style={styles.codeBox}>Code</Text>
              <View style={styles.lineStyle} />
              {Object.keys(actionCode).map((item) => (
                <DraggableItemComponent
                  key={`draggable-item-${item}`}
                  item={item}
                  onDrop={handleDrop}
                  dropZoneBounds={dropZoneBounds}
                />
              ))}

              {/* <FlatList
                data={Object.keys(actionCode)}
                removeClippedSubviews={false}
                renderItem={(item) => {
                  return (
                    <DraggableItemComponent
                      key={item.index}
                      item={item.item}
                      onDrop={handleDrop}
                      dropZoneBounds={dropZoneBounds}
                    />
                  );
                }}
              /> */}
            </View>
            <View ref={dropZoneRef} style={styles.codeActionBox}>
              <Text style={styles.actionBox}>Actions</Text>
              <View style={styles.lineStyle} />
              {actions[selectedAction].map((item, index) => (
                <View key={`action-${uuid.v4()}-${item}`} style={styles.item}>
                  <Text style={{ color: "white" }}>{item}</Text>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDelete(index)}
                  >
                    <EvilIcons name="trash" size={24} color="white" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaStyles: {
    marginTop: StatusBar.currentHeight,
  },
  container: {
    flex: 1,
    backgroundColor: "red",
    height: "100%",
  },
  item: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
    backgroundColor: "#2196f3",
  },
  row: {
    flexDirection: "row",
  },
  codeActionBox: {
    flex: 1,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "lightgrey",
    margin: 10,
    borderRadius: 6,
    height: 800,
  },
  codeBox: {
    fontSize: 20,
    color: "#2196f3",
    padding: 10,
  },
  actionBox: {
    fontSize: 20,
    color: "green",
    padding: 10,
  },
  lineStyle: {
    borderWidth: 1,
    width: "100%",
    borderColor: "lightgrey",
    marginBottom: 10,
  },
  deleteButton: {
    position: "absolute",
    right: -20,
    top: -15,
    width: 30,
    height: 30,
    backgroundColor: "red",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ActionsPage;
