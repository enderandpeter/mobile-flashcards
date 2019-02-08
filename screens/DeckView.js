import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    StyleSheet,
    Text,
} from 'react-native';

class DeckView extends Component {
    static navigationOptions = ({navigation}) => ({
       title: navigation.state.params.deckId
    })
    render(){
        return <Text>{this.props.deckId}</Text>;
    }
}

const mapStateToProps = (state, { navigation }) => {
    const { deckId } = navigation.state.params

    return {
        deckId,
    };
}

export default connect(mapStateToProps)(DeckView)