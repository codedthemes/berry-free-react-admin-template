import { configureStore } from '@reduxjs/toolkit'
import assetReducer from './slice/asset';

const reducer = {
  assets: assetReducer
}
const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;