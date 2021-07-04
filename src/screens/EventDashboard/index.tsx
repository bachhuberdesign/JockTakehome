import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import * as staticNbaEventData from '../../../assets/data/nba_event.json';
import { EventCard } from '../../components';
import { Event, RootStackParams } from '../../types';

interface Props {
  navigation: StackNavigationProp<RootStackParams, 'EventDashboard'>;
}

interface EventResponse {
  events: Event[];
}

const transformStaticDataToEventArray = (): EventResponse => {
  return {
    events: [staticNbaEventData.event],
  };
};

export const EventDashboard: React.FC<Props> = ({ navigation }) => {
  const [events, setEvents] = useState<Event[] | null>(null);

  // This is just a mock of what could be done if we had an actual API call here,
  // rather than the static nba_event.json
  const fetchEvents = async () => {
    try {
      const response = transformStaticDataToEventArray();

      setEvents(response.events);
    } catch (error) {
      // TODO: Could have some sort of global error handler/logger call here
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    // This screen is only here so we can have slightly more complex navigation
    <View style={styles.container}>
      <Text style={styles.titleText}>Your Events</Text>
      <Text style={styles.subtitleText}>
        Events you're watching and participating in
      </Text>
      <View style={{ marginTop: 16 }} />
      {/* This should probably be a vertical FlatList with horizontal scrolling sections
          for events. This is just a placeholder for the takehome test */}
      {events?.map(event => {
        return (
          <EventCard
            key={event.id}
            name={event.name}
            status={event.status}
            description={event.description}
            onPress={() => navigation.navigate('EventDetails')}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#eeeeee',
    padding: 16,
  },
  titleText: {
    fontWeight: '600',
  },
  subtitleText: {
    fontSize: 12,
  },
});
