import React from "react";
import { Modal, StyleSheet, View } from "react-native";

interface ModelViewComponentProps {
  showModel: boolean;
  child: React.ReactNode;
  onModelClose: () => void;
}

const ModelViewComponent: React.FC<ModelViewComponentProps> = ({
  showModel,
  child,
}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={showModel}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>{child}</View>
      </View>
    </Modal>
  );
};

export default ModelViewComponent;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
