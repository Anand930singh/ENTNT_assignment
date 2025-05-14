import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slice/authSlice'
import shipsReducer from '../slice/shipSlice'
import jobsReducer from '../slice/jobSlice'
import componentsReducer from '../slice/componentSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ships: shipsReducer,
    jobs: jobsReducer,
    components: componentsReducer,
  },
});
