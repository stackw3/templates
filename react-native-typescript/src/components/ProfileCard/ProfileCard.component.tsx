import React from 'react';
import {View, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import {IUser} from '../../interfaces/user.interface';
import {profileCardStyles as styles} from './ProfileCard.style';

const ProfileCard = ({id, image, lastName, firstName}: IUser): JSX.Element => {
  const source = {
    uri: image,
    priority: FastImage.priority.normal,
  };
  return (
    <View style={styles.cardView}>
      <FastImage
        source={source}
        style={styles.imageStyle}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.viewStyle}>
        <Text style={styles.textStyle}>{firstName}</Text>
        <Text style={styles.textStyle}>{lastName}</Text>
      </View>
    </View>
  );
};

export default ProfileCard;
