import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE
} from 'redux-persist';
import Accounts from './reducers/Accounts';
import Auth from './reducers/Auth';
import ConnectedNetwork from './reducers/ConnectedNetwork';
import NFTs from './reducers/NFTs';
import Recipients from './reducers/Recipients';
import Settings from './reducers/Settings';
import Tokens from './reducers/Tokens';
import Transactions from './reducers/Transactions';
import Wallet from './reducers/Wallet';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  blacklist: ['wallet']
};

const reducers = combineReducers({
  auth: Auth,
  connectedNetwork: ConnectedNetwork,
  accounts: Accounts,
  transactions: Transactions,
  recipients: Recipients,
  tokens: Tokens,
  nfts: NFTs,
  wallet: Wallet,
  settings: Settings
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

export const persistor = persistStore(store);
