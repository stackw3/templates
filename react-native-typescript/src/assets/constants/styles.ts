import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  f1: {
    flex: 1,
  },
  viewRow: {
    flexDirection: 'row',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowEvenly: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  rowAround: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  itemsCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
