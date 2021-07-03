import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  label: string;
  onPress: () => void;
  isSelected?: boolean;
}

export const SheetListItem = ({
  label,
  onPress,
  isSelected = false,
}: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.touchable, isSelected && styles.touchableSelected]}
      >
        <Text style={styles.labelText}>{label}</Text>
        {isSelected && (
          <Ionicons
            name="checkmark-circle-outline"
            style={styles.selectedIcon}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 4,
  },
  touchable: {
    flexDirection: 'row',
    height: 32,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 4,
  },
  touchableSelected: {
    backgroundColor: '#eeeeee',
  },
  labelText: {
    fontSize: 14,
    marginHorizontal: 8,
  },
  selectedIcon: {
    color: 'green',
    fontSize: 24,
    marginHorizontal: 8,
  },
});
