import {
    DeckPageHeadingText,
    LargeButtonText,
    DeleteDeckText,
    EditCardsText,
    styles as textStyles,
} from '../components/StyledText';
import Colors from '../constants/Colors';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-native';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View
} from 'react-native';
import { deleteDeck } from "../actions/decks";


class DeckView extends Component {
    static navigationOptions = ({navigation}) => ({
       title: navigation.state.params.deckId
    })
    handleAddCardClick(){
        const { deckId } = this.props;
        this.props.navigation.navigate(
            'AddCard',
            { deckId }
        );
    }
    handleStartQuizClick() {
        const { deckId } = this.props;
        this.props.navigation.navigate(
            'StartQuiz',
            { deckId }
        );
    }
    handlePromptDeleteDeck(){
        const { deckId } = this.props;
        Alert.alert(
            'Delete this deck?',
            `Would you like to delete ${deckId}?`,
            [
                {
                    text: 'Yes',
                    onPress: () => {
                        this.props.navigation.navigate(
                            'Deck',
                            {
                                deleteDeck: () => {
                                    this.props.dispatch(deleteDeck({ deckId }));
                                }
                            }
                        );
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
    handleEditCard(){
        const { deckId } = this.props;
        this.props.navigation.navigate(
            'CardScreen',
            { deckId }
        );
    }
    render(){
        return (
            <View style={styles.container}>
                <DeckPageHeadingText>{this.props.deckId}</DeckPageHeadingText>
                <Text>{`${this.props.numOfCards} ${this.props.cardsNoun}`}</Text>
                <View>
                    <TouchableOpacity
                        style={[textStyles.largeButton, {backgroundColor: Colors.addCardBackground}]}
                        onPress={this.handleAddCardClick.bind(this)}
                    >
                        <LargeButtonText>Add Card</LargeButtonText>
                    </TouchableOpacity>
                    {
                        this.props.numOfCards ? <TouchableOpacity
                            style={[styles.largeButton, {backgroundColor: Colors.startQuizBackground}]}
                            onPress={this.handleStartQuizClick.bind(this)}
                        >
                            <LargeButtonText>Start Quiz</LargeButtonText>
                        </TouchableOpacity> : null
                    }
                </View>
                <View style={{flexGrow: 0.25}}></View>
                {
                    this.props.numOfCards > 0 ? (
                        <TouchableOpacity
                            style={[textStyles.editCardsText, styles.bottom]}
                            onPress={this.handleEditCard.bind(this)}
                        >
                            <EditCardsText>Edit Cards</EditCardsText>
                        </TouchableOpacity>
                    ) : null
                }
                <View style={{flexGrow: 0.25}}></View>
                <TouchableOpacity
                    style={[textStyles.deleteDeckText, styles.bottom]}
                    onPress={this.handlePromptDeleteDeck.bind(this)}
                >
                    <DeleteDeckText>Delete Deck</DeleteDeckText>
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = ({ decks }, { navigation }) => {
    const { deckId } = navigation.state.params;

    const deck = decks[deckId];
    const { questions } = deck;

    const numOfCards = questions
        ?
            questions.length
        :
            0;

    const cardsNoun = numOfCards === 1 ? 'card' : 'cards';

    return {
        deckId,
        numOfCards,
        cardsNoun,
    };
};

export default connect(mapStateToProps)(DeckView);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        height: '100%'
    },
    largeButton: {
        borderRadius: 16,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        }
    }
});