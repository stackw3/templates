import {
  Easing,
  withTiming,
  withSpring,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

export const useSampleHook = () => {
  const offset = useSharedValue(0);
  const randomWidth = useSharedValue(10);

  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const animatedSquare = useAnimatedStyle(() => {
    return {
      height: withTiming(randomWidth.value, config),
      width: withTiming(randomWidth.value, config),
    };
  });

  const animatedCircle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(offset.value * 255),
        },
      ],
    };
  });

  const onCircleHandler = () => {
    offset.value = Math.random();
  };

  const onSquareHandler = () => (randomWidth.value = Math.random() * 350);

  return {
    animatedSquare,
    animatedCircle,
    onCircleHandler,
    onSquareHandler,
  };
};
