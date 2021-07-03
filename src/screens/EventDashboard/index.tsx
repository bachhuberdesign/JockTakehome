import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import * as staticNbaEventData from '../../../assets/data/nba_event.json';
import { EventCard } from '../../components';
import { Event } from '../../types';

interface Props {}

interface EventResponse {
  events: Event[];
}

const transformStaticDataToEventArray = (): EventResponse => {
  return {
    events: [staticNbaEventData.event],
  };
};

export const EventDashboard: React.FC<Props> = props => {
  const navigation = useNavigation();
  const [events, setEvents] = useState<Event[] | null>(null);

  // This is just a mock of what could be done if we had an actual API call here,
  // rather than the static nba_event.json
  const fetchEvents = async () => {
    try {
      console.log('about to fetch');

      const response = transformStaticDataToEventArray();

      setEvents(response.events);
    } catch (error) {
      // TODO: Add some sort of global error handler
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>Your Events</Text>
        <Text>Events you're watching and participating in</Text>
        <View style={{ marginTop: 16 }} />
        {events?.map(event => {
          return (
            <EventCard
              key={event.id}
              name={event.name}
              description={event.description}
              onPress={() => navigation.navigate('EventDetails')}
            />
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
});
