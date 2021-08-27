import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../reducers/counter/counterSlice';
import tareaReducer from '../reducers/tareas/tareaReducer';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    tareas: tareaReducer
  },
});
