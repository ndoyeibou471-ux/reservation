
import { createBrowserRouter } from 'react-router';
import HomePage from './pages/HomePage';
import { RoomsPage } from './pages/RoomsPage';
import { RoomDetails } from './pages/RoomDetails';
import { BookingPage } from './pages/BookingPage';
import { ConfirmationPage } from './pages/ConfirmationPage';
import { MyBookings } from './pages/MyBookings';
import { AboutPage } from './pages/AboutPage';
import { Header } from './components/Header';

// Layout component avec header
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-blue-500 py-8 bg-blue-700 text-blue-50">
        <div className="container mx-auto px-4 text-blue-100">
          <div className="grid md:grid-cols-3 gap-8 mb-6">
            <div>
              <h3 className="font-semibold mb-3 text-blue-100">Paradise Hotel </h3>
              <p className="text-sm">
                Un établissement 5 étoiles au cœur de Dakar, alliant luxe, confort et service d'exception.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-blue-100">Contact</h3>
              <p className="text-sm">
                15 Avenue Cheikh Anta Diop<br />
                75008 Dakar, Sénégal<br />
                +221 33 888 99 00<br />
                contact@paradise-hotel-dakar.sn
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-blue-100">Horaires</h3>
              <p className="text-sm">
                Réception ouverte 24h/24<br />
                Check-in: 15h00<br />
                Check-out: 12h00
              </p>
            </div>
          </div>
          <div className="border-t border-blue-500 pt-6 text-center text-sm text-blue-100/80">
            <p>© 2026 Paradise Hotel Dakar. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Page 404
function NotFound() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-6xl mb-4">404</h1>
        <p className="text-xl text-muted-foreground">Page non trouvée</p>
      </div>
    </Layout>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <HomePage />
      </Layout>
    ),
  },
  {
    path: '/about',
    element: (
      <Layout>
        <AboutPage />
      </Layout>
    ),
  },
  {
    path: '/rooms',
    element: (
      <Layout>
        <RoomsPage />
      </Layout>
    ),
  },
  {
    path: '/rooms/:id',
    element: (
      <Layout>
        <RoomDetails />
      </Layout>
    ),
  },
  {
    path: '/booking',
    element: (
      <Layout>
        <BookingPage />
      </Layout>
    ),
  },
  {
    path: '/confirmation',
    element: (
      <Layout>
        <ConfirmationPage />
      </Layout>
    ),
  },
  {
    path: '/my-bookings',
    element: (
      <Layout>
        <MyBookings />
      </Layout>
    ),
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);