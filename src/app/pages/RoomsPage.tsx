<<<<<<< HEAD
import { useState, useEffect } from 'react';
import { mockRooms } from '../data/mockRooms';
import type { FilterOptions } from '../types';
import { useRoomFilter } from '../hooks/useRoomFilter';
import { RoomCard } from '../components/RoomCard';
import { RoomFilters } from '../components/RoomFilters';
import { Input } from '../components/ui/input';
import { Search } from 'lucide-react';

export function RoomsPage() {
  const [filters, setFilters] = useState<FilterOptions>({
    type: 'all',
    minPrice: 0,
    maxPrice: 400,
    availableOnly: false,
  });

  const [searchQuery, setSearchQuery] = useState('');
  const filteredRooms = useRoomFilter(mockRooms, filters);

  // Filtrage supplémentaire par recherche textuelle
  const searchedRooms = filteredRooms.filter(room =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    room.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // useEffect pour logger les changements de filtres (démonstration)
  useEffect(() => {
    console.log('Filtres mis à jour:', filters);
  }, [filters]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl mb-4">
          Nos Chambres
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Découvrez notre collection de chambres luxueuses, chacune conçue pour vous offrir un confort exceptionnel
        </p>
      </div>

      {/* Barre de recherche */}
      <div className="max-w-xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Rechercher une chambre..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        {/* Sidebar avec filtres */}
        <aside className="md:col-span-1">
          <div className="sticky top-24">
            <RoomFilters filters={filters} onFiltersChange={setFilters} />
          </div>
        </aside>

        {/* Liste des chambres */}
        <main className="md:col-span-3">
          <div className="mb-6">
            <p className="text-muted-foreground">
              {searchedRooms.length} chambre{searchedRooms.length > 1 ? 's' : ''} disponible{searchedRooms.length > 1 ? 's' : ''}
            </p>
          </div>

          {searchedRooms.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">
                Aucune chambre ne correspond à vos critères
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchedRooms.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
=======
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
>>>>>>> 4da003d9da55948f02f6ff571110dc052dc6a3c7
  );
}
