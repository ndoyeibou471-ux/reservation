// Types pour l'application de réservation d'hôtel

export interface Room {
  id: string;
  name: string;
  type: RoomType;
  price: number;
  capacity: number;
  description: string;
  amenities: string[];
  imageUrl: string;
  available: boolean;
  size: number; // en m²
}

export type RoomType = 'simple' | 'double' | 'suite' | 'deluxe';

export interface Booking {
  id: string;
  roomId: string;
  room: Room;
  checkInDate: Date;
  checkOutDate: Date;
  guests: number;
  customerInfo: CustomerInfo;
  totalPrice: number;
  status: BookingStatus;
  createdAt: Date;
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests?: string;
}

export interface FilterOptions {
  type?: RoomType | 'all';
  minPrice?: number;
  maxPrice?: number;
  minCapacity?: number;
  availableOnly?: boolean;
}

export interface DateRange {
  checkIn: Date | null;
  checkOut: Date | null;
}
