import type { HotelInfo, HotelService } from '../types/hotel';

export const hotelInfo: HotelInfo = {
  name: 'Paradise Hotel',
  description: 'Un établissement 5 étoiles au cœur de Dakar, alliant luxe, confort et service d\'exception. Situé à proximité des monuments les plus emblématiques de la capitale, Paradise Hotel vous offre une expérience inoubliable dans un cadre raffiné.',
  address: '15 Avenue Cheikh Anta Diop, 75008 Dakar, sénégal',
  phone: '+221 76 425 78 90',
  email: 'contact@paradise-hotel.sn',
  stars: 5,
  checkInTime: '15h00',
  checkOutTime: '12h00',
};

export const hotelServices: HotelService[] = [
  {
    id: 'service-1',
    name: 'Piscine & Terrasse',
    description: 'Piscine chauffée sur le toit avec vue panoramique sur Dakar. Ouverte toute l\'année avec espace détente et bar.',
    icon: 'waves',
    imageUrl: 'https://images.unsplash.com/photo-1547064663-a07e03f25fca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHN3aW1taW5nJTIwcG9vbCUyMGx1eHVyeXxlbnwxfHx8fDE3NzUxMTc0MDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'service-2',
    name: 'Restaurant Gastronomique',
    description: 'Cuisine sénégalaise raffinée par notre chef étoilé. Menu changeant au fil des saisons avec produits locaux.',
    icon: 'utensils',
    imageUrl: 'https://images.unsplash.com/photo-1768697358705-c1b60333da35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHJlc3RhdXJhbnQlMjBlbGVnYW50JTIwZGluaW5nfGVufDF8fHx8MTc3NTE2MzI1NHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'service-3',
    name: 'Spa & Wellness',
    description: 'Centre de bien-être complet avec massages, soins, hammam et salle de fitness équipée.',
    icon: 'sparkles',
    imageUrl: 'https://images.unsplash.com/photo-1677763856232-d9eb9e127e9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHNwYSUyMHdlbGxuZXNzJTIwcmVsYXhhdGlvbnxlbnwxfHx8fDE3NzUxNzI3MzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'service-4',
    name: 'Conciergerie 24/7',
    description: 'Service de conciergerie disponible jour et nuit pour répondre à tous vos besoins et organiser vos activités.',
    icon: 'bell-concierge',
    imageUrl: '',
  },
  {
    id: 'service-5',
    name: 'Parking & Voiturier',
    description: 'Parking sécurisé souterrain avec service de voiturier disponible pour votre confort.',
    icon: 'car',
    imageUrl: '',
  },
  {
    id: 'service-6',
    name: 'Salles de Réunion',
    description: 'Espaces modulables équipés pour vos événements professionnels et réceptions privées.',
    icon: 'presentation',
    imageUrl: '',
  },
];