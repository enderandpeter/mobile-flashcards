import { styles as textStyles } from '../components/StyledText';
import TabBarIcon from '../components/TabBarIcon';
import { DECK_NAME_MAX_LENGTH } from '../constants/Validation';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { AddDeckHeaderText, LargeButtonText } from "../components/StyledText";
import { addDeck, updateDeck } from "../actions/decks";

class AddDeckScreen extends React.Component {
  static navigationOptions = {
    title: 'Add Deck',
    tabBarLabel: 'Add Deck',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name='ios-add-circle'
        />
    )
  };
  state = {text: ''}
  constructor(props){
    super(props);
    this.state = {
      text: this.props.deck ? this.props.deck.title : ''
    };
  }
  handleTextChange(text){
    this.setState((currentState) => {
      if(text.length > DECK_NAME_MAX_LENGTH){
        text = text.slice(0, DECK_NAME_MAX_LENGTH);
      }

      return {
        text
      };
    });
  }
  handleSubmit(){
    const title = this.state.text;
    const { deckId } = this.props;

    if(!(title.trim().length)){
      return;
    }

    if(deckId){
      this.props.dispatch(updateDeck({ deckId, title }))
          .then((deck) => {
            this.setState({text: ''});
            this.props.navigation.goBack();
          });
    } else {
      this.props.dispatch(addDeck({ title }))
          .then((deck) => {
            this.setState({text: ''});
            const deckId = title;
            this.props.navigation.navigate(
                'DeckView',
                { deckId }
            );
          });
    }

  }
  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.center}>
        <AddDeckHeaderText>Enter Deck Title</AddDeckHeaderText>
        <View style={styles.textInputContainer}>
          <TextInput
              maxLength={DECK_NAME_MAX_LENGTH}
              value={this.state.text ? this.state.text : this.props.deckId}
              onChangeText={(text) => this.handleTextChange.bind(this, text)()}
              autoFocus={true}
              style={styles.textInput}
          />
        </View>
        <TouchableOpacity
            style={textStyles.largeButton}
            onPress={this.handleSubmit.bind(this)}
        >
          <LargeButtonText>Submit</LargeButtonText>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ decks }, { navigation }) => {
  let deckId = '';

  if(navigation.state.params && navigation.state.params.deckId){
    deckId = navigation.state.params.deckId;
  }

  return {
    deckId
  };
}

export default connect(mapStateToProps)(AddDeckScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  },
  center: {
    alignItems: 'center'
  },
  textInputContainer: {
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    width: '80%'
  },
  textInput: {
    fontSize: 18
  }
});
