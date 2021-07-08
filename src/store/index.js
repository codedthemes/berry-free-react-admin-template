import { createStore } from 'redux';
import { persistStore } from 'redux-persist';
import reducer from './reducer';

//-----------------------|| REDUX - MAIN STORE ||-----------------------//

const store = createStore(reducer);
const persister = persistStore(store);

export { store, persister };
