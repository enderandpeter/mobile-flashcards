import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import DeskScreen from '../screens/DeskScreen';
import AddDeckScreen from '../screens/AddDeckScreen';

const Deck = createStackNavigator({
  Deck: DeskScreen,
});

Deck.navigationOptions = {
  tabBarLabel: 'Decks',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='ios-albums'
    />
  ),
};

const DeckAdd = createStackNavigator({
  DeckAdd: AddDeckScreen,
});

DeckAdd.navigationOptions = {
  tabBarLabel: 'Add Deck',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='ios-add-circle'
    />
  ),
};

export default createBottomTabNavigator({
   Deck,
   DeckAdd
});
