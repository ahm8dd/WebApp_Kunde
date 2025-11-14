import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout.jsx';
import Home from './Pages/Home.jsx';
import Services from './Pages/Services.jsx';
import Team from './Pages/Team.jsx';
import Gallery from './Pages/Gallery.jsx';
import Contact from './Pages/Contact.jsx';
import Booking from './Pages/Booking.jsx';
import BookingNotifications from './Pages/BookingNotifications.jsx';
import AdminBookings from './Pages/AdminBookings.jsx';
import TyreStock from './Pages/TyreStock.jsx';
import Impressum from './Pages/Impressum.jsx';
import Datenschutz from './Pages/Datenschutz.jsx';
import Sitemap from './Pages/Sitemap.jsx';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/team" element={<Team />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/booking-notifications" element={<BookingNotifications />} />
          <Route path="/admin/bookings" element={<AdminBookings />} />
          <Route path="/tyre-stock" element={<TyreStock />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          <Route path="/sitemap" element={<Sitemap />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
