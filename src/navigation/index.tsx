import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import { EventDashboard } from '../screens';
import { RootStackParams } from '../types';
import EventDetailsNavigator from './EventDetailsNavigator';

interface Props {
  colorScheme: ColorSchemeName;
}

const Stack = createStackNavigator<RootStackParams>();

const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="EventDashboard" component={EventDashboard} />
      <Stack.Screen name="EventDetails" component={EventDetailsNavigator} />
    </Stack.Navigator>
  );
};

const Navigation = ({ colorScheme }: Props) => {
  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
};

export default Navigation;
