// third party
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch as useAppDispatch, useSelector as useAppSelector, TypedUseSelectorHook } from 'react-redux';

import { persistStore } from 'redux-persist';

// project imports
import rootReducer from './reducer';

// ==============================|| REDUX - MAIN STORE ||============================== //

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false, immutableCheck: false })
});

const persister = persistStore(store);

type RootState = ReturnType<typeof rootReducer>;

type AppDispatch = typeof store.dispatch;

const { dispatch } = store;

function useDispatch() {
  return useAppDispatch<AppDispatch>();
}

const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;

export { store, persister, dispatch, useSelector, useDispatch };
