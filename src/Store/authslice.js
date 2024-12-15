import { createSlice } from "@reduxjs/toolkit";
import Councellor from "../Pages/Councellor";

const initialState = {
    status: false,
    userData: null,
    councellorData: [],
    councellor_status: JSON.parse(localStorage.getItem('councellor_status')) || false,
    allcouncellor: [], // Holds all counsellor data
  };
  
  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      login: (state, action) => {
        state.status = true;
        state.userData = action.payload.userData;
      },
      logout: (state) => {
        state.status = false;
        state.userData = null;
      },
      login2: (state, action) => {
        state.councellor_status = true;
        state.councellorData = action.payload;
      },
      logout2: (state) => {
        state.councellor_status = false;
        state.councellorData = null;
      },
      setAllCounsellors: (state, action) => {
        state.allcouncellor = action.payload.setCounsellors; // Update counsellor data
      },
    },
  });
  
  export const { login, logout, logout2, login2, setAllCounsellors } = authSlice.actions;
  export default authSlice.reducer;