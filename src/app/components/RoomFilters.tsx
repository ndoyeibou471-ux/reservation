import type { ChangeEvent } from 'react';
import type { FilterOptions, RoomType } from '../../types';

interface RoomFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
}

export function RoomFilters({ filters, onFiltersChange }: RoomFiltersProps) {
  const handleTypeChange = (value: string) => {
    onFiltersChange({ ...filters, type: value as RoomType | 'all' });
  };

  const handleMinPriceChange = (value: string) => {
    onFiltersChange({
      ...filters,
      minPrice: value === '' ? undefined : Number(value),
    });
  };

  const handleMaxPriceChange = (value: string) => {
    onFiltersChange({
      ...filters,
      maxPrice: value === '' ? undefined : Number(value),
    });
  };

  const handleCapacityChange = (value: string) => {
    onFiltersChange({
      ...filters,
      minCapacity: value === 'all' ? undefined : Number(value),
    });
  };

  const handleAvailableOnlyChange = (event: ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ ...filters, availableOnly: event.target.checked });
  };

  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold text-gray-900">Filtres</h2>
      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Type de chambre</label>
          <select
            className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900"
            value={filters.type || 'all'}
            onChange={(event) => handleTypeChange(event.target.value)}
          >
            <option value="all">Tous</option>
            <option value="simple">Simple</option>
            <option value="double">Double</option>
            <option value="suite">Suite</option>
            <option value="deluxe">Deluxe</option>
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Prix minimum (€)</label>
          <input
            type="number"
            min={0}
            className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900"
            value={filters.minPrice ?? ''}
            onChange={(event) => handleMinPriceChange(event.target.value)}
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Prix maximum (€)</label>
          <input
            type="number"
            min={0}
            className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900"
            value={filters.maxPrice ?? ''}
            onChange={(event) => handleMaxPriceChange(event.target.value)}
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Capacité minimale</label>
          <select
            className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900"
            value={filters.minCapacity?.toString() ?? 'all'}
            onChange={(event) => handleCapacityChange(event.target.value)}
          >
            <option value="all">Tous</option>
            <option value="1">1 personne</option>
            <option value="2">2 personnes</option>
            <option value="3">3 personnes</option>
            <option value="4">4+ personnes</option>
          </select>
        </div>
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4">
          <span className="text-sm font-medium text-gray-700">Disponibles uniquement</span>
          <input
            type="checkbox"
            checked={filters.availableOnly ?? false}
            onChange={handleAvailableOnlyChange}
            className="h-5 w-5 rounded border-gray-300 text-blue-600"
          />
        </div>
      </div>
    </section>
  );
}
