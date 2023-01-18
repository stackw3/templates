import React from 'react';
import {View, Text} from 'react-native';
import {C} from '../../assets/constants';
import {HomeIcon} from '../../assets/images';
import {FlashList} from '@shopify/flash-list';
import {mainStyles as styles} from './Main.style';
import {IUser} from '../../interfaces/user.interface';
import {profileData} from '../../utils/data/profileData';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ProfileCard from '../../components/ProfileCard/ProfileCard.component';

const renderItem = ({item}: {item: IUser}) => <ProfileCard {...item} />;

const MainPage = (): JSX.Element => {
  const {top} = useSafeAreaInsets();
  return (
    <View style={[C.styles.f1, styles.mainView, {top}]}>
      <View style={[C.styles.viewRow, styles.itemsCenter]}>
        <HomeIcon width={20} height={20} />
        <Text style={styles.txtStyle}>{C.strings.HOME}</Text>
      </View>
      <FlashList
        data={profileData}
        renderItem={renderItem}
        estimatedItemSize={100}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listStyle}
      />
    </View>
  );
};

export default MainPage;
