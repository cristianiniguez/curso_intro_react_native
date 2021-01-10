import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  SectionList,
  FlatList,
  StyleSheet,
} from 'react-native';

import CoinMarketItem from './CoinMarketItem';

import colors from 'cryptoTracker/src/res/colors';
import http from 'cryptoTracker/src/libs/http';

class CoinDetailScreen extends Component {
  state = {
    markets: [],
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

  componentDidMount() {
    const {coin} = this.props.route.params;
    this.props.navigation.setOptions({title: coin.symbol});
    this.getMarkets(coin.id);
  }

  render() {
    const {coin} = this.props.route.params;
    const {markets} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.subHeader}>
          <Image
            style={styles.iconImg}
            source={{uri: this.getSymbolIcon(coin.nameid)}}
          />
          <Text style={styles.titleText}>{coin.name}</Text>
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
  subHeader: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding: 16,
    flexDirection: 'row',
  },
  iconImg: {
    width: 16,
    height: 16,
  },
  titleText: {
    fontSize: 16,
    color: '#fff',
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
  sectionItem: {
    padding: 8,
  },
  itemText: {
    color: '#fff',
    fontSize: 14,
  },
  sectiontext: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  marketsTitle: {
    color: '#fff',
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