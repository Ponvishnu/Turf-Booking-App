import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin } from 'lucide-react';
import { Turf } from '@/types';
import { sportIcons, sportColors } from '@/data/mockData';

interface TurfCardProps {
  turf: Turf;
  index: number;
}

const TurfCard = ({ turf, index }: TurfCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4, scale: 1.01 }}
      onClick={() => navigate(`/turf/${turf.id}`)}
      className="group cursor-pointer rounded-xl bg-card border border-border overflow-hidden transition-shadow hover:shadow-[var(--shadow-glow)]"
    >
      <div className="relative h-48 overflow-hidden">
        {turf.image && <img src={turf.image} alt={turf.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 flex gap-1.5">
          {turf.sports.map((sport) => (
            <span key={sport} className={`text-xs px-2 py-1 rounded-full font-medium ${sportColors[sport]}`}>
              {sportIcons[sport]} {sport}
            </span>
          ))}
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-card/90 backdrop-blur-sm rounded-full px-2.5 py-1">
          <Star className="w-3.5 h-3.5 fill-primary text-primary" />
          <span className="text-xs font-semibold text-foreground">{turf.rating}</span>
          <span className="text-xs text-muted-foreground">({turf.reviewCount})</span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-display font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
          {turf.name}
        </h3>
        <div className="flex items-center gap-1.5 mt-1.5 text-muted-foreground">
          <MapPin className="w-3.5 h-3.5" />
          <span className="text-sm">{turf.address}</span>
        </div>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
          <div className="flex gap-2">
            {turf.amenities.slice(0, 3).map((a) => (
              <span key={a} className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-md">
                {a}
              </span>
            ))}
          </div>
          <span className="text-sm font-semibold text-primary">
            {turf.courts.length} courts
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default TurfCard;
