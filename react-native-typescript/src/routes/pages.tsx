import React from 'react';
import {PageFallBackUi, withPageSuspense} from '../hoc/withLazyPage';

const HomeScreen = withPageSuspense(
  React.lazy(() => import('../screens/Home/Home.page')),
  PageFallBackUi,
);

const InitialScreen = withPageSuspense(
  React.lazy(() => import('../screens/Initial/Initial.page')),
  PageFallBackUi,
);

const MainScreen = withPageSuspense(
  React.lazy(() => import('../screens/Main/Main.page')),
  PageFallBackUi,
);

export {
  HomeScreen,
  MainScreen,
  InitialScreen,
};
