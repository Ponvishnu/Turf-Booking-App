import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, MapPin, Clock, Shield, Wifi, Car, Droplets } from 'lucide-react';
import { turfs, sportIcons, sportColors } from '@/data/mockData';
import { Slot, Court } from '@/types';
import SlotGrid from '@/components/SlotGrid';
import BookingModal from '@/components/BookingModal';
import Navbar from '@/components/Navbar';
import { cn } from '@/lib/utils';

const amenityIcons: Record<string, any> = {
  'Parking': Car,
  'Floodlights': Wifi,
  'Drinking Water': Droplets,
  'Showers': Droplets,
};

const TurfDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const turf = turfs.find((t) => t.id === id);

  const [selectedCourt, setSelectedCourt] = useState<Court | null>(turf?.courts[0] || null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [showBooking, setShowBooking] = useState(false);

  if (!turf) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Turf not found</p>
      </div>
    );
  }

  const handleSlotSelect = (slot: Slot) => {
    setSelectedSlot(slot);
    setShowBooking(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="relative h-56 md:h-72 overflow-hidden">
        {turf.image && <img src={turf.image} alt={turf.name} className="w-full h-full object-cover" />}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="container mx-auto px-4 relative h-full flex items-end pb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <div className="flex gap-2 mb-2">
              {turf.sports.map((sport) => (
                <span key={sport} className={`text-xs px-2 py-1 rounded-full font-medium ${sportColors[sport]}`}>
                  {sportIcons[sport]} {sport}
                </span>
              ))}
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">{turf.name}</h1>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{turf.address}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-primary text-primary" />
                <span className="text-sm font-semibold text-foreground">{turf.rating}</span>
                <span className="text-sm text-muted-foreground">({turf.reviewCount} reviews)</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="font-display text-lg font-bold text-foreground mb-3">About</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{turf.description}</p>
            </motion.section>

            {/* Amenities */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <h2 className="font-display text-lg font-bold text-foreground mb-3">Amenities</h2>
              <div className="flex flex-wrap gap-2">
                {turf.amenities.map((a) => (
                  <span key={a} className="text-sm bg-secondary text-secondary-foreground px-3 py-1.5 rounded-lg border border-border">
                    {a}
                  </span>
                ))}
              </div>
            </motion.section>

            {/* Court selection */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="font-display text-lg font-bold text-foreground mb-3">Select Court</h2>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {turf.courts.map((court) => (
                  <button
                    key={court.id}
                    onClick={() => {
                      setSelectedCourt(court);
                      setSelectedSlot(null);
                    }}
                    className={cn(
                      'flex flex-col items-start px-4 py-3 rounded-xl border-2 min-w-[140px] transition-all',
                      selectedCourt?.id === court.id
                        ? 'bg-primary/10 border-primary'
                        : 'bg-card border-border hover:border-primary/40'
                    )}
                  >
                    <span className={cn(
                      'text-sm font-semibold',
                      selectedCourt?.id === court.id ? 'text-primary' : 'text-foreground'
                    )}>
                      {court.name}
                    </span>
                    <span className="text-xs text-muted-foreground capitalize mt-0.5">
                      {court.surfaceType} · {court.sport}
                    </span>
                  </button>
                ))}
              </div>
            </motion.section>

            {/* Slot Grid */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <h2 className="font-display text-lg font-bold text-foreground mb-3">Available Slots</h2>
              {selectedCourt && (
                <SlotGrid
                  courtId={selectedCourt.id}
                  onSlotSelect={handleSlotSelect}
                  selectedSlot={selectedSlot}
                />
              )}
            </motion.section>
          </div>

          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            {/* Quick info card */}
            <div className="bg-card border border-border rounded-xl p-5 sticky top-20">
              <h3 className="font-display font-bold text-foreground mb-4">Venue Info</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">6:00 AM - 11:00 PM</p>
                    <p className="text-xs text-muted-foreground">Open daily</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{turf.address}</p>
                    <p className="text-xs text-muted-foreground">{turf.city}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Free Cancellation</p>
                    <p className="text-xs text-muted-foreground">Up to 24hrs before</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground mb-1">Starting from</p>
                <p className="text-2xl font-bold text-primary">₹500<span className="text-sm font-normal text-muted-foreground">/hr</span></p>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>

      {/* Booking Modal */}
      {showBooking && selectedSlot && selectedCourt && (
        <BookingModal
          slot={selectedSlot}
          turfName={turf.name}
          courtName={selectedCourt.name}
          onClose={() => setShowBooking(false)}
        />
      )}
    </div>
  );
};

export default TurfDetail;
