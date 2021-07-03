import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import { PlayerDetails, EventPlayers, PlaceholderScreen } from '../screens';

import { BottomTabParamList, TabOneParamList, TabTwoParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();
const PlayersStack = createStackNavigator<TabOneParamList>();
const OrdersStack = createStackNavigator<TabTwoParamList>();

export default function EventDetailsNavigator() {
  return (
    <BottomTab.Navigator initialRouteName="EventPlayers">
      <BottomTab.Screen
        name="Players"
        component={PlayersTabNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Orders"
        component={OrdersTabNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

function PlayersTabNavigator() {
  return (
    <PlayersStack.Navigator>
      <PlayersStack.Screen
        name="EventPlayers"
        component={EventPlayers}
        options={{ headerTitle: 'Players' }}
      />
      <PlayersStack.Screen name="PlayerDetails" component={PlayerDetails} />
    </PlayersStack.Navigator>
  );
}

function OrdersTabNavigator() {
  return (
    <OrdersStack.Navigator>
      <OrdersStack.Screen
        name="EventOrders"
        component={PlaceholderScreen}
        options={{ headerTitle: 'Orders' }}
      />
    </OrdersStack.Navigator>
  );
}
