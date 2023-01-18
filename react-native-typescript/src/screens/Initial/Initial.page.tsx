import React from 'react';
import {View} from 'react-native';
import {C} from '../../assets/constants';
import LottieView from 'lottie-react-native';
import {navigator} from '../../routes/navigation';
import {initialStyles as styles} from './Initial.style';
import CustomButton from '../../components/CustomButton/CustomButton.component';

const InitialScreen = (): JSX.Element => {
  const onBtnHandler = () => navigator.navigate('HomePage');
  return (
    <View style={C.styles.itemsCenter}>
      <LottieView
        loop
        autoPlay
        style={styles.icon}
        source={require('../../assets/animations/circle.json')}
      />
      <CustomButton
        btnStyle={styles.btn}
        title={C.strings.CONTINUE}
        onButtonHandler={onBtnHandler}
      />
    </View>
  );
};

export default InitialScreen;
