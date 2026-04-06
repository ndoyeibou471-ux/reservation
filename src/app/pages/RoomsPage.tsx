import { useState } from 'react';
import { RoomCard } from '../components/RoomCard';
import { RoomFilters } from '../components/RoomFilters';
import { useRoomFilter } from '../hooks/useRoomFilter';
import { mockRooms } from '../data/mockRooms';
import type { FilterOptions } from '../../types';

export default function RoomsPage() {
  const [filters, setFilters] = useState<FilterOptions>({
    type: 'all',
    minPrice: undefined,
    maxPrice: undefined,
    minCapacity: undefined,
    availableOnly: false,
  });

  const filteredRooms = useRoomFilter(mockRooms, filters);

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="rounded-3xl bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-semibold text-gray-900">Nos Chambres</h1>
          <p className="mt-3 text-gray-600">Découvrez les chambres disponibles et filtrez selon vos besoins.</p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          <RoomFilters filters={filters} onFiltersChange={setFilters} />

          <section className="space-y-6">
            {filteredRooms.length === 0 ? (
              <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
                <p className="text-gray-600">Aucune chambre ne correspond à vos critères.</p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2">
                {filteredRooms.map((room) => (
                  <RoomCard key={room.id} room={room} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
