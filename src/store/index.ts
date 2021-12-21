import AsyncStorage from '@react-native-async-storage/async-storage';
import { AnyAction, Store, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import { RootState } from '../types';

import rootReducer from './reducers';

const persistConfig = {
    key: 'redux-persist:state',
    storage: AsyncStorage,
};

const persistedRootReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedRootReducer);
export const persistor = persistStore(store as any as Store<RootState, AnyAction>);