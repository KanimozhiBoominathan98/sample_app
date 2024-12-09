import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { processPayment, resetPaymentState } from '../redux/slices/paymentSlice';

const Payment = () => {
  const dispatch = useDispatch();
  const { paymentStatus, transactionId, loading, error } = useSelector((state) => state.payments);

  const [paymentData, setPaymentData] = useState({
    amount: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({ ...paymentData, [name]: value });
  };

  const handlePayment = () => {
    dispatch(processPayment(paymentData));
  };

  const handleReset = () => {
    setPaymentData({ amount: '', cardNumber: '', expiryDate: '', cvv: '' });
    dispatch(resetPaymentState());
  };

  return (
    <div>
      <h2>Payment Module</h2>
      <div>
        <label>Amount:</label>
        <input
          type="number"
          name="amount"
          value={paymentData.amount}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Card Number:</label>
        <input
          type="text"
          name="cardNumber"
          value={paymentData.cardNumber}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Expiry Date:</label>
        <input
          type="text"
          name="expiryDate"
          value={paymentData.expiryDate}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>CVV:</label>
        <input
          type="password"
          name="cvv"
          value={paymentData.cvv}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handlePayment} disabled={loading}>
        {loading ? 'Processing...' : 'Pay'}
      </button>
      <button onClick={handleReset}>Reset</button>

      {paymentStatus && (
        <div>
          <h3>Payment Status: {paymentStatus}</h3>
          {transactionId && <p>Transaction ID: {transactionId}</p>}
          {error && <p>Error: {error}</p>}
        </div>
      )}
    </div>
  );
};

export default Payment;
