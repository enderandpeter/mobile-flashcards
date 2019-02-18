import { styles as textStyles } from '../components/StyledText';
import { CARD_MAX_LENGTH } from '../constants/Validation';
import React from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import {
  AddCardHeaderText,
  LargeButtonText,
  DeleteCardText
} from "../components/StyledText";
import { addCard, updateCard, deleteCard, deleteDeck } from "../actions/decks";

class AddCard extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Add Card',
  });
  state = {question: '', answer: ''}
  constructor(props){
    super(props);
    this.state = {
      question : this.props.question ? this.props.question : '',
      answer : this.props.answer ? this.props.answer : ''
    };
  }
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

    if(!(question.trim().length && answer.trim().length)){
      return;
    }

    if(this.props.cardIndex){
      const { id, cardIndex } = this.props;
      this.props.dispatch(updateCard({ question, answer, id, deckId, cardIndex }))
          .then((deck) => {
            this.props.navigation.navigate(
                'DeckView',
                { deckId }
            );
          });
    } else {
      this.props.dispatch(addCard({ question, answer, deckId }))
          .then((deck) => {
            this.props.navigation.navigate(
                'DeckView',
                { deckId }
            );
          });
    }
  }
  handleDeleteCard(){
    const { deckId, id } = this.props;

    Alert.alert(
        'Delete this card?',
        `Would you like to delete this card?`,
        [
          {
            text: 'Yes',
            onPress: () => {
              this.props.dispatch(deleteCard({ deckId, id }))
                  .then((deck) => {
                    this.props.navigation.goBack();
                  });
            }
          },
          {
            text: 'Cancel',
            onPress: () => {
              // Do nothing
            },
            style: 'cancel'
          }
        ]
    );
  }
  render() {
    return (
        <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.center}>
          <AddCardHeaderText>Enter Card Question and Answer</AddCardHeaderText>
          <View style={styles.textInputContainer}>
            <TextInput
                maxLength={CARD_MAX_LENGTH}
                value={this.state.question ? this.state.question : this.props.question}
                onChangeText={(text) => this.handleTextChange.bind(this, {type: 'question', text})()}
                autoFocus={true}
                style={styles.textInput}
                placeholder='Question'
            />
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
                maxLength={CARD_MAX_LENGTH}
                value={this.state.answer ? this.state.answer : this.props.answer}
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
          <View style={{height: '50%'}}></View>
          <TouchableOpacity
              onPress={this.handleDeleteCard.bind(this)}
          >
            <DeleteCardText>Delete Card</DeleteCardText>
          </TouchableOpacity>
      </ScrollView>

        </View>
    );
  }
}

const mapStateToProps = ({ decks }, { navigation }) => {
  const { deckId, cardIndex } = navigation.state.params;
  let question = '';
  let answer = '';
  let id = '';
  let card = null;

  if(cardIndex){
    card = decks[deckId].questions[cardIndex];
    question = card.question;
    answer = card.answer;
    id = card.id;
  }

  return {
    deckId,
    cardIndex,
    question,
    answer,
    id
  };
};

export default connect(mapStateToProps)(AddCard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  center: {
    alignItems: 'center',
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
