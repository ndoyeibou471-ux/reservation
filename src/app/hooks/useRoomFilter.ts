import { useMemo } from 'react';
import type { Room, FilterOptions } from '../../types';

export function useRoomFilter(rooms: Room[], filters: FilterOptions) {
  const filteredRooms = useMemo(() => {
    let result = [...rooms];

   
    if (filters.type && filters.type !== 'all') {
      result = result.filter(room => room.type === filters.type);
    }

    if (filters.minPrice !== undefined) {
      result = result.filter(room => room.price >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined) {
      result = result.filter(room => room.price <= filters.maxPrice!);
    }

        if (filters.minCapacity !== undefined) {
      result = result.filter(room => room.capacity >= filters.minCapacity!);
    }

       if (filters.availableOnly) {
      result = result.filter(room => room.available);
    }

    return result;
  }, [rooms, filters]);

  return filteredRooms;
}