import { AsyncStorage } from 'react-native';
import { getOrCreateDecks, DECKS_STORAGE_KEY } from './_decks';

export function getDecks () {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then(getOrCreateDecks);
}