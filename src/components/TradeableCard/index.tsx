import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, TouchableOpacity } from 'react-native';

import { TradeablesEntity } from '../../types';

interface Props {
  tradeableEntity: TradeablesEntity;
  onPress: () => void;
}

export const TradeableCard = ({ tradeableEntity, onPress }: Props) => {
  const { first_name: firstName, last_name: lastName } = tradeableEntity.entity;

  const displayName = `${firstName[0]}. ${lastName}`;

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Text>{displayName}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 96,
    backgroundColor: 'lightgray',
  },
});
