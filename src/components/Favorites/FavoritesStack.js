import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import FavoritesScreen from './FavoritesScreen';
import colors from 'cryptoTracker/src/res/colors';

const Stack = createStackNavigator();

const FavoritesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: colors.blackPearl, shadowOpacity: 0},
        headerTintColor: colors.white,
      }}>
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
    </Stack.Navigator>
  );
};

export default FavoritesStack;
