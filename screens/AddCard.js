import { styles as textStyles } from '../components/StyledText';
import { CARD_MAX_LENGTH } from '../constants/Validation';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { AddCardHeaderText, LargeButtonText } from "../components/StyledText";
import { addCard } from "../actions/decks";

class AddCard extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Add Card',
  });
  state = {question: '', answer: ''}
  handleTextChange({ type, text }){
    this.setState((currentState) => {
      if(text.length > CARD_MAX_LENGTH){
        text = text.slice(0, CARD_MAX_LENGTH);
      }

      return {
        [type]: text
      };
    });
  }
  handleSubmit(){
    const { question, answer } = this.state;
    const { deckId } = this.props;

    if(!(question.length && answer.length)){
      return;
    }

    this.props.dispatch(addCard({ question, answer, deckId }))
        .then((deck) => {
          this.props.navigation.navigate(
              'DeckView',
              { deckId }
          );
    });
  }
  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.center}>
        <AddCardHeaderText>Enter Card Question and Answer</AddCardHeaderText>
        <View style={styles.textInputContainer}>
          <TextInput
              maxLength={CARD_MAX_LENGTH}
              value={this.state.question}
              onChangeText={(text) => this.handleTextChange.bind(this, {type: 'question', text})()}
              autoFocus={true}
              style={styles.textInput}
              placeholder='Question'
          />
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
              maxLength={CARD_MAX_LENGTH}
              value={this.state.answer}
              onChangeText={(text) => this.handleTextChange.bind(this, {type: 'answer', text})()}
              style={styles.textInput}
              placeholder='Answer'
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
  const { deckId } = navigation.state.params;

  return {
    deckId
  };
};

export default connect(mapStateToProps)(AddCard);

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
    width: '80%',
    marginBottom: 20
  },
  textInput: {
    fontSize: 18
  }
});
