import { useEffect } from 'react'
import { useNavigate } from 'react-router';
import { useBooking } from '../context/BookingContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { CheckCircle2, Calendar, Users, Mail, Phone } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';


export function ConfirmationPage() {
  const navigate = useNavigate();
  const { bookings } = useBooking();

  // Récupérer la dernière réservation confirmée
  const lastBooking = bookings
    .filter(b => b.status === 'confirmed')
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0];

  useEffect(() => {
    // Rediriger si aucune réservation
    if (!lastBooking) {
      navigate('/');
    }
  }, [lastBooking, navigate]);

  if (!lastBooking) {
    return null;
  }

  const nights = Math.ceil(
    (lastBooking.checkOutDate.getTime() - lastBooking.checkInDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Icon de confirmation */}
        <div className="flex justify-center">
          <div className="bg-green-100 dark:bg-green-900/20 p-6 rounded-full">
            <CheckCircle2 className="h-16 w-16 text-green-600" />
          </div>
        </div>

        {/* Titre */}
        <div>
          <h1 className="text-4xl mb-4">Réservation confirmée !</h1>
          <p className="text-xl text-muted-foreground">
            Votre réservation a été enregistrée avec succès
          </p>
        </div>

        {/* Détails de la réservation */}
        <Card>
          <CardHeader>
            <CardTitle>Détails de votre réservation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-left">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Numéro de réservation</p>
              <p className="font-mono font-semibold">{lastBooking.id}</p>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold text-lg mb-4">{lastBooking.room.name}</h3>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Dates de séjour</p>
                    <p className="text-sm text-muted-foreground">
                      {format(lastBooking.checkInDate, 'PPP', { locale: fr })} - {format(lastBooking.checkOutDate, 'PPP', { locale: fr })}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {nights} nuit{nights > 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Voyageurs</p>
                    <p className="text-sm text-muted-foreground">
                      {lastBooking.guests} {lastBooking.guests > 1 ? 'personnes' : 'personne'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h4 className="font-semibold mb-3">Informations du client</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Nom:</span>
                  <span>{lastBooking.customerInfo.firstName} {lastBooking.customerInfo.lastName}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{lastBooking.customerInfo.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{lastBooking.customerInfo.phone}</span>
                </div>
                {lastBooking.customerInfo.specialRequests && (
                  <div className="mt-3 p-3 bg-muted rounded-md">
                    <p className="text-xs text-muted-foreground mb-1">Demandes spéciales:</p>
                    <p className="text-sm">{lastBooking.customerInfo.specialRequests}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-lg">Total payé</span>
                <span className="font-bold text-2xl text-primary">{lastBooking.totalPrice}€</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Informations supplémentaires */}
        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
          <CardContent className="pt-6">
            <p className="text-sm">
              Un email de confirmation a été envoyé à <strong>{lastBooking.customerInfo.email}</strong>
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Vous pouvez consulter cette réservation dans la section "Mes réservations"
            </p>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4 justify-center">
          <Button variant="outline" onClick={() => navigate('/')}>
            Retour à l'accueil
          </Button>
          <Button onClick={() => navigate('/my-bookings')}>
            Voir mes réservations
          </Button>
        </div>
      </div>
    </div>
  );
}
