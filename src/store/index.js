import { createStore } from 'redux';
import reducer from './reducer';

//-----------------------|| REDUX - MAIN STORE ||-----------------------//

const store = createStore(reducer);

export { store };
