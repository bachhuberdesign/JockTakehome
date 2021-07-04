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
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';

import {
  PlayersStackParams,
  SortDirection,
  TradeablesEntity,
  TradeableSortType,
} from '../../types';
import * as staticNbaEventData from '../../../assets/data/nba_event.json';
import { TradeableCard, SheetListItem } from '../../components';
import { StackNavigationProp } from '@react-navigation/stack';

interface Props {
  navigation: StackNavigationProp<PlayersStackParams, 'EventPlayers'>;
}

interface TradeableResponse {
  tradeables: TradeablesEntity[];
}

const transformStaticDataToTradeablesArray = (): TradeableResponse => {
  return {
    tradeables: staticNbaEventData.event.tradeables,
  };
};

export const EventPlayers: React.FC<Props> = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [tradeables, setTradeables] = useState<TradeablesEntity[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(true);
  const [sortType, setSortType] = useState<TradeableSortType>(
    TradeableSortType.PointsProjected
  );
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    SortDirection.Descending
  );

  const fetchPlayers = async () => {
    // Because we are just working with dummy/test data, we will simulate an API request by
    // wrapping the data call in a setTimeout() with a random time.
    // This is just to show that the loading indicator and pull to refresh exists.
    try {
      setLoading(true);

      setTimeout(() => {
        const response = transformStaticDataToTradeablesArray();

        setTradeables(response.tradeables);

        setLoading(false);
      }, Math.min(1500, Math.random() * 3 * 1000));
    } catch (error) {
      // TODO: Could have some sort of global error handler/logger call here
    }
  };

  const renderTradeable = useCallback(
    ({ item }: ListRenderItemInfo<TradeablesEntity>) => {
      const onPress = () => {
        alert(`Raw data for tradeable:\n\n${JSON.stringify(item)}`);
      };

      return <TradeableCard tradeableEntity={item} onPress={onPress} />;
    },
    []
  );

  const renderSeparator = useCallback(() => {
    return <View style={styles.separator} />;
  }, []);

  const renderListEmpty = useCallback(() => {
    if (tradeables.length === 0) {
      // Initial load, we should only show the "No Players" text after load completed
      return null;
    }

    return (
      <View style={styles.emptyListContainer}>
        <Text>No Players</Text>
      </View>
    );
  }, []);

  const sortedTradeables = useMemo(() => {
    const toFilter = searchText.replace(/[^A-Za-z0-9]/g, '').toLowerCase();

    const filtered = filter(
      tradeables,
      (tradeable: TradeablesEntity) =>
        // Because we are dipslaying names like "S. Curry", we need to make sure
        // that the user can search both "S. Curry" as well as "Stephen Curry"
        // Ideally we would also be able to search on other fields like `entity.position`
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

  const onFilterButtonPressed = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  useEffect(() => {
    fetchPlayers();
  }, []);

  return (
    <BottomSheetModalProvider>
      <>
        <View style={styles.searchInputContainer}>
          <TextInput
            placeholder="Search players by name"
            style={styles.searchInput}
            onChangeText={onSearchTextChanged}
            value={searchText}
          />
          <Ionicons
            name="options"
            onPress={onFilterButtonPressed}
            size={24}
            style={{ alignSelf: 'center' }}
          />
        </View>

        <FlatList
          data={sortedTradeables}
          keyExtractor={item => `${item.id}`}
          renderItem={renderTradeable}
          ItemSeparatorComponent={renderSeparator}
          ListEmptyComponent={renderListEmpty}
          refreshing={isLoading}
          onRefresh={fetchPlayers}
        />

        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={['25%', '50%']}
          backdropComponent={BottomSheetBackdrop}
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
  searchInput: {
    height: 32,
    flexGrow: 1,
    marginEnd: 4,
  },
  searchInputContainer: {
    margin: 16,
    flexDirection: 'row',
  },
  separator: {
    marginTop: 4,
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
