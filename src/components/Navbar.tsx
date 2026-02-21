import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, CalendarDays, Search } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-40 glass border-b border-border/50"
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <MapPin className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-lg text-foreground">
            Turf<span className="text-primary">Book</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {[
            { to: '/', label: 'Explore', icon: Search },
            { to: '/bookings', label: 'My Bookings', icon: CalendarDays },
          ].map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === to
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/bookings" className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors">
            <CalendarDays className="w-5 h-5 text-muted-foreground" />
          </Link>
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
            R
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
