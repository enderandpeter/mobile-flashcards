import { getOrCreateDecks, DECKS_STORAGE_KEY } from './_decks';
import { setLocalNotification, clearLocalNotification } from "./notifications";
import { AsyncStorage } from 'react-native';
import shortid from 'shortid';

export function getDecks () {
    //AsyncStorage.clear();
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((decks) => getOrCreateDecks(decks));
}

export function getDeck ( id ) {
    return this.getDecks()
        .then((decks) => decks[id]);
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
            const updatedDeck = {
                [deckId]: {
                    ...deck,
                    quiz: {
                        ...deck.quiz,
                        show
                    }
                }
            };
            return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(updatedDeck))
                .then(() => this.getDeck(deckId).then((deck) => deck));
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
        .then((deck) => {
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

                clearLocalNotification()
                    .then(setLocalNotification);
            }

            const updatedDeck = {
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

            return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(updatedDeck))
                .then(() => this.getDeck(deckId)).then((deck) => deck);
        });
}

/**
 *
 * @param deckId
 * @returns {*|PromiseLike<T | never>|Promise<T | never>}
 */
export function restartQuiz( { deckId } ){
    return this.getDeck(deckId)
        .then((deck) => {
            const complete = false;
            const score  = 0;
            const cardIndex = 0;
            const show = 'question';

            const updatedDeck = {
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

            return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(updatedDeck))
                .then(() => this.getDeck(deckId)).then((deck) => deck);
        });
}

/**
 *
 * @param title
 * @returns {PromiseLike<T | never>}
 */
export function addDeck({ title }){
    const newDeck = {
        [title]: {
            title,
            questions: [],
            quiz: {
                cardIndex: 0,
                show: 'question',
                score: 0,
                complete: false
            }
        }
    };

    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(newDeck))
        .then(() => this.getDeck(title)).then( (deck) => deck );
}

/**
 *
 * @param deckId
 * @returns {*|PromiseLike<T | never>|Promise<T | never>}
 */
export function deleteDeck({ deckId }){
    return this.getDeck(deckId)
        .then((deck) => {
            if(!deck){
                return;
            }
            // The item exists, so let's remove it
            return this.getDecks()
                .then((decks) => {
                    delete decks[deckId];
                    return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
                        .then(() => deck);
                });
    });
}

/**
 *
 * @param deckId
 * @param question
 * @param answer
 * @returns {*|PromiseLike<T | never>|Promise<T | never>}
 */
export function addCard({ deckId, question, answer }){
    return this.getDeck(deckId)
        .then((deck) => {
            const updatedDeck = {
                [deck.title]: {
                    ...deck,
                    questions: [
                        ...deck.questions,
                        {
                            question,
                            answer,
                            id: shortid.generate()
                        }
                    ]
                }
            };

            return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(updatedDeck))
                .then(() => this.getDeck(deckId)).then( (deck) => deck);
        });
}

/**
 *
 * @param deckId
 * @param cardIndex
 * @param question
 * @param answer
 * @param id
 * @returns {*|PromiseLike<T | never>|Promise<T | never>}
 */
export function updateCard({ deckId, cardIndex, question, answer, id }){
    return this.getDeck(deckId)
        .then((deck) => {


            const updatedDeck = {
                [deck.title]: {
                    ...deck,
                    questions: [
                        ...deck.questions.slice(0, cardIndex),
                        {
                            question,
                            answer,
                            id
                        },
                        ...deck.questions.slice(cardIndex + 1)
                    ]
                }
            };

            return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(updatedDeck))
                .then(() => this.getDeck(deckId)).then( (deck) => deck);
        });
}