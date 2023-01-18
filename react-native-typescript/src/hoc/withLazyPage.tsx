import React, {Suspense} from 'react';
import {C} from '../assets/constants';
import {View, ActivityIndicator} from 'react-native';

const withPageSuspense = (
  Component: React.LazyExoticComponent<() => JSX.Element>,
  PageFallBackUi: () => JSX.Element,
) => {
  return (props: any) => {
    return (
      <Suspense fallback={<PageFallBackUi />}>
        <Component {...props} />
      </Suspense>
    );
  };
};

const PageFallBackUi = () => (
  <View style={C.styles.itemsCenter}>
    <ActivityIndicator size={'large'} color={C.colors.primary.color2} />
  </View>
);

export {PageFallBackUi, withPageSuspense};
