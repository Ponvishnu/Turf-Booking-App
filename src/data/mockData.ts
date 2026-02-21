import { Turf, Slot, Booking, SportType } from '@/types';
import { format, addDays } from 'date-fns';
import turfFootball from '@/assets/turf-football.jpg';
import turfBasketball from '@/assets/turf-basketball.jpg';
import turfTennis from '@/assets/turf-tennis.jpg';

const generateSlots = (courtId: string, date: string, basePrice: number): Slot[] => {
  const slots: Slot[] = [];
  const hours = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];

  hours.forEach((hour) => {
    const isPeak = hour >= 17 && hour <= 21;
    const isWeekend = [0, 6].includes(new Date(date).getDay());
    const multiplier = isPeak ? 1.5 : isWeekend ? 1.25 : 1;
    const finalPrice = Math.round(basePrice * multiplier);

    // Randomly mark some as booked for realism
    const rand = Math.random();
    let status: Slot['status'] = 'available';
    if (rand < 0.2) status = 'booked';
    else if (rand < 0.25) status = 'blocked';

    slots.push({
      id: `${courtId}-${date}-${hour}`,
      courtId,
      date,
      startTime: `${hour.toString().padStart(2, '0')}:00`,
      endTime: `${(hour + 1).toString().padStart(2, '0')}:00`,
      basePrice,
      finalPrice,
      status,
      isPeakHour: isPeak,
    });
  });

  return slots;
};

export const turfs: Turf[] = [
  {
    id: 'turf-1',
    name: 'Green Arena Sports Complex',
    address: '42 MG Road, Indiranagar',
    city: 'Bangalore',
    rating: 4.6,
    reviewCount: 234,
    image: turfFootball,
    sports: ['football', 'cricket'],
    amenities: ['Parking', 'Changing Room', 'Floodlights', 'Drinking Water', 'First Aid'],
    description: 'Premium 5-a-side football turf with international-grade artificial grass. Fully covered with floodlights for night games.',
    coordinates: { lat: 12.9716, lng: 77.5946 },
    ownerId: 'owner-1',
    courts: [
      { id: 'court-1a', turfId: 'turf-1', name: 'Pitch A', surfaceType: 'artificial', sport: 'football' },
      { id: 'court-1b', turfId: 'turf-1', name: 'Pitch B', surfaceType: 'artificial', sport: 'football' },
      { id: 'court-1c', turfId: 'turf-1', name: 'Cricket Net', surfaceType: 'artificial', sport: 'cricket' },
    ],
  },
  {
    id: 'turf-2',
    name: 'Slam Dunk Basketball Hub',
    address: '15 Koramangala 4th Block',
    city: 'Bangalore',
    rating: 4.8,
    reviewCount: 187,
    image: turfBasketball,
    sports: ['basketball', 'badminton'],
    amenities: ['Parking', 'Showers', 'Cafeteria', 'Pro Shop', 'Coach Available'],
    description: 'State-of-the-art indoor basketball court with sprung wooden flooring. Also features 4 badminton courts with professional lighting.',
    coordinates: { lat: 12.9352, lng: 77.6245 },
    ownerId: 'owner-2',
    courts: [
      { id: 'court-2a', turfId: 'turf-2', name: 'Full Court', surfaceType: 'indoor', sport: 'basketball' },
      { id: 'court-2b', turfId: 'turf-2', name: 'Half Court A', surfaceType: 'indoor', sport: 'basketball' },
      { id: 'court-2c', turfId: 'turf-2', name: 'Badminton 1', surfaceType: 'indoor', sport: 'badminton' },
    ],
  },
  {
    id: 'turf-3',
    name: 'Ace Tennis Academy',
    address: '8 HSR Layout Sector 2',
    city: 'Bangalore',
    rating: 4.4,
    reviewCount: 312,
    image: turfTennis,
    sports: ['tennis', 'badminton'],
    amenities: ['Parking', 'Changing Room', 'Floodlights', 'Equipment Rental', 'Coaching'],
    description: 'Professional clay and hard courts maintained to ATP standards. Evening sessions under premium floodlights.',
    coordinates: { lat: 12.9081, lng: 77.6476 },
    ownerId: 'owner-3',
    courts: [
      { id: 'court-3a', turfId: 'turf-3', name: 'Clay Court 1', surfaceType: 'clay', sport: 'tennis' },
      { id: 'court-3b', turfId: 'turf-3', name: 'Hard Court', surfaceType: 'hard', sport: 'tennis' },
      { id: 'court-3c', turfId: 'turf-3', name: 'Badminton Hall', surfaceType: 'indoor', sport: 'badminton' },
    ],
  },
];

export const generateSlotsForCourt = (courtId: string, basePrice: number): Slot[] => {
  const allSlots: Slot[] = [];
  for (let i = 0; i < 7; i++) {
    const date = format(addDays(new Date(), i), 'yyyy-MM-dd');
    allSlots.push(...generateSlots(courtId, date, basePrice));
  }
  return allSlots;
};

const basePrices: Record<string, number> = {
  'court-1a': 1200, 'court-1b': 1200, 'court-1c': 800,
  'court-2a': 1500, 'court-2b': 900, 'court-2c': 600,
  'court-3a': 1000, 'court-3b': 1000, 'court-3c': 500,
};

export const getSlots = (courtId: string): Slot[] => {
  return generateSlotsForCourt(courtId, basePrices[courtId] || 1000);
};

export const sampleBookings: Booking[] = [
  {
    id: 'bk-1',
    userId: 'user-1',
    turfName: 'Green Arena Sports Complex',
    courtName: 'Pitch A',
    slot: {
      id: 'court-1a-today-18',
      courtId: 'court-1a',
      date: format(new Date(), 'yyyy-MM-dd'),
      startTime: '18:00',
      endTime: '19:00',
      basePrice: 1200,
      finalPrice: 1800,
      status: 'booked',
      isPeakHour: true,
    },
    amount: 1800,
    status: 'confirmed',
    createdAt: new Date().toISOString(),
    players: ['Rahul S.', 'Vikram T.'],
  },
];

export const sportIcons: Record<SportType, string> = {
  football: '⚽',
  cricket: '🏏',
  basketball: '🏀',
  badminton: '🏸',
  tennis: '🎾',
};

export const sportColors: Record<SportType, string> = {
  football: 'bg-primary/20 text-primary',
  cricket: 'bg-warning/20 text-warning',
  basketball: 'bg-destructive/20 text-destructive',
  badminton: 'bg-accent/20 text-accent',
  tennis: 'bg-success/20 text-success',
};
