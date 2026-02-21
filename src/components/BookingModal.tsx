import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Slot } from '@/types';
import { Button } from '@/components/ui/button';
import { X, Check, Users, Clock, Zap, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface BookingModalProps {
  slot: Slot;
  turfName: string;
  courtName: string;
  onClose: () => void;
}

const BookingModal = ({ slot, turfName, courtName, onClose }: BookingModalProps) => {
  const [step, setStep] = useState<'details' | 'confirming' | 'confirmed'>('details');
  const [playerCount, setPlayerCount] = useState(2);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleConfirm = () => {
    setStep('confirming');
    // Simulate booking
    setTimeout(() => {
      setStep('confirmed');
      toast({
        title: '🎉 Booking Confirmed!',
        description: `${courtName} at ${slot.startTime} - ${slot.endTime}`,
      });
    }, 1500);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md bg-card border border-border rounded-2xl overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h3 className="font-display font-bold text-lg text-foreground">
              {step === 'confirmed' ? 'Booking Confirmed' : 'Confirm Booking'}
            </h3>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          <div className="p-5">
            {step === 'confirmed' ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-6"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <Check className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-display font-bold text-xl text-foreground mb-1">You're all set!</h4>
                <p className="text-muted-foreground text-sm mb-4">
                  Your slot at {turfName} has been reserved.
                </p>
                <div className="bg-secondary rounded-xl p-4 text-left space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Court</span>
                    <span className="font-medium text-foreground">{courtName}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Time</span>
                    <span className="font-medium text-foreground">{slot.startTime} - {slot.endTime}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Date</span>
                    <span className="font-medium text-foreground">{slot.date}</span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 border-t border-border">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="font-bold text-primary text-lg">₹{slot.finalPrice}</span>
                  </div>
                </div>
                <Button onClick={() => navigate('/bookings')} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  View My Bookings
                </Button>
              </motion.div>
            ) : (
              <>
                {/* Venue info */}
                <div className="bg-secondary rounded-xl p-4 mb-4">
                  <p className="font-semibold text-foreground">{turfName}</p>
                  <p className="text-sm text-muted-foreground">{courtName}</p>
                </div>

                {/* Slot details */}
                <div className="space-y-3 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{slot.startTime} - {slot.endTime}</p>
                      <p className="text-xs text-muted-foreground">{slot.date}</p>
                    </div>
                  </div>

                  {slot.isPeakHour && (
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-warning/10 flex items-center justify-center">
                        <Zap className="w-4 h-4 text-warning" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Peak Hour Pricing</p>
                        <p className="text-xs text-muted-foreground">₹{slot.basePrice} → ₹{slot.finalPrice}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                      <Users className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Players</p>
                      <div className="flex items-center gap-2 mt-1">
                        {[2, 4, 6, 8, 10].map((n) => (
                          <button
                            key={n}
                            onClick={() => setPlayerCount(n)}
                            className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all ${
                              playerCount === n
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-secondary text-secondary-foreground hover:bg-surface-hover'
                            }`}
                          >
                            {n}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cancellation policy */}
                <div className="flex items-start gap-2 p-3 rounded-lg bg-muted mb-5">
                  <Shield className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Free cancellation up to 24hrs before. 50% refund within 4-24hrs. No refund within 4hrs.
                  </p>
                </div>

                {/* Price + CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <p className="text-xs text-muted-foreground">Total Amount</p>
                    <p className="text-2xl font-bold text-primary">₹{slot.finalPrice}</p>
                  </div>
                  <Button
                    onClick={handleConfirm}
                    disabled={step === 'confirming'}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 h-12 text-base font-semibold"
                  >
                    {step === 'confirming' ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                      />
                    ) : (
                      'Book Now'
                    )}
                  </Button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BookingModal;
