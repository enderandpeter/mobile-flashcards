import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';

import DeckScreen from '../screens/DeckScreen';
import AddDeckScreen from '../screens/AddDeckScreen';

export default createBottomTabNavigator({
   Deck: {
     screen: DeckScreen
   },
   DeckAdd: {
     screen: AddDeckScreen
   }
});
