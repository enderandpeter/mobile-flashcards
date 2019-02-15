import { AsyncStorage } from 'react-native';

export const DECKS_STORAGE_KEY = 'MobileFlashCards:Deck';

function setDummyData () {
    let dummyData = {
        /*
        React: {
            title: 'React',
            questions: [
                {
                    question: 'What is React?',
                    answer: 'A library for managing user interfaces'
                },
                {
                    question: 'Where do you make Ajax requests in React?',
                    answer: 'The componentDidMount lifecycle event'
                }
            ],
            quiz: {
                cardIndex: 0,
                show: 'question',
                score: 0,
                complete: false
            }
        },
        JavaScript: {
            title: 'JavaScript',
            questions: [
                {
                    question: 'What is a closure?',
                    answer: 'The combination of a function and the lexical environment within which that function was declared.'
                }
            ],
            quiz: {
                cardIndex: 0,
                show: 'question',
                score: 0,
                complete: false
            }

        }*/
    };

    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(dummyData));

    return dummyData;
}

export function getOrCreateDecks (decks) {
    return decks === null
        ? setDummyData()
        : JSON.parse(decks);
}