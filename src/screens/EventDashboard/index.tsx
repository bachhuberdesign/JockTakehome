import React, { useEffect } from 'react';
import { useState } from 'react';
import { Text, View } from 'react-native';
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
  const [events, setEvents] = useState<Event[] | null>(null);

  // This is just a mock of what could be done if we had an actual API call here,
  // rather than the static nba_event.json
  const fetchEvents = async () => {
    try {
      const response = transformStaticDataToEventArray();

      if (response?.events?.length > 0) {
        setEvents(response.events);
      }
    } catch (error) {
      // TODO: Add some sort of global error handler
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <SafeAreaView>
      {events?.map(event => {
        <EventCard
          name={event.name}
          description={event.description}
          onPress={() => {
            alert('test');
          }}
        />;
      })}
    </SafeAreaView>
  );
};
