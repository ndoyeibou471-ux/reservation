import { Card, CardContent } from '../components/ui/card';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Marie Dubois',
    location: 'Dakar, Sénégal',
    rating: 5,
    comment: 'Un séjour exceptionnel ! Le service est impeccable et les chambres sont d\'un confort absolu. L\'emplacement au cœur des Champs-Élysées est parfait pour découvrir Dakar.',
    date: 'Mars 2026',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGF2YXRhcnxlbnwxfHx8fDE3NzUxNzI3MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: '2',
    name: 'Jean-Pierre Martin',
    location: 'Dakar, Sénégal',
    rating: 5,
    comment: 'L\'Paradise Hotel Dakar a dépassé toutes mes attentes. Le restaurant propose une cuisine raffinée et le spa est un véritable havre de paix. Je recommande vivement !',
    date: 'Février 2026',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBhdmF0YXJ8ZW58MXx8fHwxNzc1MTcyNzMzfDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: '3',
    name: 'Sophie Laurent',
    location: 'Bruxelles, Belgique',
    rating: 5,
    comment: 'Séjour d\'affaires parfait. Le WiFi haut débit et les salles de réunion modernes ont facilité mon travail. Le personnel est d\'une gentillesse remarquable.',
    date: 'Janvier 2026',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGF2YXRhcnxlbnwxfHx8fDE3NzUxNzI3MzN8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: '4',
    name: 'Michel Bernard',
    location: 'Genève, Suisse',
    rating: 5,
    comment: 'L\'attention aux détails et le service personnalisé font de cet hôtel une référence. La vue sur la ville depuis ma suite était spectaculaire.',
    date: 'Décembre 2025',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBhdmF0YXJ8ZW58MXx8fHwxNzc1MTcyNzM0fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: '5',
    name: 'Isabelle Moreau',
    location: 'Montréal, Canada',
    rating: 5,
    comment: 'Un accueil chaleureux et des prestations de haute qualité. Le petit-déjeuner était délicieux et le service de conciergerie m\'a aidée à organiser mes visites dakaroises.',
    date: 'Novembre 2025',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGF2YXRhcnxlbnwxfHx8fDE3NzUxNzI3MzV8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: '6',
    name: 'Pierre Dubois',
    location: 'Londres, Royaume-Uni',
    rating: 5,
    comment: 'Exceptionnel ! La combinaison parfaite entre luxe traditionnel et confort moderne. Le personnel parle plusieurs langues et l\'emplacement est idéal.',
    date: 'Octobre 2025',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBhdmF0YXJ8ZW58MXx8fHwxNzc1MTcyNzM2fDA&ixlib=rb-4.1.0&q=80&w=1080'
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-16 section-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-4 animate-fade-in-up">
            Ce que disent nos clients
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto animate-fade-in-up animate-delay-02">
            Découvrez les expériences de nos clients satisfaits et laissez-vous convaincre par leur retour
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-animation">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="testimonial-card card-hover">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Quote className="h-8 w-8 text-primary opacity-20 mr-2" />
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400 star" />
                    ))}
                  </div>
                </div>

                <blockquote className="text-muted-foreground mb-4 italic">
                  "{testimonial.comment}"
                </blockquote>

                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-semibold mr-3">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.location}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.date}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400 star animate-pulse-gentle" style={{ animationDelay: `${i * 0.1}s` }} />
              ))}
            </div>
            <span className="font-semibold text-primary ml-2">4.9/5 basé sur 2,847 avis</span>
          </div>
        </div>
      </div>
    </section>
  );
}