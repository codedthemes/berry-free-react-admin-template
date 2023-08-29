// userSlice.tsx
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../../models/user';

interface UserState {
  loading: boolean;
  user: User | null;
  error: string | null;
}

interface Credentials {
  email: string;
  password: string;
}

const initialState: UserState = {
  loading: false,
  user: null,
  error: null,
};

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user: User, thunkAPI) => {
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
        thunkAPI.dispatch(registerUserSuccess(data));
        return data;
      } else {
        thunkAPI.dispatch(registerUserFailure(data.message));
        return thunkAPI.rejectWithValue(data.message);
      }
    } catch (err: any) {
      thunkAPI.dispatch(registerUserFailure(err.message));
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (credentials: Credentials, thunkAPI) => {
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
        thunkAPI.dispatch(loginUserSuccess(data));
        return data;
      } else {
        thunkAPI.dispatch(loginUserFailure(data.message));
        return thunkAPI.rejectWithValue(data.message);
      }
    } catch (err: any) {
      thunkAPI.dispatch(loginUserFailure(err.message));
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

export const fetchUserById = createAsyncThunk(
  'user/fetchUserById',
  async (userId: string, thunkAPI) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/users/${userId}`,
      );

      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data.message);
      }
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    registerUserStart: (state) => {
      state.loading = true;
    },
    registerUserSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    },
    registerUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
    },
    loginUserStart: (state) => {
      state.loading = true;
    },
    loginUserSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.user = action.payload;
      console.log('state.user', state.user);
      state.error = null;
    },
    loginUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(loginUser.fulfilled, (state, action) => {
      // Add user to the state array
      // state.entities.push(action.payload)
    }),
      builder.addCase(loginUser.rejected, (state, action) => {
        // Add user to the state array
      }),
      builder.addCase(registerUser.fulfilled, (state, action) => {
        // Add user to the state array
      }),
      builder.addCase(registerUser.rejected, (state, action) => {
        // Add user to the state array
      });

    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(fetchUserById.rejected, (state, action) => {
      state.loading = false;
      state.error = null;
      state.user = null;
    });
  },
});

export const {
  registerUserStart,
  registerUserSuccess,
  registerUserFailure,
  loginUserStart,
  loginUserSuccess,
  loginUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
