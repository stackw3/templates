import React, {lazy} from 'react';
import {FallBackUi, withIconSuspense} from '../../hoc/withLazyIcon';

const HomeIcon = withIconSuspense(
  lazy(() => import('./svg/home.svg')),
  FallBackUi,
);

export {HomeIcon};
