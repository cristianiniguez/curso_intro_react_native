import React from 'react';
import {Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import CoinsStack from './src/components/Coins/CoinsStack';

import colors from 'cryptoTracker/src/res/colors';

const Tabs = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        tabBarOptions={{
          tintColor: '#fefefe',
          // activeTintColor: ''
          style: {
            backgroundColor: colors.blackPearl,
          },
        }}>
        <Tabs.Screen
          name="Coins"
          component={CoinsStack}
          options={{
            tabBarIcon: ({size, color}) => (
              <Image
                source={require('cryptoTracker/src/assets/bank.png')}
                style={{tintColor: color, width: size, height: size}}
              />
            ),
          }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

export default App;
