import Colors from '../constants/Colors';
import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

export default createAppContainer(createStackNavigator(
    {
      Main: {
        screen: MainTabNavigator,
      },
    },
    {
      headerMode: 'none'
    }
));