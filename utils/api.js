import { AsyncStorage } from 'react-native';
import { getOrCreateDecks, DECKS_STORAGE_KEY } from './_decks';

export function getDecks () {
    //AsyncStorage.clear();
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((decks) => getOrCreateDecks(decks));
}

export function getDeck ( id ) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((decks) => JSON.parse(decks)[id]);
}

/**
 *
 * @param deckId
 * @param side Optionally specify a side to show. Otherwise it will just flip it.
 * @returns {*|PromiseLike<T | never>|Promise<T | never>}
 */
export function flipCard ( { deckId, side }) {
    return this.getDeck(deckId)
        .then(async (deck) => {
            const show = side ? side : ( deck.quiz.show === 'question' ? 'answer' : 'question' );
            return await AsyncStorage.getItem(DECKS_STORAGE_KEY)
                .then((decks) => {
                    const decksData = JSON.parse(decks);
                    const newDecks = {
                        ...decksData,
                        [deckId]: {
                            ...deck,
                            quiz: {
                                ...deck.quiz,
                                show
                            }
                        }
                    };
                    return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(newDecks))
                        .then(() => this.getDeck(deckId).then((deck) => deck));
                });
        });
}

/**
 *
 * @param deckId
 * @param nextIndex Optionally specify a card index.
 * @param correct Whether or not the answer was correct, which will add to the score.
 * @returns {*|PromiseLike<T | never>|Promise<T | never>}
 */
export function nextCard ( { deckId, nextIndex, correct } ) {
    return this.getDeck(deckId)
        .then(async (deck) => {
            return await AsyncStorage.getItem(DECKS_STORAGE_KEY)
                .then( (decks) => {
                    const decksData = JSON.parse(decks);
                    const show = 'question';

                    let { complete } = deck.quiz;

                    // Make sure cardIndex is definitely a number in case something weird happened.
                    let cardIndex = nextIndex
                        ?
                            Number.parseInt(cardIndex)
                        :
                            Number.parseInt(deck.quiz.cardIndex) + 1;
                    if(isNaN(cardIndex)){
                        cardIndex = isNaN(deck.quiz.cardIndex) ? 0 : deck.quiz.cardIndex;
                    }

                    if(cardIndex < 0){
                        cardIndex = 0;
                    }

                    // Quiz is complete once end of questions are reached
                    if(cardIndex >= deck.questions.length){
                        cardIndex = 0;
                        complete = true;
                    }

                    const newDecks = {
                        ...decksData,
                        [deckId]: {
                            ...deck,
                            quiz: {
                                ...deck.quiz,
                                complete,
                                cardIndex,
                                show,
                                score: correct ? deck.quiz.score + 1 : deck.quiz.score
                            }
                        }
                    };

                    return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(newDecks))
                        .then(() => this.getDeck(deckId)).then((deck) => deck);
                });
        });
}

export function restartQuiz( { deckId } ){
    return this.getDeck(deckId)
        .then(async (deck) => {
            return await AsyncStorage.getItem(DECKS_STORAGE_KEY)
                .then((decks) => {
                    const decksData = JSON.parse(decks);

                    const complete = false;
                    const score  = 0;
                    const cardIndex = 0;
                    const show = 'question';

                    const newDecks = {
                        ...decksData,
                        [deckId]: {
                            ...deck,
                            quiz: {
                                ...deck.quiz,
                                complete,
                                cardIndex,
                                score,
                                show
                            }
                        }
                    };

                    return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(newDecks))
                        .then(() => this.getDeck(deckId)).then((deck) => deck);
                });
        });
}