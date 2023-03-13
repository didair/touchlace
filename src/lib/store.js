import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { persistReducer } from 'redux-persist';
import { persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

import roomsReducer from 'services/rooms/slice';
import { configApi } from 'services/config/api';
import { statesApi } from 'services/states/api';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['config', 'rooms']
};

// Load reducers from services (or other)
const reducers = combineReducers({
	rooms: roomsReducer,
	[configApi.reducerPath]: configApi.reducer,
	[statesApi.reducerPath]: statesApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({
		serializableCheck: false,
	}).concat(
		configApi.middleware,
		statesApi.middleware,
	),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);
