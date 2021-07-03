import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import React from 'react';

import { EventPlayers, PlaceholderScreen } from '../screens';
import {
  ActivityStackParams,
  EventDetailsTabParams,
  HoldingsStackParams,
  LeaderboardStackParams,
  OrdersStackParams,
  PlayersStackParams,
} from '../types';

const EventDetailsTab = createBottomTabNavigator<EventDetailsTabParams>();
const PlayersStack = createStackNavigator<PlayersStackParams>();
const OrdersStack = createStackNavigator<OrdersStackParams>();
const HoldingsStack = createStackNavigator<HoldingsStackParams>();
const ActivityStack = createStackNavigator<ActivityStackParams>();
const LeaderboardStack = createStackNavigator<LeaderboardStackParams>();

const defaultScreenOptions: Partial<StackNavigationOptions> = {
  headerBackTitleVisible: false,
};

const TabBarIcon = (props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) => {
  return <Ionicons size={24} style={{ marginBottom: -3 }} {...props} />;
};

const PlayersTabNavigator = () => {
  return (
    <PlayersStack.Navigator screenOptions={defaultScreenOptions}>
      <PlayersStack.Screen
        name="EventPlayers"
        component={EventPlayers}
        options={{ headerTitle: 'Players' }}
      />
    </PlayersStack.Navigator>
  );
};

const OrdersTabNavigator = () => {
  return (
    <OrdersStack.Navigator screenOptions={defaultScreenOptions}>
      <OrdersStack.Screen
        name="EventOrders"
        component={PlaceholderScreen}
        options={{ headerTitle: 'Orders' }}
      />
    </OrdersStack.Navigator>
  );
};

const HoldingsTabNavigator = () => {
  return (
    <HoldingsStack.Navigator screenOptions={defaultScreenOptions}>
      <HoldingsStack.Screen
        name="EventHoldings"
        component={PlaceholderScreen}
        options={{ headerTitle: 'Holdings' }}
      />
    </HoldingsStack.Navigator>
  );
};

const ActivityTabNavigator = () => {
  return (
    <ActivityStack.Navigator screenOptions={defaultScreenOptions}>
      <ActivityStack.Screen
        name="EventActivity"
        component={PlaceholderScreen}
        options={{ headerTitle: 'Activity' }}
      />
    </ActivityStack.Navigator>
  );
};

const LeaderboardTabNavigator = () => {
  return (
    <LeaderboardStack.Navigator screenOptions={defaultScreenOptions}>
      <LeaderboardStack.Screen
        name="EventLeaderboard"
        component={PlaceholderScreen}
        options={{ headerTitle: 'Leaderboard' }}
      />
    </LeaderboardStack.Navigator>
  );
};

const EventDetailsNavigator = () => {
  return (
    <EventDetailsTab.Navigator>
      <EventDetailsTab.Screen
        name="Players"
        component={PlayersTabNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
        }}
      />
      <EventDetailsTab.Screen
        name="Orders"
        component={OrdersTabNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="swap-horizontal" color={color} />
          ),
        }}
      />
      <EventDetailsTab.Screen
        name="Holdings"
        component={HoldingsTabNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="trending-up" color={color} />
          ),
        }}
      />
      <EventDetailsTab.Screen
        name="Activity"
        component={ActivityTabNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="flash" color={color} />,
        }}
      />
      <EventDetailsTab.Screen
        name="Leaderboard"
        component={LeaderboardTabNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="trophy" color={color} />,
        }}
      />
    </EventDetailsTab.Navigator>
  );
};

export default EventDetailsNavigator;
