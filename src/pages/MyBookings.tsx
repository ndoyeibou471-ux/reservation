import React from 'react';
import { useBookings } from '../context/BookingContext';

const MyBookings = () => {
  const { bookings, cancelBooking } = useBookings();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Mes Réservations</h1>

        {bookings.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <p className="text-gray-500 text-lg">Vous n'avez pas encore de réservations.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking: any) => (
              <div key={booking.id} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{booking.hotelName}</h2>
                  <p className="text-gray-600">Date : {booking.date}</p>
                  <p className="text-blue-600 font-medium">{booking.price} FCFA</p>
                </div>
                <button
                  onClick={() => cancelBooking(booking.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition-all font-medium"
                >
                  Annuler la réservation
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;