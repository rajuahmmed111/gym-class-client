import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch existing class schedules
export const fetchSchedules = createAsyncThunk(
  "schedule/fetchSchedules",
  async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/schedules`)
    return response.data; 
  }
);

// Create new schedule
export const createSchedule = createAsyncThunk(
  "schedule/createSchedule",
  async (schedule) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/schedules`,
      schedule
    );
    return response.data; 
  }
);

const scheduleSlice = createSlice({
    name: "schedule",
    initialState: {
        schedules: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSchedules.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSchedules.fulfilled, (state, action) => {
                state.loading = false;
                state.schedules = action.payload;
            })
            .addCase(fetchSchedules.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createSchedule.fulfilled, (state, action) => {
                state.schedules.push(action.payload);
            });
    },
    reducers: undefined
});

export default scheduleSlice.reducer;
