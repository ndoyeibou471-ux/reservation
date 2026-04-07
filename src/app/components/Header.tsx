import { Link, useLocation } from 'react-router';
import { Hotel, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { useBooking } from '../context/BookingContext';
import { Badge } from './ui/badge';

export function Header() {
  const location = useLocation();
  const { bookings } = useBooking();
  
  const activeBookings = bookings.filter(b => b.status === 'confirmed').length;

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 header-glass animate-fade-in-up">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Hotel className="h-6 w-6 text-primary" />
          <div>
            <span className="font-semibold text-xl">Paradise Hotel</span>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-500 text-xs">★</span>
              ))}
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/">
            <Button variant={isActive('/') ? 'default' : 'ghost'} className="transition-all duration-300 hover:scale-105">
              Accueil
            </Button>
          </Link>
          <Link to="/about">
            <Button variant={isActive('/about') ? 'default' : 'ghost'} className="transition-all duration-300 hover:scale-105">
              À propos
            </Button>
          </Link>
          <Link to="/rooms">
            <Button variant={isActive('/rooms') ? 'default' : 'ghost'} className="transition-all duration-300 hover:scale-105">
              Nos Chambres
            </Button>
          </Link>
          <Link to="/my-bookings">
            <Button variant={isActive('/my-bookings') ? 'default' : 'ghost'} className="relative transition-all duration-300 hover:scale-105">
              Mes Réservations
              {activeBookings > 0 && (
                <Badge className="ml-2 h-5 w-5 flex items-center justify-center p-0 rounded-full badge-glow">
                  {activeBookings}
                </Badge>
              )}
            </Button>
          </Link>
        </nav>

        <div className="md:hidden flex items-center gap-2">
          <Link to="/rooms">
            <Button variant="ghost" size="icon">
              <Hotel className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/my-bookings">
            <Button variant="ghost" size="icon" className="relative">
              <Calendar className="h-5 w-5" />
              {activeBookings > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 rounded-full text-xs">
                  {activeBookings}
                </Badge>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}