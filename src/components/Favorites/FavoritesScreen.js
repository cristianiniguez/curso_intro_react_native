import React, {Component} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';

import FavoritesEmptyState from './FavoritesEmptyState';
import CoinsItem from '../Coins/CoinsItem';

import colors from 'cryptoTracker/src/res/colors';
import storage from 'cryptoTracker/src/libs/storage';

class FavoritesScreen extends Component {
  state = {
    favorites: [],
  };

  getFavorites = async () => {
    try {
      const allKeys = await storage.instance.getAllKeys();
      const favKeys = allKeys.filter((key) => key.includes('favorite-'));
      const favsStr = await storage.instance.getAll(favKeys);
      const favorites = favsStr.map((favStr) => JSON.parse(favStr[1]));
      this.setState({favorites});
    } catch (error) {
      console.log('get favorites error', error);
    }
  };

  handlePress = (coin) => {
    this.props.navigation.navigate('CoinDetail', {coin});
  };

  componentDidMount() {
    this.getFavorites();
    this.props.navigation.addListener('focus', this.getFavorites);
  }

  componentWillUnmount() {
    this.props.navigation.removeListener('focus', this.getFavorites);
  }

  render() {
    const {favorites} = this.state;

    return (
      <View style={styles.container}>
        {favorites.length === 0 ? (
          <FavoritesEmptyState />
        ) : (
          <FlatList
            data={favorites}
            renderItem={({item}) => (
              <CoinsItem item={item} onPress={() => this.handlePress(item)} />
            )}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.charade,
    flex: 1,
  },
});

export default FavoritesScreen;
