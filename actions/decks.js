import * as API from '../utils/api';

export const GET_DECKS = 'GET_DECKS';
export const UPDATE_DECK = 'UPDATE_DECK';
export const DELETE_DECK = 'DELETE_DECK';

export const getDecksAction = (decks) => ({
    type: GET_DECKS,
    decks,
});

export const updateDeckAction = (deck) => ({
    type: UPDATE_DECK,
    deck,
});

export const deleteDeckAction = (deck) => ({
    type: DELETE_DECK,
    deck,
});

export const getDecks = () => (
    (dispatch) => {
        return API.getDecks()
            .then((decks) => {
                dispatch(getDecksAction(decks));
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
 * @param correct Whether or not the user answered correctly
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
);

/**
 *
 * @param deckId
 * @returns {function(*): (*|PromiseLike<T | never>|Promise<T | never>)}
 */
export const restartQuiz = ({ deckId }) => (
    (dispatch) => {
        return API.restartQuiz({ deckId })
            .then((deck) => {
                dispatch(updateDeckAction(deck));

                return deck;
            });
    }
);

/**
 *
 * @param title
 * @returns {function(*): PromiseLike<T | never | never>}
 */
export const addDeck = ({ title }) => (
    (dispatch) => {
        return API.addDeck({ title })
            .then((deck) => {
                dispatch(updateDeckAction(deck));

                return deck;
            });
    }
);

/**
 *
 * @param deckId The ID of the deck being replaced
 * @param title The new title
 * @returns {function(*): (PromiseLike<T | never> | Promise<T | never>)}
 */
export const updateDeck = ({ deckId, title }) => (
    (dispatch) => {
        return API.updateDeck({ deckId, title })
            .then((decks) => {
                dispatch(getDecksAction(decks));

                return decks;
            });
    }
);

/**
 *
 * @param deckId
 * @returns {function(*): PromiseLike<T | never | never>}
 */
export const deleteDeck = ({ deckId }) => (
    (dispatch) => {
        return API.deleteDeck({ deckId })
            .then((deck) => {
                dispatch(deleteDeckAction(deck));

                return deck;
            });
    }
);

/**
 *
 * @param deckId
 * @param question
 * @param answer
 * @returns {function(*): PromiseLike<T | never | never>}
 */
export const addCard = ({ deckId, question, answer }) => (
    (dispatch) => {
        return API.addCard({ deckId, question, answer })
            .then((deck) => {
                dispatch(updateDeckAction(deck));

                return deck;
            });
    }
);

/**
 *
 * @param deckId
 * @param question
 * @param answer
 * @param id
 * @returns {function(*): (PromiseLike<T | never> | Promise<T | never>)}
 */
export const updateCard = ({ deckId, question, answer, id, cardIndex }) => (
    (dispatch) => {
        return API.updateCard({ deckId, question, answer, id, cardIndex })
            .then((deck) => {
                dispatch(updateDeckAction(deck));

                return deck;
            });
    }
);

/**
 *
 * @param deckId
 * @param id
 * @returns {function(*): (PromiseLike<T | never> | Promise<T | never>)}
 */
export const deleteCard = ({ deckId, id }) => (
    (dispatch) => {
        return API.deleteCard ({ deckId, id })
            .then((deck) => {
                dispatch(updateDeckAction(deck));

                return deck;
            });
    }
);