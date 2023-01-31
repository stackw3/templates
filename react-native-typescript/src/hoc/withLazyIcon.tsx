import React, {Suspense} from 'react';
import {SvgProps} from 'react-native-svg';

const withIconSuspense = (
  Icon: React.LazyExoticComponent<React.FC<SvgProps>>,
  FallBack: () => null,
) => {
  return (props: any) => {
    return (
      <Suspense fallback={<FallBack />}>
        <Icon {...props} />
      </Suspense>
    );
  };
};

function FallBackUi() {
  return null;
}

export {FallBackUi, withIconSuspense};
