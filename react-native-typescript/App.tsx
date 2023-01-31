/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import {Text} from 'react-native';
import RootNavigation from './src/routes/rootNavigation';

interface TextWithDefaultProps extends Text {
  defaultProps?: {allowFontScaling?: boolean};
}
// For removing font scaling in application
(Text as unknown as TextWithDefaultProps).defaultProps =
  (Text as unknown as TextWithDefaultProps).defaultProps || {};
(Text as unknown as TextWithDefaultProps).defaultProps!.allowFontScaling =
  false;

const App = (): JSX.Element => <RootNavigation />;

export default App;
