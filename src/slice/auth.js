import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import jwtDecode from "jwt-decode";
import axios from "axios";

const initialState = {
    token: localStorage.getItem("token"),
    name: "",
    email: "",
    _id: "",
    registerStatus: "",
    registerError: "",
    loginStatus: "",
    loginError: "",
    userLoaded: false,
}

export const msalConfig = {
  auth: {
    clientId: "00a21f64-cd60-4444-8e0f-03c9f4d36762",
    authority: "https://login.microsoftonline.com/0571822d-33dc-455e-a07f-1b5575297583", // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
    redirectUri: "http://localhost:3000",
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  }
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
 scopes: ["api://00a21f64-cd60-4444-8e0f-03c9f4d36762/UserAccess"]
};

// Add the endpoints here for Microsoft Graph API services you'd like to use.
// export const graphConfig = {
//     graphMeEndpoint: "https://graph.microsoft.com/.default"
// };

// export const registerUser = createAsyncThunk(
//     "auth/registerUser",
//     async (values, { rejectWithValue }) => {
//         try {
//             const token = await axios.post(`${uri}/register`, {
//                 name: values.name,
//                 email: values.email,
//                 password: values.password
//             })
//             localStorage.setItem("token", token.data)
//             return token.data
//         }
//         catch (error) {
//             console.log(error.response.data);
//             return rejectWithValue(error.response.data)
//         }
//     }
// )

// export const loginUser = createAsyncThunk(
//     "auth/loginUser",
//     async (values, { rejectWithValue }) => {
//         try {
//             const token = await axios.post(`${loginUrl}/login`, {
//                 email: values.email,
//                 password: values.password
//             })
//             localStorage.setItem("token", token.data)
//             return token.data
//         }
//         catch (error) {
//             console.log(error.response.data)
//             return rejectWithValue(error.response.data)
//         }
//     }
// )

export const loginAzure = createAsyncThunk(
  "auth/loginAzure",
  async (values, { rejectWithValue }) => {
      try {
          localStorage.setItem("token", values.accessToken);
          return values.accessToken;
      }
      catch (error) {
          console.log(error.response.data)
          return rejectWithValue(error.response.data)
      }
  }
)


// export const getUser = createAsyncThunk(
//     "auth/getUser",
//     async (id, { rejectWithValue }) => {
//         try {
//             const token = await axios.get(`${uri}/user/${id}, setHeaders()`)
//             localStorage.setItem("token", token.data)
//             return token.data
//         }
//         catch (error) {
//             console.log(error.response.data)
//             return rejectWithValue(error.response.data)
//         }
//     }
// )

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // loadUser(state, action) {
        //     const token = state.token
        //     if (token) {
        //         const user = jwtDecode(token)
        //         return {
        //             ...state,
        //             token,
        //             name: user.name,
        //             email: user.email,
        //             _id: user._id,
        //             userLoaded: true
        //         }
        //     }
        //     else return { ...state, userLoaded: true }
        // },
        // logoutUser(state, action) {
        //     localStorage.removeItem("token")
        //     return {
        //         ...state,
        //         token: "",
        //         name: "",
        //         email: "",
        //         _id: "",
        //         registerStatus: "",
        //         registerError: "",
        //         loginStatus: "",
        //         loginError: "",
        //     }
        // }
    },
    extraReducers: (builder) => {
        // builder.addCase(registerUser.pending, (state, action) => {
        //     return {...state, registerStatus: "pending"}
        // })
        // builder.addCase(registerUser.fulfilled, (state, action) => {
        //     if (action.payload) {
        //       const user = jwtDecode(action.payload);
        //       return {
        //         ...state,
        //         token: action.payload,
        //         name: user.name,
        //         email: user.email,
        //         _id: user._id,
        //         registerStatus: "success",
        //       };
        //     } else return state;
        //   });
        //   builder.addCase(registerUser.rejected, (state, action) => {
        //     return {
        //       ...state,
        //       registerStatus: "rejected",
        //       registerError: action.payload,
        //     };
        //   });
        //   builder.addCase(loginUser.pending, (state, action) => {
        //     return { ...state, loginStatus: "pending" };
        //   });
        //   builder.addCase(loginUser.fulfilled, (state, action) => {
        //     if (action.payload) {
        //       const user = jwtDecode(action.payload);
        //       console.log(user);
        //       return {
        //         ...state,
        //         token: action.payload,
        //         name: user.name,
        //         email: user.email,
        //         _id: user._id,
        //         loginStatus: "success",
        //       };
        //     } else return state;
        //   });
        //   builder.addCase(loginUser.rejected, (state, action) => {
        //     return {
        //       ...state,
        //       loginStatus: "rejected",
        //       loginError: action.payload,
        //     };
        //   });

          builder.addCase(loginAzure.pending, (state, action) => {
            return { ...state, loginStatus: "pending" };
          });
          builder.addCase(loginAzure.fulfilled, (state, action) => {
            if (action.payload) {
              const user = jwtDecode(action.payload);
              return {
                ...state,
                token: action.payload,
                name: user.name,
                email: user.email,
                _id: user.oid,
                loginStatus: "success",
              };
            } else return state;
          });
          builder.addCase(loginAzure.rejected, (state, action) => {
            return {
              ...state,
              loginStatus: "rejected",
              loginError: action.payload,
            };
          });

          // builder.addCase(getUser.pending, (state, action) => {
          //   return {
          //     ...state,
          //     getUserStatus: "pending",
          //   };
          // });
          // builder.addCase(getUser.fulfilled, (state, action) => {
          //   if (action.payload) {
          //     const user = jwtDecode(action.payload);
          //     return {
          //       ...state,
          //       token: action.payload,
          //       name: user.name,
          //       email: user.email,
          //       _id: user._id,
          //       getUserStatus: "success",
          //     };
          //   } else return state;
          // });
          // builder.addCase(getUser.rejected, (state, action) => {
          //   return {
          //     ...state,
          //     getUserStatus: "rejected",
          //     getUserError: action.payload,
          //   };
          // });
        },
      });
      
      export const { loadUser, logoutUser } = authSlice.actions;
      
      export default authSlice.reducer;