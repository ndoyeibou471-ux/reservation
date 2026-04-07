import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Booking, Room, CustomerInfo, DateRange } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface BookingContextType {
  bookings: Booking[];
  currentBooking: Partial<Booking> | null;
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
  startBooking: (room: Room, checkIn: Date, checkOut: Date, guests: number) => void;
  completeBooking: (customerInfo: CustomerInfo) => void;
  cancelBooking: (bookingId: string) => void;
  clearCurrentBooking: () => void;
  calculateNights: (checkIn: Date, checkOut: Date) => number;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useLocalStorage<Booking[]>('hotel-bookings', []);
  const [currentBooking, setCurrentBooking] = useState<Partial<Booking> | null>(null);
  const [dateRange, setDateRange] = useState<DateRange>({
  checkIn: null,
  checkOut: null,
});

  const calculateNights = (checkIn: Date, checkOut: Date): number => {
    if (checkOut <= checkIn) return 0;
    const diffTime = checkOut.getTime() - checkIn.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const startBooking = (room: Room, checkIn: Date, checkOut: Date, guests: number) => {
    const nights = calculateNights(checkIn, checkOut);
    const totalPrice = room.price * nights;

    setCurrentBooking({
      id: `booking-${Date.now()}`,
      roomId: room.id,
      room,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      guests,
      totalPrice,
      status: 'pending',
      createdAt: new Date(),
    });
  };

  const completeBooking = (customerInfo: CustomerInfo) => {
    if (!currentBooking) return;
    if (!currentBooking.room || !currentBooking.checkInDate) return;

    const completedBooking: Booking = {
      ...currentBooking,
      customerInfo,
      status: 'confirmed',
    } as Booking;

    setBookings(prev => [...prev, completedBooking]);
    setCurrentBooking(null);
  };

  const cancelBooking = (bookingId: string) => {
    setBookings(prev =>
      prev.map(booking =>
        booking.id === bookingId
          ? { ...booking, status: 'cancelled' as const }
          : booking
      )
    );
  };

  const clearCurrentBooking = () => {
    setCurrentBooking(null);
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        currentBooking,
        dateRange,
        setDateRange,
        startBooking,
        completeBooking,
        cancelBooking,
        clearCurrentBooking,
        calculateNights,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
