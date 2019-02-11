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

export const flipCard = ({ deckId, side }) => (
    (dispatch) => {
        return API.flipCard({ deckId, side })
            .then(() => API.getDecks())
            .then((decks) => {
                /*
                `decks` will be string data from AsyncStorage
                 */
                dispatch(getDecksAction(JSON.parse(decks)));
            });
    }
);