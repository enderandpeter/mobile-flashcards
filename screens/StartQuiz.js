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
    render(){
        return <View style={styles.container}>
            <View style={styles.progressContainer}>
                <Text>{this.props.cardIndex} / {this.props.numOfCards}</Text>
            </View>
            <View style={styles.mainContainer}>
                <QuestionAndAnswerText>
                    {
                        this.props.show === 'question'
                        ?
                            this.props.question
                        :
                            this.props.answer
                    }
                </QuestionAndAnswerText>
                <FlipCardText>
                    {
                        this.props.show === 'question'
                            ?
                            'Answer'
                            :
                            'Question'
                    }
                </FlipCardText>
            </View>
            <TouchableOpacity style={[styles.largeButton, {backgroundColor: Colors.correctButtonBackground}]}>
                <LargeButtonText>Correct</LargeButtonText>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.largeButton, {backgroundColor: Colors.incorrectButtonBackground}]}>
                <LargeButtonText>Incorrect</LargeButtonText>
            </TouchableOpacity>
        </View>;
    }
}

const mapStateToProps = ({ questions, quiz }, { navigation }) => {
    const { deckId, numOfCards, cardIndex } = navigation.state.params;

    return {
        deckId,
        numOfCards,
        cardIndex,
        questions,
        quiz
    };
};

export default connect(mapStateToProps)(StartQuiz);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    progressContainer: {

    },
    mainContainer: {

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