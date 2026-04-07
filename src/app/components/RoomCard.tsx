import type { Room } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Users, Maximize2, Check } from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from './ImageWithFallback';

interface RoomCardProps {
  room: Room;
}

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

const getRoomTypeLabel = (type: string): string => {
  const labels: Record<string, string> = {
    simple: 'Simple',
    double: 'Double',
    suite: 'Suite',
    deluxe: 'Deluxe',
  };
  return labels[type] || type;
};

export function RoomCard({ room }: RoomCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={imageMap[room.imageUrl]}
          alt={room.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {!room.available && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="secondary" className="text-lg">
              Non disponible
            </Badge>
          </div>
        )}
        <Badge className="absolute top-3 right-3" variant="default">
          {getRoomTypeLabel(room.type)}
        </Badge>
      </div>

      <CardHeader>
        <CardTitle className="flex justify-between items-start">
          <span>{room.name}</span>
          <span className="text-primary">{room.price}€<span className="text-sm text-muted-foreground">/nuit</span></span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">{room.description}</p>

        <div className="flex gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{room.capacity} {room.capacity > 1 ? 'personnes' : 'personne'}</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize2 className="h-4 w-4" />
            <span>{room.size}m²</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {room.amenities.slice(0, 3).map((amenity) => (
            <div key={amenity} className="flex items-center gap-1 text-xs text-muted-foreground">
              <Check className="h-3 w-3 text-green-600" />
              <span>{amenity}</span>
            </div>
          ))}
          {room.amenities.length > 3 && (
            <span className="text-xs text-muted-foreground">+{room.amenities.length - 3} autres</span>
          )}
        </div>

        <Link to={`/rooms/${room.id}`}>
          <Button className="w-full" disabled={!room.available}>
            {room.available ? 'Voir les détails' : 'Indisponible'}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
