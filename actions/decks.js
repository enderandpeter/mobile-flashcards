import * as API from '../utils/api';

export const GET_DECKS = 'GET_DECKS';
export const UPDATE_DECK = 'UPDATE_DECK';

export const getDecksAction = (decks) => ({
    type: GET_DECKS,
    decks,
});

export const updateDeckAction = (deck) => ({
    type: UPDATE_DECK,
    deck,
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
            .then((deck) => {
                dispatch(updateDeckAction(deck));

                return deck;
            });
    }
);

/**
 *
 * @param deckId
 * @param nextIndex An optional specified card (question) index
 * @returns {Function}
 */
export const nextCard = ({ deckId, nextIndex, correct }) => (
    (dispatch) => {
        return API.nextCard({ deckId, nextIndex, correct })
            .then((deck) => {
                dispatch(updateDeckAction(deck));

                return deck;
            });
    }
)

export const restartQuiz = ({ deckId }) => (
    (dispatch) => {
        return API.restartQuiz({ deckId })
            .then((deck) => {
                dispatch(updateDeckAction(deck));

                return deck;
            });
    }
)