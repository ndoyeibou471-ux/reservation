import type { Room } from '../../types';

interface RoomCardProps {
  room: Room;
}

const imageMap: Record<string, string> = {
  'hotel-room-single':
    'https://images.unsplash.com/photo-1771276045965-aa5c1ddf15a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHJvb20lMjBzaW5nbGUlMjBiZWR8ZW58MXx8fHwxNzc1MDg1OTY2fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'luxury-hotel-bedroom':
    'https://images.unsplash.com/photo-1657639754502-3c138cb24b4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGJlZHJvb20lMjBkb3VibGV8ZW58MXx8fHwxNzc1MDg1OTY2fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'modern-hotel-suite':
    'https://images.unsplash.com/photo-1509647924673-bbb53e22eeb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3RlbCUyMHN1aXRlJTIwbGl2aW5nfGVufDF8fHx8MTc3NTA4NTk2N3ww&ixlib=rb-4.1.0&q=80&w=1080',
  'luxury-penthouse-view':
    'https://images.unsplash.com/photo-1568115286680-d203e08a8be6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwZW50aG91c2UlMjB2aWV3JTIwY2l0eXxlbnwxfHx8fDE3NzUwODU5Njd8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'beachfront-hotel-room':
    'https://images.unsplash.com/photo-1577135733242-0d8b9cdf584f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaGZyb250JTIwaG90ZWwlMjByb29tJTIwb2NlYW58ZW58MXx8fHwxNzc1MDg1OTY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'business-hotel-room':
    'https://images.unsplash.com/photo-1771775528790-28d21016be3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGhvdGVsJTIwcm9vbSUyMGRlc2t8ZW58MXx8fHwxNzc1MDg1OTY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'family-hotel-suite':
    'https://images.unsplash.com/photo-1765852550350-be1815fe67ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBob3RlbCUyMHN1aXRlJTIwc3BhY2lvdXN8ZW58MXx8fHwxNzc1MDg1OTY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'romantic-hotel-bedroom':
    'https://images.unsplash.com/photo-1637515128249-df66173ee9b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMGhvdGVsJTIwYmVkcm9vbSUyMGVsZWdhbnR8ZW58MXx8fHwxNzc1MDg1OTY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
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
    <article className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg">
      <img
        src={imageMap[room.imageUrl] ?? imageMap['hotel-room-single']}
        alt={room.name}
        className="h-48 w-full object-cover"
      />
      <div className="p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">{getRoomTypeLabel(room.type)}</p>
            <h2 className="mt-2 text-xl font-semibold text-gray-900">{room.name}</h2>
          </div>
          <p className="text-right text-2xl font-bold text-gray-900">{room.price}€</p>
        </div>

        <p className="mt-4 text-sm text-gray-600">{room.description}</p>

        <div className="mt-5 grid gap-2 sm:grid-cols-2 text-sm text-gray-700">
          <div className="rounded-2xl bg-gray-100 p-3">Capacité: {room.capacity}</div>
          <div className="rounded-2xl bg-gray-100 p-3">Surface: {room.size} m²</div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-xs text-gray-600">
          {room.amenities.slice(0, 3).map((amenity) => (
            <span key={amenity} className="rounded-full bg-gray-100 px-3 py-1">{amenity}</span>
          ))}
          {room.amenities.length > 3 && (
            <span className="rounded-full bg-gray-100 px-3 py-1">+{room.amenities.length - 3} autres</span>
          )}
        </div>

        <button
          type="button"
          disabled={!room.available}
          className="mt-6 w-full rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {room.available ? 'Réserver' : 'Indisponible'}
        </button>
      </div>
    </article>
  );
}
