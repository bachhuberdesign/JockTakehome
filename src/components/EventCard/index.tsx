import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface Props {
  name: string;
  description: string;
  status: string;
  onPress: () => void;
}

export const EventCard = ({ name, description, status, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Text style={styles.status}>{status}</Text>
      <Text style={styles.nameText}>{name}</Text>
      <Text style={styles.descriptionText}>{description}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 160,
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 8,
  },
  status: {
    textTransform: 'capitalize',
    marginBottom: 4,
  },
  nameText: {
    fontWeight: '600',
  },
  descriptionText: {
    fontWeight: '300',
  },
});
