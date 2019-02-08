import Colors from '../constants/Colors';
import DeckView from '../screens/DeckView';
import MainTabNavigator from './MainTabNavigator';
import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

export default createAppContainer(createStackNavigator(
    {
      Main: {
        screen: MainTabNavigator,
      },
      DeckView: {
        screen: DeckView
      }
    },
    {
      defaultNavigationOptions: {
        headerTintColor: Colors.headerTintColor,
        headerStyle: {
          backgroundColor: Colors.headerStyle.backgroundColor,
        }
      }
    }
));