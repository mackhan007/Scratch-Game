import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  ImageSourcePropType,
  PanResponder,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { actionCode } from "../constants/ACTIONS_CODE";
import store from "../stores";
import { selectActions } from "../stores/Actions/ActionsSlice";
import {
  pauseState,
  resetDoneState,
  selectController,
} from "../stores/Controller/ControllerSlice";
import { useAppDispatch, useAppSelector } from "../stores/Hooks";
import {
  selectSprits,
  updateSpritPosition,
} from "../stores/Sprits/SpritsSlice";
import { iBoxSizing, tNullable } from "../types/commonTypes";

interface PlaygroundIconComponentProps {
  name: string;
  image: ImageSourcePropType;
}

const PlaygroundIconComponent: React.FC<PlaygroundIconComponentProps> = ({
  name,
  image,
}) => {
  const { play, reset } = useAppSelector(selectController);
  const { sprits } = useAppSelector(selectSprits);
  const { actions } = useAppSelector(selectActions);
  const dispatch = useAppDispatch();

  const [dragging, setDragging] = useState(false);
  const [showHello, setShowHello] = useState(false);

  const playgroundBounds = useRef<tNullable<iBoxSizing>>(null);
  const position = useRef(
    new Animated.ValueXY({
      x: sprits[name].position.x,
      y: sprits[name].position.y,
    })
  ).current;
  const spinAnimation = useRef(new Animated.Value(0)).current;
  const duration = 1000;
  const spin = spinAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setDragging(true);
      },
      onPanResponderMove: (e, gestureState) => {
        const newX = Math.max(0, Math.min(300, gestureState.dx));
        const newY = Math.max(0, Math.min(250, gestureState.dy));

        position.setValue({ x: newX, y: newY });

        dispatch(
          updateSpritPosition({
            spritName: name,
            position: { x: newX, y: newY },
          })
        );
      },
      onPanResponderRelease: () => {
        setDragging(false);
      },
    })
  ).current;

  const playAction = async (actionsCopy: string[]) => {
    for (const action of actionsCopy) {
      if (actionCode[action]) {
        actionCode[action]({
          spritName: name,
          position,
          spinAnimation,
          duration,
          setShowHello,
          dispatch,
        });
        await new Promise((resolve) => setTimeout(resolve, duration + 100));

        const storePlay = store.getState().controller.play;

        if (!storePlay) {
          break;
        }
      }
    }
  };

  const preprocessActions = async (playParam: boolean) => {
    let repeat = false;
    const { selectedAction } = sprits[name];

    if (!selectedAction || !actions[selectedAction]) return;

    const actionsCopy = [...actions[selectedAction]];

    const lastItem = actionsCopy[actionsCopy.length - 1];

    if (lastItem === "Repeat") {
      actionsCopy.pop();
      repeat = true;
    }

    if (playParam) {
      await playAction(actionsCopy);
    }

    const storePlay = store.getState().controller.play;

    if (repeat && storePlay) {
      preprocessActions(storePlay);
    } else {
      // dispatch(pauseState());
    }
  };

  useEffect(() => {
    if (play) {
      preprocessActions(play);
    }
  }, [play]);

  useEffect(() => {
    if (reset) {
      position.setValue({ x: 0, y: 0 });
      setShowHello(false);
      dispatch(resetDoneState());
      dispatch(pauseState());
    }
  }, [reset]);

  return (
    <Animated.View
      style={{
        transform: position.getTranslateTransform(),
        opacity: dragging ? 0.8 : 1,
        position: "absolute",
      }}
      {...panResponder.panHandlers}
    >
      <Animated.Image
        source={image}
        style={{ ...styles.image, transform: [{ rotate: spin }] }}
      />
      {showHello && (
        <View style={styles.helloBox}>
          <Text style={{ color: "white" }}>Hello</Text>
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 90,
    height: 90,
    resizeMode: "contain",
  },
  helloBox: {
    position: "absolute",
    padding: 3,
    borderRadius: 5,
    left: 12,
    backgroundColor: "#2196f3",
    justifyContent: "center",
  },
});

export default PlaygroundIconComponent;
