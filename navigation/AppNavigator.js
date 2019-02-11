import Colors from '../constants/Colors';
import DeckView from '../screens/DeckView';
import StartQuiz from '../screens/StartQuiz';
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
      },
      StartQuiz: {
        screen: StartQuiz
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