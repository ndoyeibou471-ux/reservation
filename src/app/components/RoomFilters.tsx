import type { FilterOptions, RoomType } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';

interface RoomFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
}

export function RoomFilters({ filters, onFiltersChange }: RoomFiltersProps) {
  const handleTypeChange = (value: string) => {
    onFiltersChange({ ...filters, type: value as RoomType | 'all' });
  };

  const handlePriceChange = (values: number[]) => {
    onFiltersChange({ 
      ...filters, 
      minPrice: values[0], 
      maxPrice: values[1] 
    });
  };

  const handleCapacityChange = (value: string) => {
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
  );
}
