import Colors from '../constants/Colors';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default class DeckScreen extends React.Component {
  static navigationOptions = {
    headerTintColor: Colors.headerTintColor,
    headerStyle: {
      backgroundColor: Colors.headerStyle.backgroundColor,
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View>
            <Text>Press <Text style={{fontStyle: 'italic'}}>Add Deck</Text> to add a deck!</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
