import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
/////////////////////////////////////////////// Async Action Creators
// export const getUser = createAsyncThunk("user/getUser", async () => {
//   const response = await fetch("/me");
//   const data = await response.json();
//   return data;
// });

// export const login = createAsyncThunk("user/login", async (formData) => {
//   const response = await fetch("/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(formData),
//   });
//   const data = await response.json();
//   return data;
// });

// export const logout = createAsyncThunk("user/logout", async () => {
//   await fetch("/logout", {
//     method: "DELETE",
//   });
//   return {};
// });

/////////////////////////////////////////////// Action Creators
// export function getUser(user) {
//   return {
//     type: "getUser",
//     payload: user,
//   };
// }

// export function logout() {
//   return {
//     type: "logout",
//     payload: {},
//   };
// }

/////////////////////////////////////////////// Reducer
const initialState = {
  media: [],
  loaded: false,
};

const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    getMedia: (state, action) => {
      state.media = action.payload;
    },
  },
  // extraReducers: {
  //   [getUser.fulfilled](state, action) {
  //     state = action.payload;
  //   },
  //   [login.fulfilled](state, action) {
  //     state = action.payload;
  //   },
  //   [logout.fulfilled](state, action) {
  //     state = action.payload;
  //   },
  // },
});

export const { getMedia } = mediaSlice.actions;
export default mediaSlice.reducer;

// export default function userReducer(state = initialState, action) {
//   switch (action.type) {
//     case "getUser":
//       return {
//         ...state,
//         user: action.payload,
//         loggedIn: true,
//       };
//     default:
//       return {
//         ...state,
//         user: action.payload,
//         loggedIn: false,
//       };
//   }
// }
