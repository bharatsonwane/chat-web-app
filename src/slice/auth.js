const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: {
    [authStart]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [authSuccess]: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    [authFail]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [authLogout]: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { authStart, authSuccess, authFail, authLogout } =
  authSlice.actions;

export default authSlice.reducer;
