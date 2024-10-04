import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch available classes for the trainee
export const fetchAvailableClasses = createAsyncThunk(
  "classBooking/fetchAvailableClasses",
  async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/classes/available`
    ); 
    return response.data; 
  }
);

// Book a class
export const bookClass = createAsyncThunk(
  "classBooking/bookClass",
  async (classId: string) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/classes/book`,
      { classId }
    ); 
    return response.data; 
  }
);
`${process.env.NEXT_PUBLIC_API_URL}/api/classes/available`;
// Cancel a class booking
export const cancelClassBooking = createAsyncThunk(
  "classBooking/cancelClassBooking",
  async (classId: string) => {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/api/classes/book/${classId}`
    ); 
    return response.data; 
  }
);

const classBookingSlice = createSlice({
    name: "classBooking",
    initialState: {
        availableClasses: [],
        bookings: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAvailableClasses.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAvailableClasses.fulfilled, (state, action) => {
                state.loading = false;
                state.availableClasses = action.payload;
            })
            .addCase(fetchAvailableClasses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Book a class
            .addCase(bookClass.pending, (state) => {
                state.loading = true;
            })
            .addCase(bookClass.fulfilled, (state, action) => {
                state.loading = false;
                state.bookings.push(action.payload); 
            })
            .addCase(bookClass.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Cancel a class booking
            .addCase(cancelClassBooking.pending, (state) => {
                state.loading = true;
            })
            .addCase(cancelClassBooking.fulfilled, (state, action) => {
                state.loading = false;
                state.bookings = state.bookings.filter(
                    (booking) => booking.classId !== action.payload.classId
                );
            })
            .addCase(cancelClassBooking.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
    reducers: undefined
});

export default classBookingSlice.reducer;
