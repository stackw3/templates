import React from 'react';
import {View} from 'react-native';
import {C} from '../../assets/constants';
import Animated from 'react-native-reanimated';
import {homeStyles as styles} from './Home.style';
import {navigator} from '../../routes/navigation';
import {useSampleHook} from '../../hooks/useSampleHook';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton/CustomButton.component';

const HomePage = (): JSX.Element => {
  const {top} = useSafeAreaInsets();
  const {animatedCircle, animatedSquare, onCircleHandler, onSquareHandler} =
    useSampleHook();
  const onContinueHandler = () => navigator.navigate('MainPage');
  return (
    <View style={[C.styles.f1, styles.parentView, {top}]}>
      <Animated.View style={[animatedCircle, styles.circleStyle]} />
      <CustomButton
        btnStyle={styles.btn}
        txtStyle={styles.txtStyle}
        title={'Reanimated Example 1'}
        onButtonHandler={onCircleHandler}
      />
      <Animated.View style={[styles.sqreStyle, animatedSquare]} />
      <CustomButton
        btnStyle={styles.btn}
        txtStyle={styles.txtStyle}
        title={'Reanimated Example 2'}
        onButtonHandler={onSquareHandler}
      />
      <CustomButton
        btnStyle={styles.btn}
        txtStyle={styles.txtStyle}
        title={C.strings.CONTINUE}
        onButtonHandler={onContinueHandler}
      />
    </View>
  );
};

export default HomePage;
