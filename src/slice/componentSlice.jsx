import { createSlice } from '@reduxjs/toolkit';

// Load components from localStorage if available
const storedComponents = localStorage.getItem('components');
const parsedComponents = storedComponents ? JSON.parse(storedComponents) : [];

const initialState = {
  components: parsedComponents,
};

const componentSlice = createSlice({
  name: 'components',
  initialState,
  reducers: {
    setComponents: (state, action) => {
      state.components = action.payload;
      localStorage.setItem('components', JSON.stringify(state.components));
    },
    addComponent: (state, action) => {
      state.components.push(action.payload);
      localStorage.setItem('components', JSON.stringify(state.components));
    },
    updateComponent: (state, action) => {
      const index = state.components.findIndex(comp => comp.id === action.payload.id);
      if (index !== -1) {
        state.components[index] = action.payload;
        localStorage.setItem('components', JSON.stringify(state.components));
      }
    },
    removeComponent: (state, action) => {
      state.components = state.components.filter(comp => comp.id !== action.payload);
      localStorage.setItem('components', JSON.stringify(state.components));
    },
  },
});

export const { setComponents, addComponent, updateComponent, removeComponent } = componentSlice.actions;
export default componentSlice.reducer;
