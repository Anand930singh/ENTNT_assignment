import { createSlice } from '@reduxjs/toolkit';

// Load jobs from localStorage if available
const storedJobs = localStorage.getItem('jobs');
const parsedJobs = storedJobs ? JSON.parse(storedJobs) : [];

const initialState = {
  jobs: parsedJobs,
};

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setJobs: (state, action) => {
      state.jobs = action.payload;
      localStorage.setItem('jobs', JSON.stringify(state.jobs));
    },
    addJob: (state, action) => {
      state.jobs.push(action.payload);
      localStorage.setItem('jobs', JSON.stringify(state.jobs));
    },
    updateJob: (state, action) => {
      const index = state.jobs.findIndex(job => job.id === action.payload.id);
      if (index !== -1) {
        state.jobs[index] = action.payload;
        localStorage.setItem('jobs', JSON.stringify(state.jobs));
      }
    },
    removeJob: (state, action) => {
      state.jobs = state.jobs.filter(job => job.id !== action.payload);
      localStorage.setItem('jobs', JSON.stringify(state.jobs));
    },
  },
});

export const { setJobs, addJob, updateJob, removeJob } = jobSlice.actions;
export default jobSlice.reducer;
