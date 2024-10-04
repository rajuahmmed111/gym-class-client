import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTraineeProfile = createAsyncThunk(
  "trainee/fetchProfile",
  async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/trainee/profile`
    );
    return response.data;
  }
);
export const updateTraineeProfile = createAsyncThunk(
  "trainee/updateProfile",
  async (profileData) => {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/api/trainee/profile`,
      profileData
    );
    return response.data;
  }
);

const traineeSlice = createSlice({
  name: "trainee",
  initialState: {
    profile: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTraineeProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTraineeProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchTraineeProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateTraineeProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTraineeProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(updateTraineeProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
  reducers: undefined,
});

export default traineeSlice.reducer;
