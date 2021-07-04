import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {}

export const PlaceholderScreen: React.FC<Props> = () => {
  return (
    <View style={styles.container}>
      <Text>This is a placeholder screen.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginTop: 16,
    alignItems: 'center',
  },
});
