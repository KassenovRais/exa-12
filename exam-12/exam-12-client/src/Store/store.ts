import {configureStore , AnyAction, combineReducers } from '@reduxjs/toolkit'
import { api } from './Services/index'
import storage from 'redux-persist/lib/storage'
import { 
       persistReducer ,
       persistStore,
       PURGE,
       REGISTER,
       PERSIST
     } from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import authSlice from '../features/authSlice';

const persistConfig = {
       key: 'root',
       storage,
       version: 1,
       blacklist: ['api'],
       stateReconciler: autoMergeLevel2
};
     
const rootReducer = combineReducers({
       auth: authSlice,
       [api.reducerPath]: api.reducer,
       
})
     
const persistedReducer = persistReducer<any, AnyAction>(persistConfig, rootReducer);
     

     
export const  store = configureStore({
       reducer: persistedReducer,
       middleware: (getDefaultMiddleware) => getDefaultMiddleware({
              serializableCheck: {
              ignoredActions: [REGISTER, PERSIST, PURGE]
       }
       }).concat(api.middleware)

})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

export default store;
