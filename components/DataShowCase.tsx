import { StyleSheet, Text, View } from "react-native";
import { useAppSelector } from "../stores/Hooks";
import { selectSprits } from "../stores/Sprits/SpritsSlice";

interface DataShowCaseComponentProps {}

const DataShowCaseComponent: React.FC<DataShowCaseComponentProps> = () => {
  const { sprits, selectedSprit } = useAppSelector(selectSprits);

  return (
    <View style={styles.dataShowCaseContainer}>
      <View style={styles.dataShowCaseBoxContainer}>
        <View style={styles.flexRow}>
          <Text>Sprit</Text>
          <Text style={styles.dataBorder}>{selectedSprit}</Text>
        </View>
        <View style={styles.flexRow}>
          <Text>X</Text>
          <Text style={styles.dataBorder}>
            {sprits[selectedSprit].position.x.toFixed(2)}
          </Text>
        </View>
        <View style={styles.flexRow}>
          <Text>Y</Text>
          <Text style={styles.dataBorder}>
            {sprits[selectedSprit].position.y.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dataShowCaseContainer: {
    height: "10%",
  },
  dataShowCaseBoxContainer: {
    flex: 1,
    margin: 10,
    marginTop: 0,
    backgroundColor: "white",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    margin: 10,
  },
  dataBorder: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 6,
    borderColor: "#eceff1",
  },
});

export default DataShowCaseComponent;
