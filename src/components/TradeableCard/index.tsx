import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { View, Text, TouchableOpacity } from 'react-native';
import currency from 'currency.js';

import { TradeablesEntity } from '../../types';

interface Props {
  tradeableEntity: TradeablesEntity;
  onPress: () => void;
}

export const TradeableCard = ({ tradeableEntity, onPress }: Props) => {
  const { points, price, rank } = tradeableEntity;
  const {
    first_name: firstName,
    last_name: lastName,
    image_url: imageUrl,
    position,
  } = tradeableEntity.entity;

  const displayName = `${firstName[0]}. ${lastName}`;

  return (
    <View style={styles.card}>
      {/* Avatar */}
      <TouchableOpacity onPress={onPress} style={styles.playerImageContainer}>
        <Image source={{ uri: imageUrl }} style={styles.playerImage} />
      </TouchableOpacity>

      {/* Player info */}
      <TouchableOpacity style={styles.playerContainer} onPress={onPress}>
        <Text style={styles.playerNameText}>
          {displayName}
          <Text style={styles.playerPositionText}>{` ${position}`}</Text>
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.fpsText}>
            {`${points.projected || 0} FPS `}
            <Text style={styles.fpsSubText}>PROJ</Text>
          </Text>

          <Text style={styles.fpsText}>
            {` ${points.scored || 0} FPS `}
            <Text style={styles.fpsSubText}>SCOR</Text>
          </Text>
        </View>
      </TouchableOpacity>

      {/* Price info */}
      <TouchableOpacity style={styles.priceContainer} onPress={onPress}>
        <View style={styles.priceButton}>
          <Text style={{ color: 'white', textAlign: 'center' }}>
            {currency(price.estimated || 1.0).format()}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 80,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  playerImageContainer: {
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerImage: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    borderWidth: 1,
    borderColor: '#eeeeee',
  },
  playerContainer: {
    flexGrow: 3,
    marginVertical: 16,
    justifyContent: 'space-around',
  },
  playerNameText: {
    fontWeight: '600',
  },
  playerPositionText: {
    color: 'gray',
  },
  priceContainer: {
    margin: 8,
  },
  priceButton: {
    alignSelf: 'flex-end',
    backgroundColor: 'black',
    borderRadius: 4,
    height: 32,
    justifyContent: 'center',
    width: 72,
  },
  fpsText: {
    fontSize: 12,
  },
  fpsSubText: {
    color: 'gray',
  },
});
