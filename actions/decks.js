import * as API from '../utils/api';

export const GET_DECKS = 'GET_DECKS';

export const getDecksAction = (decks) => ({
    type: GET_DECKS,
    decks,
});

export const getDecks = () => (
    (dispatch) => {
        return API.getDecks()
            .then((decks) => {
                /*
                `decks` will be string data from AsyncStorage
                 */
                dispatch(getDecksAction(JSON.parse(decks)));
            });
    }
);

/**
 *
 * @param deckId
 * @param side An optional side, "question" or "answer"
 * @returns {function(*): PromiseLike<T | never>} A Promise whose payload is
 * the deck that had a card flipped.
 */
export const flipCard = ({ deckId, side }) => (
    (dispatch) => {
        return API.flipCard({ deckId, side })
            .then((decks) => {
                const decksData = JSON.parse(decks);
                dispatch(getDecksAction(decksData));

                return decksData[deckId];
            });
    }
);

/**
 *
 * @param deckId
 * @param nextIndex An optional specified card (question) index
 * @returns {Function}
 */
export const nextCard = ({ deckId, nextIndex }) => (
    (dispatch) => {
        return API.nextCard({ deckId, nextIndex })
            .then();
    }
)