import {Dimensions} from 'react-native';

const BORDER_RADIUS = 20;
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export const measures = {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  borderRadius: BORDER_RADIUS,
};
