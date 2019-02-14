import Colors from '../constants/Colors';
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

export class LargeButtonText extends Component {
  render() {
    return <Text {...this.props} style={[this.props.style, styles.largeButtonText]} />;
  }
}

export class QuestionAndAnswerText extends Component {
  render() {
    return <Text {...this.props} style={[this.props.style, styles.questionAndAnswer]} />;
  }
}

export class FlipCardText extends Component {
  render() {
    return <Text {...this.props} style={[this.props.style, styles.flipCardText]} />;
  }
}

export class ScoreText extends Component {
  render() {
    return <Text {...this.props} style={[this.props.style, styles.scoreText]} />;
  }
}

const styles = StyleSheet.create({
  itemHeading: {
    fontSize: 30
  },
  deckPageHeading: {
    fontSize: 42,
    marginTop: '20%'
  },
  largeButtonText: {
    fontSize: 30
  },
  questionAndAnswer: {
    fontSize: 25,
  },
  flipCardText: {
    fontSize: 16,
    color: Colors.flipCardText
  },
  scoreText: {
    fontSize: 72,
    color: Colors.scoreColor
  }
});