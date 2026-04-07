import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useBooking } from '../context/BookingContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { ArrowLeft, Calendar, Users } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { toast } from 'sonner';

const imageMap: Record<string, string> = {
  'hotel-room-single': 'https://images.unsplash.com/photo-1771276045965-aa5c1ddf15a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHJvb20lMjBzaW5nbGUlMjBiZWR8ZW58MXx8fHwxNzc1MDg1OTY2fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'luxury-hotel-bedroom': 'https://images.unsplash.com/photo-1657639754502-3c138cb24b4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGJlZHJvb20lMjBkb3VibGV8ZW58MXx8fHwxNzc1MDg1OTY2fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'modern-hotel-suite': 'https://images.unsplash.com/photo-1509647924673-bbb53e22eeb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3RlbCUyMHN1aXRlJTIwbGl2aW5nfGVufDF8fHx8MTc3NTA4NTk2N3ww&ixlib=rb-4.1.0&q=80&w=1080',
  'luxury-penthouse-view': 'https://images.unsplash.com/photo-1568115286680-d203e08a8be6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwZW50aG91c2UlMjB2aWV3JTIwY2l0eXxlbnwxfHx8fDE3NzUwODU5Njd8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'beachfront-hotel-room': 'https://images.unsplash.com/photo-1577135733242-0d8b9cdf584f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaGZyb250JTIwaG90ZWwlMjByb29tJTIwb2NlYW58ZW58MXx8fHwxNzc1MDg1OTY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'business-hotel-room': 'https://images.unsplash.com/photo-1771775528790-28d21016be3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGhvdGVsJTIwcm9vbSUyMGRlc2t8ZW58MXx8fHwxNzc1MDg1OTY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'family-hotel-suite': 'https://images.unsplash.com/photo-1765852550350-be1815fe67ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBob3RlbCUyMHN1aXRlJTIwc3BhY2lvdXN8ZW58MXx8fHwxNzc1MDg1OTY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'romantic-hotel-bedroom': 'https://images.unsplash.com/photo-1637515128249-df66173ee9b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMGhvdGVsJTIwYmVkcm9vbSUyMGVsZWdhbnR8ZW58MXx8fHwxNzc1MDg1OTY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
};

export function BookingPage() {
  const navigate = useNavigate();
  const { currentBooking, completeBooking, clearCurrentBooking, calculateNights } = useBooking();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!currentBooking || !currentBooking.room || !currentBooking.checkInDate || !currentBooking.checkOutDate) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl mb-4">Aucune réservation en cours</h2>
        <p className="text-muted-foreground mb-6">Veuillez d'abord sélectionner une chambre</p>
        <Button onClick={() => navigate('/')}>Voir les chambres</Button>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Le nom est requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Numéro de téléphone invalide (10 chiffres)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Veuillez corriger les erreurs dans le formulaire');
      return;
    }

    completeBooking({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      specialRequests: formData.specialRequests,
    });

    toast.success('Réservation confirmée avec succès !');
    navigate('/confirmation');
  };

  const handleCancel = () => {
    clearCurrentBooking();
    navigate('/');
  };

  const nights = calculateNights(currentBooking.checkInDate, currentBooking.checkOutDate);

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" onClick={handleCancel} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Annuler la réservation
      </Button>

      <h1 className="text-3xl mb-8">Finaliser votre réservation</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Formulaire */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Informations personnelles</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Jean"
                    />
                    {errors.firstName && (
                      <p className="text-sm text-destructive">{errors.firstName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Dupont"
                    />
                    {errors.lastName && (
                      <p className="text-sm text-destructive">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="jean.dupont@example.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="0612345678"
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive">{errors.phone}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialRequests">Demandes spéciales (optionnel)</Label>
                  <Textarea
                    id="specialRequests"
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    placeholder="Arrivée tardive, lit bébé, etc."
                    rows={4}
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="button" variant="outline" onClick={handleCancel} className="flex-1">
                    Annuler
                  </Button>
                  <Button type="submit" className="flex-1">
                    Confirmer la réservation
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Récapitulatif */}
        <div className="md:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Récapitulatif</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative h-32 rounded-lg overflow-hidden">
                <ImageWithFallback
                  src={imageMap[currentBooking.room.imageUrl]}
                  alt={currentBooking.room.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h3 className="font-semibold">{currentBooking.room.name}</h3>
                <p className="text-sm text-muted-foreground">{currentBooking.room.type}</p>
              </div>

              <div className="border-t pt-4 space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Arrivée</p>
                    <p className="text-muted-foreground">
                      {format(currentBooking.checkInDate, 'PPP', { locale: fr })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Départ</p>
                    <p className="text-muted-foreground">
                      {format(currentBooking.checkOutDate, 'PPP', { locale: fr })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Voyageurs</p>
                    <p className="text-muted-foreground">
                      {currentBooking.guests ?? 0} {(currentBooking.guests ?? 0) > 1 ? 'personnes' : 'personne'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{currentBooking.room.price}€ × {nights} nuit{nights > 1 ? 's' : ''}</span>
                  <span>{currentBooking.totalPrice}€</span>
                </div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span className="text-primary">{currentBooking.totalPrice}€</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}