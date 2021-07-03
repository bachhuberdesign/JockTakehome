import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, ListRenderItemInfo, TextInput, View } from 'react-native';
import { sortBy } from 'lodash';

import { TradeablesEntity } from '../../types';
import * as staticNbaEventData from '../../../assets/data/nba_event.json';
import { useCallback } from 'react';
import { TradeableCard } from '../../components/TradeableCard';

enum TradeableSortType {
  PointsProjected = 'pointsProjected',
  PointsScored = 'pointsScored',
  PriceEstimated = 'priceEstimated',
}

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
  const [sortType, setSortType] = useState<TradeableSortType>(
    TradeableSortType.PointsProjected
  );

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

  const sortedTradeables = useMemo(() => {
    switch (sortType) {
      case TradeableSortType.PointsProjected:
        return sortBy(
          tradeables,
          (tradeable: TradeablesEntity) => tradeable.points.projected
        );
      case TradeableSortType.PointsScored:
        return sortBy(
          tradeables,
          (tradeable: TradeablesEntity) => tradeable.points.scored
        );
      case TradeableSortType.PriceEstimated:
        return sortBy(
          tradeables,
          (tradeable: TradeablesEntity) => tradeable.price.estimated
        );
      default:
        return sortBy(
          tradeables,
          (tradeable: TradeablesEntity) => tradeable.points.projected
        );
    }
  }, [tradeables, sortType]);

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
        data={sortedTradeables}
        keyExtractor={item => `${item.id}`}
        renderItem={renderTradeable}
        ItemSeparatorComponent={renderSeparator}
      />
    </View>
  );
};
