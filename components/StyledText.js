import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';

export class MonoText extends Component {
  render() {
    return <Text {...this.props} style={[this.props.style, { fontFamily: 'space-mono' }]} />;
  }
}

export class DeckHeadingText extends Component {
  render() {
    return <Text {...this.props} style={[this.props.style, styles.itemHeading]} />;
  }
}

export class DeckPageHeadingText extends Component {
  render() {
    return <Text {...this.props} style={[this.props.style, styles.deckPageHeading]} />;
  }
}

const styles = StyleSheet.create({
  itemHeading: {
    fontSize: 30
  },
  deckPageHeading: {
    fontSize: 42,
    marginTop: '20%'
  }
});