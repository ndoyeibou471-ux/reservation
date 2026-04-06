export type RoomType = 'simple' | 'double' | 'suite' | 'deluxe';

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
  size: number;
}

export interface FilterOptions {
  type: RoomType | 'all';
  minPrice?: number;
  maxPrice?: number;
  minCapacity?: number;
  availableOnly?: boolean;
}
