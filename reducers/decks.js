import { GET_DECKS, UPDATE_DECK, DELETE_DECK } from '../actions/decks';

const decks = (state = {}, action) => {
    switch(action.type) {
        case GET_DECKS :
            return {
                ...action.decks
            };
        case UPDATE_DECK :
            return {
                ...state,
                [action.deck.title]: {
                    ...action.deck
                }
            };
        case DELETE_DECK : {
            let newState = { ...state };
            delete newState[action.deck.title];
            return newState;
        }
        default :
            return state;
    }
};

export default decks;