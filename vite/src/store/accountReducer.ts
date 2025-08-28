// action - state management
import { LOGIN, LOGOUT, REGISTER } from './actions';
import { InitialLoginContextProps } from 'types/auth';

// ==============================|| ACCOUNT REDUCER ||============================== //

interface AccountReducerActionProps {
  type: string;
  payload?: InitialLoginContextProps;
}

const initialState: InitialLoginContextProps = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};

export default function accountReducer(state = initialState, action: AccountReducerActionProps) {
  switch (action.type) {
    case REGISTER: {
      const { user } = action.payload!;
      return {
        ...state,
        user
      };
    }
    case LOGIN: {
      const { user } = action.payload!;
      return {
        ...state,
        isLoggedIn: true,
        isInitialized: true,
        user
      };
    }
    case LOGOUT: {
      return {
        ...state,
        isInitialized: true,
        isLoggedIn: false,
        user: null
      };
    }
    default: {
      return { ...state };
    }
  }
}
