import { GET_DECKS, UPDATE_DECK } from '../actions/decks';

const decks = (state = {}, action) => {
    switch(action.type) {
        case GET_DECKS :
            return {
                ...state,
                ...action.decks
            };
        case UPDATE_DECK :
            return {
                ...state,
                [action.deck.title]: {
                    ...action.deck
                }
            };
        default :
            return state;
    }
};

export default decks;