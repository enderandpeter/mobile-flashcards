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
import { AddDeckHeaderText, LargeButtonText } from "../components/StyledText";

export default class AddDeckScreen extends React.Component {
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
  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.center}>
        <AddDeckHeaderText>Enter Deck Title</AddDeckHeaderText>
        <View style={styles.textInputContainer}>
          <TextInput
              maxLength={DECK_NAME_MAX_LENGTH}
              value={this.state.text}
              onChangeText={(text) => this.handleTextChange.bind(this, text)()}
              autoFocus={true}
              style={styles.textInput}
          />
        </View>
        <TouchableOpacity style={textStyles.largeButton}>
          <LargeButtonText>Submit</LargeButtonText>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

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
