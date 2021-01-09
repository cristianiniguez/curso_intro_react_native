import React, {Component} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import http from '../../libs/http';

class CoinsScreen extends Component {
  componentDidMount = async () => {
    const coins = await http.instance.get(
      'https://api.coinlore.net/api/tickers/',
    );
    console.log(coins);
  };

  handlePress = () => {
    this.props.navigation.navigate('CoinDetail');
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Coins Screen</Text>
        <Pressable style={styles.btn} onPress={this.handlePress}>
          <Text style={styles.btnText}>Ir a Detail</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
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
});

export default CoinsScreen;
