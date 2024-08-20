import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import dashboardReducer from './dashboardSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, dashboardReducer);

export const store = configureStore({
  reducer: {
    dashboard: persistedReducer,
  },
});

export const persistor = persistStore(store);
