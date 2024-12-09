import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookings, addBooking, deleteBooking, updateBooking } from '../redux/slices/bookingSlice';

const Booking = () => {
  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector((state) => state.bookings);
  const [newBooking, setNewBooking] = useState({ name: '', date: '', status: 'pending' });

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  const handleAddBooking = () => {
    const id = new Date().getTime(); // Simple unique ID
    dispatch(addBooking({ id, ...newBooking }));
    setNewBooking({ name: '', date: '', status: 'pending' });
  };

  const handleDeleteBooking = (id) => {
    dispatch(deleteBooking(id));
  };

  const handleUpdateBooking = (id, status) => {
    dispatch(updateBooking({ id, status }));
  };

  return (
    <div>
      <h2>Booking Management</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <h3>Add New Booking</h3>
      <input
        type="text"
        placeholder="Booking Name"
        value={newBooking.name}
        onChange={(e) => setNewBooking({ ...newBooking, name: e.target.value })}
      />
      <input
        type="date"
        value={newBooking.date}
        onChange={(e) => setNewBooking({ ...newBooking, date: e.target.value })}
      />
      <button onClick={handleAddBooking}>Add Booking</button>

      <h3>Existing Bookings</h3>
      {bookings.map((booking) => (
        <div key={booking.id}>
          <p>
            <strong>{booking.name}</strong> - {booking.date} - {booking.status}
          </p>
          <button onClick={() => handleDeleteBooking(booking.id)}>Delete</button>
          <button onClick={() => handleUpdateBooking(booking.id, 'confirmed')}>Confirm</button>
        </div>
      ))}
    </div>
  );
};

export default Booking;
