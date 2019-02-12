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
                            ...decksData[deckId],
                            quiz: {
                                ...decksData[deckId].quiz,
                                show
                            }
                        }
                    };
                    return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(newDecks))
                        .then(() => this.getDecks().then((decks) => decks));
                });
        });
}

/**
 *
 * @param deckId
 * @param side Optionally specify a card index.
 * @returns {*|PromiseLike<T | never>|Promise<T | never>}
 */
export function nextCard ( { deckId, nextIndex }) {
    return this.getDeck(deckId)
        .then((deck) => {
            AsyncStorage.getItem(DECKS_STORAGE_KEY)
                .then(async (decks) => {
                    const decksData = JSON.parse(decks);

                    let complete = false;

                    // Make sure cardIndex is definitely a number in case something weird happened.
                    let cardIndex = nextIndex
                        ?
                            Number.parseInt(cardIndex)
                        :
                            Number.parseInt(decksData[deckId].quiz.cardIndex) + 1;
                    if(isNaN(cardIndex)){
                        cardIndex = isNaN(decksData[deckId].quiz.cardIndex) ? 0 : decksData[deckId].quiz.cardIndex;
                    }

                    if(cardIndex < 0){
                        cardIndex = 0;
                    }

                    if(cardIndex >= decksData[deckId].questions.length){
                        cardIndex = 0;
                        complete = true;
                    }

                    const newDecks = {
                        ...decksData,
                        [deckId]: {
                            ...decksData[deckId],
                            quiz: {
                                ...decksData[deckId].quiz,
                                complete,
                                cardIndex
                            }
                        }
                    };
                    await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(newDecks));
                });
        });
}