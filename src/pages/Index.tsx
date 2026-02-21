import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, MapPin } from 'lucide-react';
import TurfCard from '@/components/TurfCard';
import Navbar from '@/components/Navbar';
import { turfs, sportIcons } from '@/data/mockData';
import { SportType } from '@/types';

const Index = () => {
  const [search, setSearch] = useState('');
  const [selectedSport, setSelectedSport] = useState<SportType | 'all'>('all');

  const filtered = turfs.filter((t) => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.address.toLowerCase().includes(search.toLowerCase());
    const matchSport = selectedSport === 'all' || t.sports.includes(selectedSport);
    return matchSearch && matchSport;
  });

  const sports: { key: SportType | 'all'; label: string; icon: string }[] = [
    { key: 'all', label: 'All Sports', icon: '🏟️' },
    { key: 'football', label: 'Football', icon: sportIcons.football },
    { key: 'cricket', label: 'Cricket', icon: sportIcons.cricket },
    { key: 'basketball', label: 'Basketball', icon: sportIcons.basketball },
    { key: 'badminton', label: 'Badminton', icon: sportIcons.badminton },
    { key: 'tennis', label: 'Tennis', icon: sportIcons.tennis },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
        <div className="container mx-auto px-4 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Book Your <span className="text-gradient">Game Time</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-lg">
              Find and reserve sports venues instantly. Real-time availability, instant booking, zero hassle.
            </p>
          </motion.div>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-8 flex gap-3 max-w-xl"
          >
            <div className="flex-1 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search turfs, locations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-12 pl-10 pr-4 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
            <button className="h-12 w-12 rounded-xl bg-secondary border border-border flex items-center justify-center hover:bg-surface-hover transition-colors">
              <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Sport filters */}
      <div className="container mx-auto px-4 -mt-5">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {sports.map((s) => (
            <button
              key={s.key}
              onClick={() => setSelectedSport(s.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium whitespace-nowrap transition-all ${
                selectedSport === s.key
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card text-secondary-foreground border-border hover:border-primary/40'
              }`}
            >
              <span>{s.icon}</span>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Turf Grid */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display text-xl font-bold text-foreground">
              {selectedSport === 'all' ? 'All Venues' : `${selectedSport.charAt(0).toUpperCase() + selectedSport.slice(1)} Venues`}
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              {filtered.length} venue{filtered.length !== 1 ? 's' : ''} near you
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="w-3.5 h-3.5" />
            Bangalore
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((turf, i) => (
              <TurfCard key={turf.id} turf={turf} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No venues found. Try a different search.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Index;
