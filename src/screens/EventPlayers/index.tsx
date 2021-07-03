import React, { useEffect, useState } from 'react';
import { FlatList, ListRenderItemInfo, TextInput, View } from 'react-native';

import { TradeablesEntity } from '../../types';
import * as staticNbaEventData from '../../../assets/data/nba_event.json';
import { useCallback } from 'react';
import { TradeableCard } from '../../components/TradeableCard';

interface Props {}

interface TradeableResponse {
  tradeables: TradeablesEntity[];
}

const transformStaticDataToTradeablesArray = (): TradeableResponse => {
  return {
    tradeables: staticNbaEventData.event.tradeables,
  };
};

export const EventPlayers: React.FC<Props> = props => {
  const [tradeables, setTradeables] = useState<TradeablesEntity[]>([]);
  const [searchText, setSearchText] = useState<string>('');

  const fetchPlayers = async () => {
    try {
      const response = transformStaticDataToTradeablesArray();

      setTradeables(response.tradeables);
    } catch (error) {}
  };

  const renderTradeable = useCallback(
    ({ item }: ListRenderItemInfo<TradeablesEntity>) => {
      const onPress = () => {
        alert(JSON.stringify(item));
      };

      return <TradeableCard tradeableEntity={item} onPress={onPress} />;
    },
    []
  );

  const renderSeparator = useCallback(() => {
    return <View style={{ marginTop: 8 }} />;
  }, []);

  const onSearchTextChanged = (text: string) => {
    setSearchText(text);
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  return (
    <View>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={onSearchTextChanged}
        value={searchText}
      />
      <FlatList
        data={tradeables}
        keyExtractor={item => `${item.id}`}
        renderItem={renderTradeable}
        ItemSeparatorComponent={renderSeparator}
      />
    </View>
  );
};
