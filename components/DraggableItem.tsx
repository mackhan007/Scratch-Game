import { useRef, useState } from "react";
import { Animated, StyleSheet, Text } from "react-native";
import {
  HandlerStateChangeEvent,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
  State,
} from "react-native-gesture-handler";

interface DraggableItemComponentProps {
  item: string;
  onDrop: (item: string) => void;
  dropZoneBounds: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

const DraggableItemComponent: React.FC<DraggableItemComponentProps> = ({
  item,
  onDrop,
  dropZoneBounds,
}) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const [isDragging, setIsDragging] = useState(false);

  const onGestureEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationX: translateX,
          translationY: translateY,
        },
      },
    ],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = (
    event: HandlerStateChangeEvent<PanGestureHandlerEventPayload>
  ) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      setIsDragging(true);
    } else if (event.nativeEvent.state === State.END) {
      const { absoluteX, absoluteY } = event.nativeEvent;

      if (
        absoluteX >= dropZoneBounds.x &&
        absoluteX <= dropZoneBounds.x + dropZoneBounds.width &&
        absoluteY >= dropZoneBounds.y &&
        absoluteY <= dropZoneBounds.y + dropZoneBounds.height
      ) {
        onDrop(item);
      }

      translateX.setValue(0);
      translateY.setValue(0);
      setIsDragging(false);
    }
  };

  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}
    >
      <Animated.View
        style={[
          styles.item,
          {
            transform: [{ translateX: translateX }, { translateY: translateY }],
            zIndex: isDragging ? 10 : 0,
          },
        ]}
      >
        <Text style={{ color: "white" }}>{item}</Text>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
    backgroundColor: "#2196f3",
    zIndex: 100,
  },
});

export default DraggableItemComponent;
