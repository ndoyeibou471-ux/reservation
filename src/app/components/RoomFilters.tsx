<<<<<<< HEAD
import type { FilterOptions, RoomType } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
=======
import type { ChangeEvent } from 'react';
import type { FilterOptions, RoomType } from '../../types';
>>>>>>> 4da003d9da55948f02f6ff571110dc052dc6a3c7

interface RoomFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
}

export function RoomFilters({ filters, onFiltersChange }: RoomFiltersProps) {
  const handleTypeChange = (value: string) => {
    onFiltersChange({ ...filters, type: value as RoomType | 'all' });
  };

<<<<<<< HEAD
  const handlePriceChange = (values: number[]) => {
    onFiltersChange({ 
      ...filters, 
      minPrice: values[0], 
      maxPrice: values[1] 
=======
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
>>>>>>> 4da003d9da55948f02f6ff571110dc052dc6a3c7
    });
  };

  const handleCapacityChange = (value: string) => {
<<<<<<< HEAD
    onFiltersChange({ 
      ...filters, 
      minCapacity: value === 'all' ? undefined : parseInt(value) 
    });
  };

  const handleAvailableOnlyChange = (checked: boolean) => {
    onFiltersChange({ ...filters, availableOnly: checked });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filtres</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Type de chambre */}
        <div className="space-y-2">
          <Label>Type de chambre</Label>
          <Select
            value={filters.type || 'all'}
            onValueChange={handleTypeChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Tous les types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              <SelectItem value="simple">Simple</SelectItem>
              <SelectItem value="double">Double</SelectItem>
              <SelectItem value="suite">Suite</SelectItem>
              <SelectItem value="deluxe">Deluxe</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Prix */}
        <div className="space-y-3">
          <Label>Prix par nuit</Label>
          <div className="px-2">
            <Slider
              min={0}
              max={400}
              step={10}
              value={[filters.minPrice || 0, filters.maxPrice || 400]}
              onValueChange={handlePriceChange}
              className="w-full"
            />
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{filters.minPrice || 0}€</span>
            <span>{filters.maxPrice || 400}€</span>
          </div>
        </div>

        {/* Capacité */}
        <div className="space-y-2">
          <Label>Nombre de personnes</Label>
          <Select
            value={filters.minCapacity?.toString() || 'all'}
            onValueChange={handleCapacityChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Tous" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous</SelectItem>
              <SelectItem value="1">1 personne</SelectItem>
              <SelectItem value="2">2 personnes</SelectItem>
              <SelectItem value="3">3 personnes</SelectItem>
              <SelectItem value="4">4+ personnes</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Disponibilité */}
        <div className="flex items-center justify-between">
          <Label htmlFor="available-only">Disponibles uniquement</Label>
          <Switch
            id="available-only"
            checked={filters.availableOnly || false}
            onCheckedChange={handleAvailableOnlyChange}
          />
        </div>
      </CardContent>
    </Card>
=======
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
>>>>>>> 4da003d9da55948f02f6ff571110dc052dc6a3c7
  );
}
