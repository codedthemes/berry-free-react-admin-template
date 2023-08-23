// userActions.tsx
import { User } from '../../models/user';
import { Dispatch } from 'redux';

interface Credentials {
  email: string;
  password: string;
}

export const registerUserStart = () => {
  return {
    type: 'REGISTER_USER_START',
  };
};

export const registerUserSuccess = (user: User) => {
  return {
    type: 'REGISTER_USER_SUCCESS',
    payload: user,
  };
};

export const registerUserFailure = (error: string) => {
  return {
    type: 'REGISTER_USER_FAILURE',
    payload: error,
  };
};

export const loginUserStart = () => {
  return {
    type: 'LOGIN_USER_START',
  };
};

export const loginUserSuccess = (user: User) => {
  return {
    type: 'LOGIN_USER_SUCCESS',
    payload: user,
  };
};

export const loginUserFailure = (error: string) => {
  return {
    type: 'LOGIN_USER_FAILURE',
    payload: error,
  };
};

export const registerUser = (user: User) => {
  return async (dispatch: Dispatch) => {
    dispatch(registerUserStart());

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/users/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        },
      );

      const data = await response.json();

      if (response.ok) {
        dispatch(registerUserSuccess(data));
      } else {
        dispatch(registerUserFailure(data.message));
      }
    } catch (err: any) {
      dispatch(registerUserFailure(err.message));
    }
  };
};

export const loginUser = (credentials: Credentials) => {
  return async (dispatch: Dispatch) => {
    dispatch(loginUserStart());

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/users/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        },
      );

      const data = await response.json();

      if (response.ok) {
        dispatch(loginUserSuccess(data));
      } else {
        dispatch(loginUserFailure(data.message));
      }
    } catch (err: any) {
      dispatch(loginUserFailure(err.message));
    }
  };
};
