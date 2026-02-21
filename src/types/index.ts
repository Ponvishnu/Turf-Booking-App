export type SportType = 'football' | 'cricket' | 'basketball' | 'badminton' | 'tennis';
export type SlotStatus = 'available' | 'held' | 'booked' | 'blocked';
export type SurfaceType = 'natural' | 'artificial' | 'indoor' | 'clay' | 'hard';

export interface Turf {
  id: string;
  name: string;
  address: string;
  city: string;
  rating: number;
  reviewCount: number;
  image: string;
  sports: SportType[];
  amenities: string[];
  courts: Court[];
  ownerId: string;
  description: string;
  coordinates: { lat: number; lng: number };
}

export interface Court {
  id: string;
  turfId: string;
  name: string;
  surfaceType: SurfaceType;
  sport: SportType;
}

export interface Slot {
  id: string;
  courtId: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  basePrice: number;
  finalPrice: number;
  status: SlotStatus;
  isPeakHour: boolean;
}

export interface Booking {
  id: string;
  userId: string;
  turfName: string;
  courtName: string;
  slot: Slot;
  amount: number;
  status: 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
  players: string[];
}
