import React, {Component} from 'react';
import {Text, View} from 'react-native';

class CoinDetailScreen extends Component {
  componentDidMount() {
    console.log(this.props.route.params);
  }

  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    );
  }
}

export default CoinDetailScreen;
