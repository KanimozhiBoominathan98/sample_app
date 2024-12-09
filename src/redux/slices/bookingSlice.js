import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Simulating API call
const fetchBookingsApi = async () => {
  return [
    { id: 1, name: 'Room A', date: '2024-12-10', status: 'confirmed' },
    { id: 2, name: 'Room B', date: '2024-12-11', status: 'pending' },
  ];
};

// Async Thunk for fetching bookings
export const fetchBookings = createAsyncThunk('bookings/fetchBookings', async () => {
  const response = await fetchBookingsApi();
  return response;
});

// Slice definition
const bookingSlice = createSlice({
  name: 'bookings',
  initialState: {
    bookings: [],
    loading: false,
    error: null,
  },
  reducers: {
    addBooking: (state, action) => {
      state.bookings.push(action.payload);
    },
    updateBooking: (state, action) => {
      const index = state.bookings.findIndex((booking) => booking.id === action.payload.id);
      if (index !== -1) {
        state.bookings[index] = action.payload;
      }
    },
    deleteBooking: (state, action) => {
      state.bookings = state.bookings.filter((booking) => booking.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.bookings = action.payload;
        state.loading = false;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const { addBooking, updateBooking, deleteBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
