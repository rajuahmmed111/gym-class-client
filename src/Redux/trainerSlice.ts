import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch trainers from api
export const fetchTrainers = createAsyncThunk(
  "trainer/fetchTrainers",
  async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/trainers`
    );
    return response.data; 
  }
);

// Add trainer to api
export const addTrainer = createAsyncThunk(
  "trainer/addTrainer",
  async (trainer) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/trainers`,
      trainer
    );
    return response.data;
  }
);
;
// Delete trainer from api
export const deleteTrainer = createAsyncThunk(
  "trainer/deleteTrainer",
  async (id) => {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/trainers/${id}`);
    return id; 
  }
);

const trainerSlice = createSlice({
    name: "trainer",
    initialState: {
        trainers: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTrainers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTrainers.fulfilled, (state, action) => {
                state.loading = false;
                state.trainers = action.payload;
            })
            .addCase(fetchTrainers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addTrainer.fulfilled, (state, action) => {
                state.trainers.push(action.payload);
            })
            .addCase(deleteTrainer.fulfilled, (state, action) => {
                state.trainers = state.trainers.filter(
                    (trainer) => trainer.id !== action.payload
                );
            });
    },
    reducers: undefined
});

export default trainerSlice.reducer;
