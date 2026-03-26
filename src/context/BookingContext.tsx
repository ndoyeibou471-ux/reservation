import React, { createContext, useContext, useState, useEffect } from 'react';

const BookingContext = createContext<any>(null);

export const BookingProvider = ({ children }: { children: React.ReactNode }) => {
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('mes_reservations');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('mes_reservations', JSON.stringify(bookings));
  }, [bookings]);

  const cancelBooking = (id: string) => {
    setBookings(bookings.filter((b: any) => b.id !== id));
  };

  return (
    <BookingContext.Provider value={{ bookings, cancelBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBookings = () => useContext(BookingContext);