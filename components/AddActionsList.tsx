import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  addNewAction,
  selectActions,
  setSelectedAction,
} from "../stores/Actions/ActionsSlice";
import { useAppDispatch, useAppSelector } from "../stores/Hooks";

interface AddActionsListComponentProps {
  clickClose: () => void;
}

const AddActionsListComponent: React.FC<AddActionsListComponentProps> = ({
  clickClose,
}) => {
  const { actions } = useAppSelector(selectActions);
  const dispatch = useAppDispatch();

  return (
    <View>
      <Text style={{ padding: 10 }}>Actions</Text>
      {Object.keys(actions).map((item) => {
        return (
          <TouchableOpacity
            onPress={() => {
              dispatch(setSelectedAction(item));
              clickClose();
            }}
            style={styles.textContainer}
            key={`action-${item}`}
          >
            <Text>{item}</Text>
          </TouchableOpacity>
        );
      })}
      <TouchableOpacity
        onPress={() => {
          dispatch(addNewAction());
          clickClose();
        }}
        style={styles.textContainer}
      >
        <Text>Add New Action</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    padding: 10,
  },
});

export default AddActionsListComponent;
