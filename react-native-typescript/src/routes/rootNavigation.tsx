import React from 'react';
import {setTopLevelNavigator} from './navigation';
import {HomeScreen, InitialScreen, MainScreen} from './pages';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const RootStack = createStackNavigator();

const RootNavigation = (): JSX.Element => {
  return (
    <NavigationContainer ref={setTopLevelNavigator}>
      <RootStack.Navigator
        initialRouteName="InitialScreen"
        screenOptions={{headerShown: false}}>
        <RootStack.Screen name="HomePage" component={HomeScreen} />
        <RootStack.Screen name="MainPage" component={MainScreen} />
        <RootStack.Screen name="InitialScreen" component={InitialScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
export default RootNavigation;
