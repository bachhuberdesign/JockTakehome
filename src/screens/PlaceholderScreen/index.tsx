import React from 'react';
import { Text, View } from 'react-native';

interface Props {}

export const PlaceholderScreen: React.FC<Props> = props => {
  return (
    <View>
      <Text>This is a placeholder screen.</Text>
    </View>
  );
};
