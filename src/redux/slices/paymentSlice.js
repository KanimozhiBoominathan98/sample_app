import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Simulating API call
const processPaymentApi = async (paymentData) => {
  return { success: true, transactionId: `txn_${Date.now()}` };
};

// Async Thunk for processing payment
export const processPayment = createAsyncThunk(
  'payments/processPayment',
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await processPaymentApi(paymentData);
      return response;
    } catch (error) {
      return rejectWithValue('Payment failed');
    }
  }
);

// Slice definition
const paymentSlice = createSlice({
  name: 'payments',
  initialState: {
    paymentStatus: null,
    transactionId: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetPaymentState: (state) => {
      state.paymentStatus = null;
      state.transactionId = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(processPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(processPayment.fulfilled, (state, action) => {
        state.paymentStatus = action.payload.success ? 'success' : 'failure';
        state.transactionId = action.payload.transactionId;
        state.loading = false;
      })
      .addCase(processPayment.rejected, (state, action) => {
        state.paymentStatus = 'failure';
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { resetPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;
