import { ImageWithFallback } from '../components/ImageWithFallback';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Star,
  Award,
  Users,
  Heart,
  Shield,
  Coffee,
  Wifi,
  Car,
  Dumbbell
} from 'lucide-react';
import { hotelInfo } from '../data/hotelData';

export function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl mb-6">
          À propos de {hotelInfo.name}
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Découvrez l'histoire et les valeurs qui font de notre hôtel un établissement d'exception au cœur de Dakar, offrant une expérience inoubliable à chaque séjour.
        </p>
      </section>

      {/* Histoire Section */}
      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGxvYmJ5fGVufDF8fHx8MTc3NTA1NTAyOHww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Histoire de l'hôtel"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl mb-6">Notre Histoire</h2>
            <p className="text-muted-foreground mb-4">
              Fondé en 1898, Paradise Hotel est le fruit d'une passion familiale pour l'hôtellerie de luxe.
              Situé au cœur des de Dakar, notre établissement a accueilli des personnalités du monde entier
              et continue de perpétuer la tradition de l'excellence sénégalaise.
            </p>
            <p className="text-muted-foreground mb-4">
              Après une rénovation complète en 2020, nous avons modernisé nos installations tout en préservant
              le charme historique de ce bâtiment classé monument historique.
            </p>
            <div className="flex items-center gap-2 text-primary">
              <Award className="h-5 w-5" />
              <span className="font-semibold">Prix du Meilleur Hôtel de Luxe 2025</span>
            </div>
          </div>
        </div>
      </section>

      {/* Valeurs Section */}
      <section className="mb-16">
        <h2 className="text-3xl text-center mb-12">Nos Valeurs</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader className="text-center">
              <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Excellence du Service</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">
                Notre équipe dévouée s'engage à offrir un service personnalisé et attentionné
                à chaque client, créant des expériences mémorables.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Tradition & Modernité</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">
                Nous allions le charme historique du sénégal avec les dernières innovations
                technologiques pour un séjour confortable et connecté.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Engagement Local</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">
                Nous travaillons avec des artisans et fournisseurs locaux, contribuant
                ainsi à l'économie sénégalaise et à la préservation des savoir-faire traditionnels.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Services Section */}
      <section className="mb-16">
        <h2 className="text-3xl text-center mb-12">Nos Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <Wifi className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">WiFi Haut Débit</h3>
            <p className="text-sm text-muted-foreground">Connexion gratuite et ultra-rapide</p>
          </div>

          <div className="text-center">
            <Coffee className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Restaurant Gastronomique</h3>
            <p className="text-sm text-muted-foreground">Cuisine sénégalaise raffinée</p>
          </div>

          <div className="text-center">
            <Dumbbell className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Salle de Sport</h3>
            <p className="text-sm text-muted-foreground">Équipements dernière génération</p>
          </div>

          <div className="text-center">
            <Car className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Service de Conciergerie</h3>
            <p className="text-sm text-muted-foreground">Réservations et transports</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="mb-16">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Nous Contacter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <MapPin className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Adresse</h3>
                <p className="text-muted-foreground">
                  {hotelInfo.address}
                </p>
              </div>

              <div className="text-center">
                <Phone className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Téléphone</h3>
                <p className="text-muted-foreground">{hotelInfo.phone}</p>
              </div>

              <div className="text-center">
                <Mail className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-muted-foreground">{hotelInfo.email}</p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t text-center">
              <Clock className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Horaires d'Ouverture</h3>
              <p className="text-muted-foreground">
                Réception ouverte 24h/24<br />
                Check-in: 15h00 - Check-out: 12h00
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Étoiles Section */}
      <section className="text-center">
        <div className="flex justify-center gap-1 mb-4">
          {[...Array(hotelInfo.stars)].map((_, i) => (
            <Star key={i} className="h-8 w-8 fill-yellow-500 text-yellow-500" />
          ))}
        </div>
        <h2 className="text-2xl mb-4">Établissement 5 Étoiles</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Notre classification 5 étoiles reflète notre engagement constant envers l'excellence,
          le confort et le service personnalisé pour nos clients du monde entier.
        </p>
      </section>
    </div>
  );
}