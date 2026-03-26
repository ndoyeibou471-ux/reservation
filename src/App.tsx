import React from 'react';
import { BookingProvider } from './context/BookingContext';
import MyBookings from './pages/MyBookings';

function App() {
  return (
    <BookingProvider>
      <div className="min-h-screen bg-gray-100">
        {/* Ici, on affiche ta page de réservations */}
        <MyBookings />
      </div>
    </BookingProvider>
  );
}

export default App;