import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  SectionList,
  FlatList,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';

import CoinMarketItem from './CoinMarketItem';

import colors from 'cryptoTracker/src/res/colors';
import http from 'cryptoTracker/src/libs/http';
import storage from 'cryptoTracker/src/libs/storage';

class CoinDetailScreen extends Component {
  state = {
    markets: [],
    isFavorite: false,
  };

  getSymbolIcon = (coinNameId) => {
    if (coinNameId) {
      return `https://c1.coinlore.com/img/16x16/${coinNameId}.png`;
    }
  };

  getSections = (coin) => {
    const sections = [
      {
        title: 'Market cap',
        data: [coin.market_cap_usd],
      },
      {
        title: 'Volume 24h',
        data: [coin.volume24],
      },
      {
        title: 'Change 24h',
        data: [coin.percent_change_24h],
      },
    ];
    return sections;
  };

  getMarkets = async (coinId) => {
    const URL = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;
    const markets = await http.instance.get(URL);
    this.setState({markets});
  };

  toggleFavorite = () => {
    if (this.state.isFavorite) {
      Alert.alert('Remove favorite', 'Are you sure?', [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Remove',
          onPress: this.removeFavorite,
          style: 'destructive',
        },
      ]);
    } else {
      this.addFavorite();
    }
  };

  getFavorite = async () => {
    const {coin} = this.props.route.params;
    const key = `favorite-${coin.id}`;

    try {
      const coinStr = await storage.instance.get(key);
      console.log(coinStr);
      this.setState({isFavorite: !!coinStr});
    } catch (error) {
      console.log('get favorite error', error);
    }
  };

  addFavorite = async () => {
    const {coin} = this.props.route.params;
    const coinStr = JSON.stringify(coin);
    const key = `favorite-${coin.id}`;

    const stored = await storage.instance.store(key, coinStr);

    if (stored) {
      this.setState({isFavorite: true});
    }
  };

  removeFavorite = async () => {
    const {coin} = this.props.route.params;
    const key = `favorite-${coin.id}`;

    const removed = await storage.instance.remove(key);

    if (removed) {
      this.setState({isFavorite: false});
    }
  };

  componentDidMount() {
    const {coin} = this.props.route.params;
    this.props.navigation.setOptions({title: coin.symbol});
    this.getMarkets(coin.id);
    this.getFavorite();
  }

  render() {
    const {coin} = this.props.route.params;
    const {markets, isFavorite} = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.subHeader}>
          <View style={styles.row}>
            <Image
              style={styles.iconImg}
              source={{uri: this.getSymbolIcon(coin.nameid)}}
            />
            <Text style={styles.titleText}>{coin.name}</Text>
          </View>
          <Pressable
            onPress={this.toggleFavorite}
            style={[
              styles.btnFavorite,
              isFavorite ? styles.btnFavoriteRemove : styles.btnFavoriteAdd,
            ]}>
            <Text style={styles.btnFavoriteText}>
              {isFavorite ? '× Remove from' : '+ Add to'} favorites
            </Text>
          </Pressable>
        </View>
        <SectionList
          style={styles.section}
          sections={this.getSections(coin)}
          keyExtractor={(item) => item}
          renderItem={({item}) => (
            <View style={styles.sectionItem}>
              <Text style={styles.itemText}>{item}</Text>
            </View>
          )}
          renderSectionHeader={({section}) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectiontext}>{section.title}</Text>
            </View>
          )}
        />
        <Text style={styles.marketsTitle}>Markets</Text>
        <FlatList
          style={styles.list}
          horizontal={true}
          data={markets}
          renderItem={({item}) => <CoinMarketItem item={item} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.charade,
  },
  row: {
    flexDirection: 'row',
  },
  subHeader: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconImg: {
    width: 16,
    height: 16,
  },
  titleText: {
    fontSize: 16,
    color: colors.white,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  section: {
    maxHeight: 220,
  },
  sectionHeader: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 8,
  },
  btnFavorite: {
    padding: 8,
    borderRadius: 8,
  },
  btnFavoriteAdd: {
    backgroundColor: colors.picton,
  },
  btnFavoriteRemove: {
    backgroundColor: colors.carmine,
  },
  btnFavoriteText: {
    color: colors.white,
  },
  sectionItem: {
    padding: 8,
  },
  itemText: {
    color: colors.white,
    fontSize: 14,
  },
  sectiontext: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  marketsTitle: {
    color: colors.white,
    fontSize: 16,
    marginBottom: 16,
    marginLeft: 16,
    fontWeight: 'bold',
  },
  list: {
    maxHeight: 100,
    paddingLeft: 16,
  },
});

export default CoinDetailScreen;
