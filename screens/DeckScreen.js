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
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={this.props.decks ? null : styles.centered}>
          <View>
            {
              this.props.decks ?
                    Object.keys(this.props.decks).map((deckId) => {
                      const numOfCards = this.props.decks[deckId].questions
                          ?
                            this.props.decks[deckId].questions.length
                          :
                            0;

                      const cardsNoun = numOfCards === 1 ? 'card' : 'cards';
                      return <TouchableOpacity style={styles.item} key={deckId}>
                          <View style={{alignItems: 'center'}}>
                            <Text style={styles.itemHeading}>{deckId}</Text>
                            <Text>{`${numOfCards} ${cardsNoun}`}</Text>
                          </View>
                        </TouchableOpacity>;
                    })
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
  centered: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  item: {
    backgroundColor: Colors.itemBackground,
    borderRadius: 16,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    alignItems: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
  },
  itemHeading: {
    fontSize: 30
  }
});
