import { getDecks } from "../actions/decks";
import Colors from '../constants/Colors';
import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';

class DeckScreen extends Component {
  static navigationOptions = {
    headerTintColor: Colors.headerTintColor,
    headerStyle: {
      backgroundColor: Colors.headerStyle.backgroundColor,
    }
  };

  componentDidMount() {
    this.props.dispatch(getDecks());
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View>
            {
              this.props.decks ?
                  <Text>{JSON.stringify(this.props.decks)}</Text>
              :
                  <Text>Press <Text style={{fontStyle: 'italic'}}>Add Deck</Text> to add a deck!</Text>
            }
          </View>
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps({decks}) {
  return {
    decks,
  };
}

export default connect(mapStateToProps)(DeckScreen);

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
