
import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers, createStore} from 'redux';
import { persistCombineReducers } from 'redux-persist';
import { persistReducer,persistStore } from 'redux-persist';
import setArraySendCard from './reducers/arrayCardSendReducer';

const rootPersistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const rootReducer = combineReducers({
    arrayCardSend: setArraySendCard
});

export default createStore(persistReducer(rootPersistConfig, rootReducer));