export interface HotelInfo {
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  stars: number;
  checkInTime: string;
  checkOutTime: string;
}

export interface HotelService {
  id: string;
  name: string;
  description: string;
  icon: string;
  imageUrl: string;
}
