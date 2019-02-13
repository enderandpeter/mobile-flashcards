import { flipCard, nextCard } from '../actions/decks';
import { QuestionAndAnswerText, LargeButtonText, FlipCardText } from '../components/StyledText';
import Colors from '../constants/Colors';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View
} from 'react-native';


class StartQuiz extends Component {
    static navigationOptions = ({navigation}) => ({
       title: `${navigation.state.params.deckId} Quiz`
    })
    state = {
        qaText: this.props[this.props.show],
        qaButtonText: this.props.show === 'question' ? 'Answer' : 'Question',
        show: this.props.show
    }
    handleToggleQuestionAnswer(){
        const { deckId } = this.props;
        this.props.dispatch(flipCard({ deckId }))
            .then((deck) => {
                this.setState((currentState) => {
                    const show = deck.quiz.show;
                    return {
                        qaText: deck.questions[deck.quiz.cardIndex][show],
                        qaButtonText: show === 'question' ? 'Answer' : 'Question',
                        show
                    };
                });
            })
            .catch((error) => console.error(error));
    }
    handleNextCardButtons({ correct }){
        const { deckId } = this.props;

        this.props.dispatch(nextCard({ deckId, correct }))
            .then((deck) => {
                if(!deck.quiz.complete){
                    this.setState((currentState) => {
                        const show = 'question';
                        return {
                            qaText: deck.questions[deck.quiz.cardIndex].question,
                            qaButtonText: 'Answer',
                            show
                        };
                    });
                }
            })
            .catch((error) => console.error(error));
    }
    render(){
        return <View style={styles.container}>
            <View style={styles.progressContainer}>
                <Text>{this.props.cardIndex} / {this.props.numOfCards}</Text>
            </View>
            <View style={styles.mainContainer}>
                <QuestionAndAnswerText>
                    {this.state.qaText}
                </QuestionAndAnswerText>
                <TouchableOpacity
                    style={styles.toggleContainer}
                    onPress={this.handleToggleQuestionAnswer.bind(this)}
                >
                    <FlipCardText>
                        {this.state.qaButtonText}
                    </FlipCardText>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={[styles.largeButton, {backgroundColor: Colors.correctButtonBackground}]}
                onPress={this.handleNextCardButtons.bind(this, { 'correct': true})}
            >
                <LargeButtonText>Correct</LargeButtonText>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.largeButton, {backgroundColor: Colors.incorrectButtonBackground}]}
                onPress={this.handleNextCardButtons.bind(this, { 'correct': false})}
            >
                <LargeButtonText>Incorrect</LargeButtonText>
            </TouchableOpacity>
        </View>;
    }
}

const mapStateToProps = ({ decks }, { navigation }) => {
    const { deckId } = navigation.state.params;

    const questions = decks[deckId].questions;
    const numOfCards = Object.keys(questions).length;
    const quiz = decks[deckId].quiz;
    const cardIndex = quiz.cardIndex;
    const question = questions[cardIndex].question;
    const answer = questions[cardIndex].answer;
    const show = quiz.show;

    return {
        deckId,
        numOfCards,
        cardIndex,
        question,
        answer,
        show
    };
};

export default connect(mapStateToProps)(StartQuiz);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    progressContainer: {

    },
    toggleContainer: {
        alignItems: 'center'
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