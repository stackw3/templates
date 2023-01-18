import React from 'react';
import {customBtnStyle as styles} from './CustomButton.style';
import {
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';

interface buttonProps {
  title: string;
  disabled?: boolean;
  onButtonHandler: () => void;
  txtStyle?: StyleProp<TextStyle>;
  btnStyle?: StyleProp<ViewStyle>;
}

const CustomButton = ({
  title,
  txtStyle,
  btnStyle,
  disabled,
  onButtonHandler,
}: buttonProps): JSX.Element => (
  <TouchableOpacity
    disabled={disabled}
    onPress={onButtonHandler}
    style={[
      styles.btn,
      btnStyle ? btnStyle : null,
      disabled ? styles.disabledBtn : null,
    ]}>
    <Text
      style={[
        styles.txtStyle,
        txtStyle ? txtStyle : null,
        disabled ? styles.disabledTxt : null,
      ]}>
      {title}
    </Text>
  </TouchableOpacity>
);

export default CustomButton;
