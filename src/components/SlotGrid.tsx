import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, addDays, isToday, isTomorrow } from 'date-fns';
import { Slot } from '@/types';
import { getSlots } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Clock, Zap } from 'lucide-react';

interface SlotGridProps {
  courtId: string;
  onSlotSelect: (slot: Slot) => void;
  selectedSlot: Slot | null;
}

const SlotGrid = ({ courtId, onSlotSelect, selectedSlot }: SlotGridProps) => {
  const [selectedDate, setSelectedDate] = useState(0); // day offset

  const dates = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = addDays(new Date(), i);
      return {
        offset: i,
        date: format(d, 'yyyy-MM-dd'),
        dayName: isToday(d) ? 'Today' : isTomorrow(d) ? 'Tomorrow' : format(d, 'EEE'),
        dayNum: format(d, 'd'),
        month: format(d, 'MMM'),
      };
    });
  }, []);

  const slots = useMemo(() => {
    const all = getSlots(courtId);
    return all.filter((s) => s.date === dates[selectedDate].date);
  }, [courtId, selectedDate, dates]);

  const availableCount = slots.filter((s) => s.status === 'available').length;

  return (
    <div>
      {/* Date selector */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {dates.map((d) => (
          <button
            key={d.offset}
            onClick={() => setSelectedDate(d.offset)}
            className={cn(
              'flex flex-col items-center min-w-[64px] px-3 py-2.5 rounded-lg border transition-all',
              selectedDate === d.offset
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-secondary text-secondary-foreground border-border hover:border-primary/50'
            )}
          >
            <span className="text-xs font-medium">{d.dayName}</span>
            <span className="text-lg font-bold">{d.dayNum}</span>
            <span className="text-xs opacity-70">{d.month}</span>
          </button>
        ))}
      </div>

      {/* Availability badge */}
      <div className="flex items-center gap-2 mt-4 mb-3">
        <span className={cn(
          'text-sm font-medium',
          availableCount <= 3 ? 'text-destructive' : 'text-muted-foreground'
        )}>
          {availableCount} slots available
        </span>
        {availableCount <= 3 && availableCount > 0 && (
          <span className="text-xs bg-destructive/20 text-destructive px-2 py-0.5 rounded-full animate-pulse-slot">
            Filling fast!
          </span>
        )}
      </div>

      {/* Slot grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
        <AnimatePresence mode="popLayout">
          {slots.map((slot) => {
            const isSelected = selectedSlot?.id === slot.id;
            const isAvailable = slot.status === 'available';

            return (
              <motion.button
                key={slot.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={isAvailable ? { scale: 1.05 } : {}}
                whileTap={isAvailable ? { scale: 0.95 } : {}}
                disabled={!isAvailable}
                onClick={() => isAvailable && onSlotSelect(slot)}
                className={cn(
                  'relative flex flex-col items-center p-3 rounded-lg border-2 transition-all',
                  isAvailable && !isSelected && 'bg-secondary border-border hover:border-primary/60 cursor-pointer',
                  isSelected && 'bg-primary/15 border-primary slot-glow',
                  slot.status === 'booked' && 'bg-muted border-border opacity-50 cursor-not-allowed',
                  slot.status === 'blocked' && 'bg-muted border-border opacity-30 cursor-not-allowed',
                  slot.status === 'held' && 'bg-warning/10 border-warning/30 cursor-not-allowed'
                )}
              >
                <span className={cn(
                  'text-sm font-semibold',
                  isSelected ? 'text-primary' : isAvailable ? 'text-foreground' : 'text-muted-foreground'
                )}>
                  {slot.startTime}
                </span>
                <span className="text-xs text-muted-foreground mt-0.5">
                  {slot.startTime} - {slot.endTime}
                </span>
                <div className="flex items-center gap-1 mt-1.5">
                  {slot.isPeakHour && <Zap className="w-3 h-3 text-warning" />}
                  <span className={cn(
                    'text-xs font-bold',
                    isSelected ? 'text-primary' : isAvailable ? 'text-foreground' : 'text-muted-foreground'
                  )}>
                    ₹{slot.finalPrice}
                  </span>
                </div>
                {slot.status === 'booked' && (
                  <span className="text-[10px] text-muted-foreground mt-1">Booked</span>
                )}
                {slot.status === 'held' && (
                  <span className="text-[10px] text-warning mt-1">On Hold</span>
                )}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-4 pt-3 border-t border-border">
        {[
          { label: 'Available', cls: 'bg-secondary border-border' },
          { label: 'Selected', cls: 'bg-primary/15 border-primary' },
          { label: 'Booked', cls: 'bg-muted border-border opacity-50' },
          { label: 'Peak Hour', icon: <Zap className="w-3 h-3 text-warning" /> },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            {item.icon || <div className={cn('w-3 h-3 rounded border', item.cls)} />}
            <span className="text-xs text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlotGrid;
