import { DeckPageHeadingText } from '../components/StyledText';
import Colors from "../constants/Colors";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View
} from 'react-native';


class DeckView extends Component {
    static navigationOptions = ({navigation}) => ({
       title: navigation.state.params.deckId
    })
    render(){
        return <View style={styles.container}>
            <DeckPageHeadingText>{this.props.deckId}</DeckPageHeadingText>
            <View style={{marginTop: '20%'}}>
                <TouchableOpacity style={[styles.largeButton, {backgroundColor: Colors.addCardBackground}]}>
                    <Text style={styles.largeButtonText}>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.largeButton, {backgroundColor: Colors.startQuizBackground}]}>
                    <Text style={styles.largeButtonText}>Start Quiz</Text>
                </TouchableOpacity>
            </View>
        </View>;
    }
}

const mapStateToProps = (state, { navigation }) => {
    const { deckId } = navigation.state.params;

    return {
        deckId,
    };
};

export default connect(mapStateToProps)(DeckView);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    largeButtonText: {
        fontSize: 30
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