import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
  name: string;
  description: string;
  onPress: () => void;
}

export const EventCard = ({ name, description, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Text style={{ color: 'black' }}>{name}</Text>
      <Text>{description}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 50,
    height: 50,
  },
});
