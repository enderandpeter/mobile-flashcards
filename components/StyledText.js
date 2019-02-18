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

export class ScoreHeadingText extends Component {
  render() {
    return <Text {...this.props} style={[this.props.style, styles.scoreHeadingText]} />;
  }
}

export class ScoreText extends Component {
  render() {
    return <Text {...this.props} style={[this.props.style, styles.scoreText]} />;
  }
}

export class AddDeckHeaderText extends Component {
  render() {
    return <Text {...this.props} style={[this.props.style, styles.addDeckHeaderText]} />;
  }
}

export class AddCardHeaderText extends Component {
  render() {
    return <Text {...this.props} style={[this.props.style, styles.addCardHeaderText]} />;
  }
}

export class DeleteDeckText extends Component {
  render() {
    return <Text {...this.props} style={[this.props.style, styles.deleteDeckText]} />;
  }
}

export class DeleteCardText extends Component {
  render() {
    return <Text {...this.props} style={[this.props.style, styles.deleteCardText]} />;
  }
}

export class EditCardsText extends Component {
  render() {
    return <Text {...this.props} style={[this.props.style, styles.editCardsText]} />;
  }
}

export const styles = StyleSheet.create({
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
  },
  questionAndAnswer: {
    fontSize: 25,
    textAlign: 'center'
  },
  flipCardText: {
    fontSize: 16,
    color: Colors.flipCardText
  },
  scoreHeadingText: {
    fontSize: 25
  },
  scoreText: {
    fontSize: 72,
    color: Colors.scoreColor
  },
  addDeckHeaderText: {
    fontSize: 30,
    paddingBottom: 20,
    textAlign: 'center'
  },
  addCardHeaderText: {
    fontSize: 30,
    paddingBottom: 20,
    textAlign: 'center'
  },
  deleteDeckText: {
    fontSize: 20,
    color: Colors.deleteDeckColor
  },
  deleteCardText: {
    fontSize: 20,
    color: Colors.deleteCardColor
  },
  editCardsText: {
    fontSize: 20,
    color: Colors.editCardsColor
  }
});