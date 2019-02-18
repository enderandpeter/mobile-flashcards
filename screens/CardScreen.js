import { deleteCard } from "../actions/decks";
import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { connect } from 'react-redux';
import Colors from "../constants/Colors";

class CardScreen extends Component {
    handleCardPress({ cardIndex }){
        const { deckId } = this.props;
        this.props.navigation.navigate(
            'AddCard',
            {
                deckId,
                cardIndex,
                deleteCard: (id) => { this.props.dispatch(deleteCard({ deckId, id}));}
            }
        );
    }
    render(){
        const { questions } = this.props;
        return (
            <ScrollView style={styles.container}>
                {
                    questions ?
                        Object.keys(questions).map((cardIndex) => {
                            const card = questions[cardIndex];
                            const { question, id } = card;
                            const key = id ? id : cardIndex;
                            return (
                                <TouchableOpacity
                                    style={styles.item} key={key}
                                    onPress={this.handleCardPress.bind(this, { cardIndex })}
                                >
                                    <Text>{question.substring(0, 20) + '...'}</Text>
                                </TouchableOpacity>
                            );
                })
                    :
                        null
                }
            </ScrollView>
        );
    }
}

function mapStateToProps({ decks }, { navigation }) {
    const { deckId } = navigation.state.params;

    const deck = decks[deckId];
    const { questions } = deck;

    return {
        questions,
        deckId
    };
}

export default connect(mapStateToProps)(CardScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
    }
});