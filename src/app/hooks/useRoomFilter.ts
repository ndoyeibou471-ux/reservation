import { useMemo } from 'react';
<<<<<<< HEAD
import { type Room, type FilterOptions } from '../types';
=======
import type { Room, FilterOptions } from '../../types';
>>>>>>> 4da003d9da55948f02f6ff571110dc052dc6a3c7

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
<<<<<<< HEAD
}
=======
}
>>>>>>> 4da003d9da55948f02f6ff571110dc052dc6a3c7
