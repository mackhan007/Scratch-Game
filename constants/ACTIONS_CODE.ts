import { Animated, Easing } from "react-native";

interface iActionCodeParams {
  position: Animated.ValueXY;
  duration: number;
  spinAnimation: Animated.Value;
  setShowHello: (value: boolean) => void;
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
  "Move X by 50": ({ position, duration }) => {
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
  },
  "Move Y by 50": ({ position, duration }) => {
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
  "Go to (0, 0)": ({ position, duration }) => {
    Animated.timing(position, {
      toValue: {
        x: 0,
        y: 0,
      },
      duration,
      useNativeDriver: true,
    }).start();
  },
  "Go to (50, 50)": ({ position, duration }) => {
    Animated.timing(position, {
      toValue: {
        x: 50,
        y: 50,
      },
      duration,
      useNativeDriver: true,
    }).start();
  },
  "Go to Random Position": ({ position, duration }) => {
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
  },
  "Say Hello for 1 second": ({ setShowHello }) => {
    setShowHello(true);

    setTimeout(() => {
      setShowHello(false);
    }, 1000);
  },
  // "Increase Size by 10": () => {},
  // "Decrease Size by 10": () => {},
  Repeat: () => {},
};

export { actionCode };
