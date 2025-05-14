import { createSlice } from '@reduxjs/toolkit';

// Load ships from localStorage if available
const storedShips = localStorage.getItem('ships');
const parsedShips = storedShips ? JSON.parse(storedShips) : [];

const initialState = {
  ships: parsedShips,
};

const shipSlice = createSlice({
  name: 'ships',
  initialState,
  reducers: {
    setShips: (state, action) => {
      state.ships = action.payload;
      localStorage.setItem('ships', JSON.stringify(state.ships));
    },
    addShip: (state, action) => {
      state.ships.push(action.payload);
      localStorage.setItem('ships', JSON.stringify(state.ships));
    },
    updateShip: (state, action) => {
      const index = state.ships.findIndex(ship => ship.id === action.payload.id);
      if (index !== -1) {
        state.ships[index] = action.payload;
        localStorage.setItem('ships', JSON.stringify(state.ships));
      }
    },
    removeShip: (state, action) => {
      state.ships = state.ships.filter(ship => ship.id !== action.payload);
      localStorage.setItem('ships', JSON.stringify(state.ships));
    },
  },
});

export const { setShips, addShip, updateShip, removeShip } = shipSlice.actions;
export default shipSlice.reducer;
