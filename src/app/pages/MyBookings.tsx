import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useBooking } from '../context/BookingContext';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../components/ui/alert-dialog';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { Calendar, Users, Mail, Phone, XCircle } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { toast } from 'sonner';
import type { Booking } from '../types';

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

interface BookingCardProps {
  booking: Booking;
  onCancel: (id: string) => void;
}

function BookingCard({ booking, onCancel }: BookingCardProps) {
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const nights = Math.ceil(
    (booking.checkOutDate.getTime() - booking.checkInDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  const handleCancel = () => {
    onCancel(booking.id);
    setShowCancelDialog(false);
    toast.success('Réservation annulée');
  };

  return (
    <>
      <Card>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-4 gap-6">
            {/* Image */}
            <div className="relative h-40 rounded-lg overflow-hidden">
              <ImageWithFallback
                src={imageMap[booking.room.imageUrl]}
                alt={booking.room.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Informations de la chambre */}
            <div className="md:col-span-2 space-y-3">
              <div>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg">{booking.room.name}</h3>
                  <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                    {booking.status === 'confirmed' ? 'Confirmée' : 'Annulée'}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Réservation: {booking.id}
                </p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {format(booking.checkInDate, 'PPP', { locale: fr })} - {format(booking.checkOutDate, 'PPP', { locale: fr })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">{nights} nuit{nights > 1 ? 's' : ''}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{booking.guests} {booking.guests > 1 ? 'personnes' : 'personne'}</span>
                </div>
              </div>

              <div className="pt-2 border-t space-y-1 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="h-3 w-3" />
                  <span>{booking.customerInfo.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-3 w-3" />
                  <span>{booking.customerInfo.phone}</span>
                </div>
              </div>
            </div>

            {/* Prix et actions */}
            <div className="flex flex-col justify-between items-end">
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">{booking.totalPrice}€</p>
                <p className="text-xs text-muted-foreground">Total</p>
              </div>

              {booking.status === 'confirmed' && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setShowCancelDialog(true)}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Annuler
                </Button>
              )}
            </div>
          </div>

          {booking.customerInfo.specialRequests && (
            <div className="mt-4 pt-4 border-t">
              <p className="text-xs text-muted-foreground mb-1">Demandes spéciales:</p>
              <p className="text-sm">{booking.customerInfo.specialRequests}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Annuler la réservation ?</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir annuler cette réservation ? Cette action ne peut pas être annulée.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Non, garder</AlertDialogCancel>
            <AlertDialogAction onClick={handleCancel}>
              Oui, annuler
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export function MyBookings() {
  const navigate = useNavigate();
  const { bookings, cancelBooking } = useBooking();

  const confirmedBookings = bookings.filter(b => b.status === 'confirmed');
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl mb-4">Mes réservations</h1>
        <p className="text-muted-foreground">
          Gérez toutes vos réservations en un seul endroit
        </p>
      </div>

      {bookings.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl mb-2">Aucune réservation</h2>
            <p className="text-muted-foreground mb-6">
              Vous n'avez pas encore effectué de réservation
            </p>
            <Button onClick={() => navigate('/')}>
              Découvrir nos chambres
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="confirmed" className="space-y-6">
          <TabsList>
            <TabsTrigger value="confirmed">
              Confirmées ({confirmedBookings.length})
            </TabsTrigger>
            <TabsTrigger value="cancelled">
              Annulées ({cancelledBookings.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="confirmed" className="space-y-4">
            {confirmedBookings.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">Aucune réservation confirmée</p>
                </CardContent>
              </Card>
            ) : (
              confirmedBookings.map(booking => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  onCancel={cancelBooking}
                />
              ))
            )}
          </TabsContent>

          <TabsContent value="cancelled" className="space-y-4">
            {cancelledBookings.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">Aucune réservation annulée</p>
                </CardContent>
              </Card>
            ) : (
              cancelledBookings.map(booking => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  onCancel={cancelBooking}
                />
              ))
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
