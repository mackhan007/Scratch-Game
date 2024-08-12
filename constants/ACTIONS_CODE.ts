import { Animated, Easing } from "react-native";
import { AppDispatch } from "../stores";
import { updateSpritPosition } from "../stores/Sprits/SpritsSlice";

interface iActionCodeParams {
  spritName: string;
  position: Animated.ValueXY;
  duration: number;
  spinAnimation: Animated.Value;
  setShowHello: (value: boolean) => void;
  dispatch: AppDispatch;
}

interface AnimatedValueXY {
  x: {
    _value: number;
  };
  y: {
    _value: number;
  };
}

interface AnimatedValue {
  _value: number;
}

type iActionCode = {
  [key: string]: (params: iActionCodeParams) => void;
};

const actionCode: iActionCode = {
  "Move X by 50": ({ position, duration, spritName, dispatch }) => {
    const adaptedPosition = position as unknown as AnimatedValueXY;

    const x = adaptedPosition.x._value + 50;
    const y = adaptedPosition.y._value;

    if (x > 300) {
      return;
    }

    Animated.timing(position, {
      toValue: {
        x,
        y,
      },
      duration,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      dispatch(
        updateSpritPosition({
          spritName,
          position: { x, y },
        })
      );
    }, duration);
  },
  "Move Y by 50": ({ position, duration, spritName, dispatch }) => {
    const adaptedPosition = position as unknown as AnimatedValueXY;

    const x = adaptedPosition.x._value;
    const y = adaptedPosition.y._value + 50;

    if (y > 250) {
      return;
    }

    Animated.timing(position, {
      toValue: {
        x,
        y,
      },
      duration,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      dispatch(
        updateSpritPosition({
          spritName,
          position: { x, y },
        })
      );
    }, duration);
  },
  "Rotate by 360": ({ spinAnimation, duration }) => {
    const adaptedSpinAnimation = spinAnimation as unknown as AnimatedValue;

    const spinValue = adaptedSpinAnimation._value ^ 1;

    Animated.timing(spinAnimation, {
      toValue: spinValue,
      duration,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  },
  "Go to (0, 0)": ({ position, duration, spritName, dispatch }) => {
    const x = 0;
    const y = 0;

    Animated.timing(position, {
      toValue: {
        x,
        y,
      },
      duration,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      dispatch(
        updateSpritPosition({
          spritName,
          position: { x, y },
        })
      );
    }, duration);
  },
  "Go to (50, 50)": ({ position, duration, spritName, dispatch }) => {
    Animated.timing(position, {
      toValue: {
        x: 50,
        y: 50,
      },
      duration,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      dispatch(
        updateSpritPosition({
          spritName,
          position: { x: 50, y: 50 },
        })
      );
    }, duration);
  },
  "Go to Random Position": ({ position, duration, spritName, dispatch }) => {
    const x = Math.floor(Math.random() * 300);
    const y = Math.floor(Math.random() * 250);

    Animated.timing(position, {
      toValue: {
        x,
        y,
      },
      duration,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      dispatch(
        updateSpritPosition({
          spritName,
          position: { x, y },
        })
      );
    }, duration);
  },
  "Say Hello for 1 second": ({ duration, setShowHello }) => {
    setShowHello(true);

    setTimeout(() => {
      setShowHello(false);
    }, duration);
  },
  // "Increase Size by 10": () => {},
  // "Decrease Size by 10": () => {},
  Repeat: () => {},
};

export { actionCode };
