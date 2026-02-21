import { motion } from 'framer-motion';
import { CalendarDays, Clock, MapPin, CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { sampleBookings } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Bookings = () => {
  const navigate = useNavigate();
  const bookings = sampleBookings;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-2xl font-bold text-foreground">My Bookings</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your upcoming and past reservations</p>
        </motion.div>

        <div className="mt-8 space-y-4">
          {bookings.length > 0 ? (
            bookings.map((booking, i) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-semibold text-foreground">{booking.turfName}</h3>
                  <p className="text-sm text-muted-foreground">{booking.courtName}</p>
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <CalendarDays className="w-3.5 h-3.5" />
                      {booking.slot.date}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" />
                      {booking.slot.startTime} - {booking.slot.endTime}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-primary">₹{booking.amount}</p>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium capitalize">
                    {booking.status}
                  </span>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-16">
              <CalendarDays className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-display text-lg font-semibold text-foreground">No bookings yet</h3>
              <p className="text-muted-foreground text-sm mt-1 mb-4">Find a venue and book your first game!</p>
              <Button onClick={() => navigate('/')} className="bg-primary text-primary-foreground hover:bg-primary/90">
                Explore Venues
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookings;
