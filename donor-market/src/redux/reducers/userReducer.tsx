// userReducer.tsx
type Action = {
  type: string;
  payload?: any;
};

const initialState = {
  loading: false,
  user: null,
  error: null,
};

const userReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'REGISTER_USER_START':
      return {
        ...state,
        loading: true,
      };
    case 'REGISTER_USER_SUCCESS':
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null,
      };
    case 'REGISTER_USER_FAILURE':
      return {
        ...state,
        loading: false,
        user: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
