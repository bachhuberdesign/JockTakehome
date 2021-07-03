import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import * as React from 'react';

import { PlayerDetails, EventPlayers, PlaceholderScreen } from '../screens';

import { BottomTabParamList, TabOneParamList, TabTwoParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();
const PlayersStack = createStackNavigator<TabOneParamList>();
const OrdersStack = createStackNavigator<TabTwoParamList>();
const HoldingsStack = createStackNavigator<TabTwoParamList>();
const ActivityStack = createStackNavigator<TabTwoParamList>();
const LeaderboardStack = createStackNavigator<TabTwoParamList>();

const defaultScreenOptions: Partial<StackNavigationOptions> = {
  headerBackTitleVisible: false,
};

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
      <BottomTab.Screen
        name="Holdings"
        component={HoldingsTabNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Activity"
        component={ActivityTabNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Leaderboard"
        component={LeaderboardTabNavigator}
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
    <PlayersStack.Navigator screenOptions={defaultScreenOptions}>
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
    <OrdersStack.Navigator screenOptions={defaultScreenOptions}>
      <OrdersStack.Screen
        name="EventOrders"
        component={PlaceholderScreen}
        options={{ headerTitle: 'Orders' }}
      />
    </OrdersStack.Navigator>
  );
}

function HoldingsTabNavigator() {
  return (
    <HoldingsStack.Navigator screenOptions={defaultScreenOptions}>
      <HoldingsStack.Screen
        name="EventHoldings"
        component={PlaceholderScreen}
        options={{ headerTitle: 'Holdings' }}
      />
    </HoldingsStack.Navigator>
  );
}

function ActivityTabNavigator() {
  return (
    <ActivityStack.Navigator screenOptions={defaultScreenOptions}>
      <ActivityStack.Screen
        name="EventActivity"
        component={PlaceholderScreen}
        options={{ headerTitle: 'Activity' }}
      />
    </ActivityStack.Navigator>
  );
}

function LeaderboardTabNavigator() {
  return (
    <LeaderboardStack.Navigator screenOptions={defaultScreenOptions}>
      <LeaderboardStack.Screen
        name="EventLeaderboard"
        component={PlaceholderScreen}
        options={{ headerTitle: 'Leaderboard' }}
      />
    </LeaderboardStack.Navigator>
  );
}
