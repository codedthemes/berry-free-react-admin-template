const initialState = {
  // define your initial state here
};

type Action = {
  type: string;
  payload?: any;
};

const rootReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'ACTION_TYPE_1':
      // handle action type 1
      return {
        ...state,
        // changes to state go here
      };
    case 'ACTION_TYPE_2':
      // handle action type 2
      return {
        ...state,
        // changes to state go here
      };
    // add more cases for other action types
    default:
      return state;
  }
};

export default rootReducer;
