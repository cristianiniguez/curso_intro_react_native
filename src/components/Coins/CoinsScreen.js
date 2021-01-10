import React, {Component} from 'react';
import {View, ActivityIndicator, FlatList, StyleSheet} from 'react-native';

import CoinsSearch from './CoinsSearch';
import CoinsItem from './CoinsItem';

import colors from 'cryptoTracker/src/res/colors';
import http from 'cryptoTracker/src/libs/http';

class CoinsScreen extends Component {
  state = {
    coins: [],
    allCoins: [],
    loading: false,
  };

  componentDidMount() {
    this.getCoins();
  }

  getCoins = async () => {
    this.setState({loading: true});

    const res = await http.instance.get(
      'https://api.coinlore.net/api/tickers/',
    );

    this.setState({
      coins: res.data,
      allCoins: res.data,
      loading: false,
    });
  };

  handlePress = (coin) => {
    this.props.navigation.navigate('CoinDetail', {coin});
  };

  handleSearch = (query) => {
    const {allCoins} = this.state;

    const filteredCoins = allCoins.filter((coin) => {
      return (
        coin.name.match(new RegExp(query, 'i')) ||
        coin.symbol.match(new RegExp(query, 'i'))
      );
    });

    this.setState({coins: filteredCoins});
  };

  render() {
    const {coins, loading} = this.state;
    return (
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator color="white" size="large" style={styles.loader} />
        ) : (
          <>
            <CoinsSearch onChange={this.handleSearch} />
            <FlatList
              data={coins}
              renderItem={({item}) => (
                <CoinsItem item={item} onPress={() => this.handlePress(item)} />
              )}
            />
          </>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.charade,
  },
  titleText: {
    color: 'white',
    textAlign: 'center',
  },
  btn: {
    padding: 8,
    backgroundColor: 'blue',
    borderRadius: 8,
    margin: 16,
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
  },
  loader: {
    marginTop: 60,
  },
});

export default CoinsScreen;
