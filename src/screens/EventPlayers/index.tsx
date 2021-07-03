import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from 'react';
import {
  Button,
  FlatList,
  ListRenderItemInfo,
  Text,
  TextInput,
  View,
  StyleSheet,
} from 'react-native';
import { orderBy } from 'lodash';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  TouchableOpacity,
} from '@gorhom/bottom-sheet';

import { TradeablesEntity } from '../../types';
import * as staticNbaEventData from '../../../assets/data/nba_event.json';
import { TradeableCard } from '../../components/TradeableCard';

enum TradeableSortType {
  PointsProjected = 'pointsProjected',
  PointsScored = 'pointsScored',
  PriceEstimated = 'priceEstimated',
}

enum SortDirection {
  Ascending = 'asc',
  Descending = 'desc',
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
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [tradeables, setTradeables] = useState<TradeablesEntity[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [sortType, setSortType] = useState<TradeableSortType>(
    TradeableSortType.PointsProjected
  );
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    SortDirection.Descending
  );

  const snapPoints = useMemo(() => ['25%', '50%'], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

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
        return orderBy(
          tradeables,
          (tradeable: TradeablesEntity) => tradeable.points.projected || 0,
          sortDirection
        );
      case TradeableSortType.PointsScored:
        return orderBy(
          tradeables,
          (tradeable: TradeablesEntity) => tradeable.points.scored || 0,
          sortDirection
        );
      case TradeableSortType.PriceEstimated:
        return orderBy(
          tradeables,
          (tradeable: TradeablesEntity) => tradeable.price.estimated || 0,
          sortDirection
        );
      default:
        return orderBy(
          tradeables,
          (tradeable: TradeablesEntity) => tradeable.points.projected || 0,
          sortDirection
        );
    }
  }, [tradeables, sortType, sortDirection]);

  const onSearchTextChanged = (text: string) => {
    setSearchText(text);
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  return (
    <BottomSheetModalProvider>
      <View>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={onSearchTextChanged}
          value={searchText}
        />
        <Button
          onPress={handlePresentModalPress}
          title="Present Modal"
          color="black"
        />
        <FlatList
          data={sortedTradeables}
          keyExtractor={item => `${item.id}`}
          renderItem={renderTradeable}
          ItemSeparatorComponent={renderSeparator}
        />

        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <View style={styles.bottomSheetContainer}>
            <Text>Sort by</Text>
            <TouchableOpacity
              onPress={() => setSortType(TradeableSortType.PointsProjected)}
            >
              <Text>Projected FPS</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSortType(TradeableSortType.PointsScored)}
            >
              <Text>Scored FPS</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSortType(TradeableSortType.PriceEstimated)}
            >
              <Text>Price</Text>
            </TouchableOpacity>
            <Text>Order by</Text>
            <TouchableOpacity
              onPress={() => setSortDirection(SortDirection.Descending)}
            >
              <Text>Descending</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setSortDirection(SortDirection.Ascending)}
            >
              <Text>Ascending</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  bottomSheetContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
