import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  Text,
  TextInput,
  View,
  StyleSheet,
} from 'react-native';
import { filter, orderBy } from 'lodash';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';

import { TradeablesEntity } from '../../types';
import * as staticNbaEventData from '../../../assets/data/nba_event.json';
import { TradeableCard } from '../../components/TradeableCard';
import { SheetListItem } from '../../components/SheetListItem';

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
    const toFilter = searchText.replace(/[^A-Za-z0-9]/g, '').toLowerCase();

    const filtered = filter(
      tradeables,
      (tradeable: TradeablesEntity) =>
        // Because we are dipslaying names like "S. Curry", we need to make sure
        // that the user can search both "S. Curry" as well as "Stephen Curry"
        tradeable.entity.name
          .replace(/[^A-Za-z0-9]/g, '')
          .toLowerCase()
          .includes(toFilter) ||
        `${tradeable.entity.first_name[0]}${tradeable.entity.last_name}`
          .replace(/[^A-Za-z0-9]/g, '')
          .toLowerCase()
          .includes(toFilter)
    );

    let orderFunction;
    if (sortType === TradeableSortType.PriceEstimated) {
      orderFunction = (tradeable: TradeablesEntity) =>
        tradeable.price.estimated || 0;
    } else if (sortType === TradeableSortType.PointsScored) {
      orderFunction = (tradeable: TradeablesEntity) =>
        tradeable.points.scored || 0;
    } else {
      // default to PointsProjected sorting
      orderFunction = (tradeable: TradeablesEntity) =>
        tradeable.points.projected || 0;
    }

    return orderBy(filtered, orderFunction, sortDirection);
  }, [tradeables, sortType, sortDirection, searchText]);

  const onSearchTextChanged = (text: string) => {
    setSearchText(text);
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  return (
    <BottomSheetModalProvider>
      <>
        <View style={{ margin: 16, flexDirection: 'row' }}>
          <TextInput
            placeholder="Search players by name"
            style={{
              height: 32,
              flexGrow: 1,
              marginEnd: 4,
            }}
            onChangeText={onSearchTextChanged}
            value={searchText}
          />
          <Ionicons
            name="options"
            onPress={handlePresentModalPress}
            size={24}
            style={{ alignSelf: 'center' }}
          />
        </View>

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
            <Text style={styles.bottomSheetHeaderText}>Sort by</Text>

            <SheetListItem
              label="Projected FPS"
              onPress={() => setSortType(TradeableSortType.PointsProjected)}
              isSelected={sortType === TradeableSortType.PointsProjected}
            />
            <SheetListItem
              label="Scored FPS"
              onPress={() => setSortType(TradeableSortType.PointsScored)}
              isSelected={sortType === TradeableSortType.PointsScored}
            />
            <SheetListItem
              label="Price"
              onPress={() => setSortType(TradeableSortType.PriceEstimated)}
              isSelected={sortType === TradeableSortType.PriceEstimated}
            />

            <Text style={styles.bottomSheetHeaderText}>Order by</Text>

            <SheetListItem
              label="Descending"
              onPress={() => setSortDirection(SortDirection.Descending)}
              isSelected={sortDirection === SortDirection.Descending}
            />

            <SheetListItem
              label="Ascending"
              onPress={() => setSortDirection(SortDirection.Ascending)}
              isSelected={sortDirection === SortDirection.Ascending}
            />
          </View>
        </BottomSheetModal>
      </>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  bottomSheetContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  bottomSheetHeaderText: {
    fontWeight: 'bold',
    marginVertical: 8,
  },
});
