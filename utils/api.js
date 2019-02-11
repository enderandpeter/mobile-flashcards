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
        .then((deck) => {
            const show = side ? side : ( deck.quiz.show === 'question' ? 'answer' : 'question' );
            AsyncStorage.getItem(DECKS_STORAGE_KEY)
                .then(async (decks) => {
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
                    await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(newDecks));
                });
        });
}