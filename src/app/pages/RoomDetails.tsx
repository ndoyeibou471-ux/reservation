import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { mockRooms } from '../data/mockRooms';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Calendar } from '../components/ui/calendar';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { ArrowLeft, Users, Maximize2, Check, Calendar as CalendarIcon } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { toast } from 'sonner';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

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

export function RoomDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { startBooking, calculateNights } = useBooking();

  const room = mockRooms.find(r => r.id === id);

  const [checkInDate, setCheckInDate] = useState<Date | undefined>();
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>();
  const [guests, setGuests] = useState<number>(1);

  if (!room) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/rooms')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux chambres
        </Button>
        <p className="text-center text-muted-foreground">Chambre non trouvée</p>
      </div>
    );
  }

  const handleBooking = () => {
    if (!checkInDate || !checkOutDate) {
      toast.error('Veuillez sélectionner les dates de séjour');
      return;
    }

    if (checkOutDate <= checkInDate) {
      toast.error('La date de départ doit être après la date d\'arrivée');
      return;
    }

    if (guests > room.capacity) {
      toast.error(`Cette chambre peut accueillir maximum ${room.capacity} personne(s)`);
      return;
    }

    startBooking(room, checkInDate, checkOutDate, guests);
    toast.success('Chambre ajoutée à votre réservation');
    navigate('/booking');
  };

  const nights = checkInDate && checkOutDate ? calculateNights(checkInDate, checkOutDate) : 0;
  const totalPrice = nights * room.price;

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        onClick={() => navigate('/rooms')}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour aux chambres
      </Button>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Image et informations principales */}
        <div className="space-y-4">
          <div className="relative h-96 rounded-lg overflow-hidden">
            <ImageWithFallback
              src={imageMap[room.imageUrl]}
              alt={room.name}
              className="w-full h-full object-cover"
            />
            {!room.available && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Badge variant="secondary" className="text-xl">
                  Non disponible
                </Badge>
              </div>
            )}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Équipements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {room.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm">{amenity}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Détails et réservation */}
        <div className="space-y-6">
          <div>
            <Badge className="mb-3">{room.type}</Badge>
            <h1 className="text-4xl mb-4">{room.name}</h1>
            <p className="text-muted-foreground mb-4">{room.description}</p>

            <div className="flex gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>{room.capacity} {room.capacity > 1 ? 'personnes' : 'personne'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Maximize2 className="h-5 w-5" />
                <span>{room.size}m²</span>
              </div>
            </div>
          </div>

          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Réserver cette chambre</span>
                <span className="text-primary">{room.price}€<span className="text-sm text-muted-foreground">/nuit</span></span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Date d'arrivée */}
              <div className="space-y-2">
                <Label>Date d'arrivée</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkInDate ? format(checkInDate, 'PPP', { locale: fr }) : 'Sélectionner'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={checkInDate}
                      onSelect={setCheckInDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Date de départ */}
              <div className="space-y-2">
                <Label>Date de départ</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkOutDate ? format(checkOutDate, 'PPP', { locale: fr }) : 'Sélectionner'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={checkOutDate}
                      onSelect={setCheckOutDate}
                      disabled={(date) => date < new Date() || (checkInDate ? date <= checkInDate : false)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Nombre de personnes */}
              <div className="space-y-2">
                <Label>Nombre de personnes</Label>
                <Select value={guests.toString()} onValueChange={(v) => setGuests(parseInt(v))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: room.capacity }, (_, i) => i + 1).map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num > 1 ? 'personnes' : 'personne'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Récapitulatif du prix */}
              {nights > 0 && (
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{room.price}fcfa × {nights} nuit{nights > 1 ? 's' : ''}</span>
                    <span>{totalPrice}fcfa</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span className="text-primary">{totalPrice}€</span>
                  </div>
                </div>
              )}

              <Button
                onClick={handleBooking}
                disabled={!room.available || !checkInDate || !checkOutDate}
                className="w-full"
                size="lg"
              >
                {room.available ? 'Réserver maintenant' : 'Indisponible'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}