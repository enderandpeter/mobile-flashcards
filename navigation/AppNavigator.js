import Colors from '../constants/Colors';
import AddCard from '../screens/AddCard';
import DeckView from '../screens/DeckView';
import StartQuiz from '../screens/StartQuiz';
import CardScreen from '../screens/CardScreen';
import SettingsScreen from '../screens/SettingsScreen';
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
      },
      AddCard: {
        screen: AddCard
      },
      CardScreen: {
        screen: CardScreen
      },
      SettingsScreen: {
          screen: SettingsScreen
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