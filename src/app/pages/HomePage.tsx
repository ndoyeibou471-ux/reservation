import { useNavigate } from 'react-router';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { TestimonialsSection } from '../components/TestimonialsSection';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Star,
  Calendar,
  Wifi,
  Coffee,
  Utensils,
  Dumbbell,
  Car,
  Shield
} from 'lucide-react';
import { hotelInfo } from '../data/hotelData';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1723465308831-29da05e011f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGV4dGVyaW9yJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzc1MDU1MDI3fDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="HotelLux Paris"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(hotelInfo.stars)].map((_, i) => (
              <Star key={i} className="h-8 w-8 fill-yellow-500 text-yellow-500 star animate-float" style={{ animationDelay: `${i * 0.2}s` }} />
            ))}
          </div>
          <h1 className="text-5xl md:text-7xl mb-6 font-serif">
            {hotelInfo.name}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            L'excellence au cœur de Dakar - Un séjour inoubliable vous attend
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate('/rooms')} className="text-lg px-8 btn-primary">
              Réserver maintenant
            </Button>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl mb-6">Bienvenue à Paradise Hotel</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {hotelInfo.description}
            </p>
          </div>
        </div>
      </section>

      {/* Services Icons */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">Nos Services</h2>
            <p className="text-xl text-muted-foreground">
              Profitez d'un séjour d'exception avec nos équipements premium
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-5xl mx-auto stagger-animation">
            <div className="text-center">
              <div className="inline-flex p-4 bg-primary/10 rounded-full mb-3 icon-bounce">
                <Wifi className="h-8 w-8 text-primary" />
              </div>
              <p className="font-medium">WiFi Gratuit</p>
            </div>
            <div className="text-center">
              <div className="inline-flex p-4 bg-primary/10 rounded-full mb-3 icon-bounce">
                <Coffee className="h-8 w-8 text-primary" />
              </div>
              <p className="font-medium">Petit-déjeuner</p>
            </div>
            <div className="text-center">
              <div className="inline-flex p-4 bg-primary/10 rounded-full mb-3 icon-bounce">
                <Utensils className="h-8 w-8 text-primary" />
              </div>
              <p className="font-medium">Restaurant</p>
            </div>
            <div className="text-center">
              <div className="inline-flex p-4 bg-primary/10 rounded-full mb-3 icon-bounce">
                <Dumbbell className="h-8 w-8 text-primary" />
              </div>
              <p className="font-medium">Salle de sport</p>
            </div>
            <div className="text-center">
              <div className="inline-flex p-4 bg-primary/10 rounded-full mb-3 icon-bounce">
                <Car className="h-8 w-8 text-primary" />
              </div>
              <p className="font-medium">Parking</p>
            </div>
            <div className="text-center">
              <div className="inline-flex p-4 bg-primary/10 rounded-full mb-3 icon-bounce">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <p className="font-medium">Sécurité 24/7</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="card-hover">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg icon-bounce">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                  <div>
                    <h3 className="font-semibold mb-1">Adresse</h3>
                    <p className="text-sm text-muted-foreground">{hotelInfo.address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg icon-bounce">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Téléphone</h3>
                    <p className="text-sm text-muted-foreground">{hotelInfo.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg icon-bounce">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-sm text-muted-foreground">{hotelInfo.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg icon-bounce">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Horaires</h3>
                    <p className="text-sm text-muted-foreground">
                      Check-in: {hotelInfo.checkInTime}<br />
                      Check-out: {hotelInfo.checkOutTime}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <Calendar className="h-16 w-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-4xl mb-4">Prêt à réserver votre séjour ?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Découvrez nos chambres élégantes et réservez dès maintenant pour profiter de nos offres exclusives
          </p>
          <Button size="lg" variant="secondary" onClick={() => navigate('/rooms')} className="text-lg px-8 btn-secondary">
            Voir nos chambres disponibles
          </Button>
        </div>
      </section>
    </div>
  );
}