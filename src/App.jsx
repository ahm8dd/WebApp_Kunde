import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importiert das Layout
// KORREKTUR: Pfad von "../Layout.jsx" zu "./Layout.jsx" geändert, da App.jsx in src/ liegt
import Layout from "../Layout.jsx";

// Importiert alle Seiten
// KORREKTUR: Pfade von "../Pages/..." zu "./Pages/..." geändert
import ScrollToTop from "../components/ScrollToTop";
import Home from "../Pages/Home.jsx";
import Services from "../Pages/Services.jsx";
import TyreStock from "../Pages/TyreStock.jsx";
import Booking from "../Pages/Booking.jsx";
import Contact from "../Pages/Contact.jsx";
import Team from "../Pages/Team.jsx";
import Sitemap from "../Pages/Sitemap.jsx";
import Impressum from "../Pages/Impressum.jsx";
import Datenschutz from "../Pages/Datenschutz.jsx";
import AdminBookings from "../Pages/AdminBookings.jsx";

// Import ChatBot (liegt im gleichen Ordner src/)
{
  /*import ChatBot from "./ChatBot";*/
}

const PageNotFound = () => <h1>404 | Seite nicht gefunden</h1>;

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Hauptseiten, verpackt im Layout */}
        <Route
          path="/"
          element={
            <Layout currentPageName="Home">
              <Home />
            </Layout>
          }
        />
        <Route
          path="/Services"
          element={
            <Layout currentPageName="Services">
              <Services />
            </Layout>
          }
        />
        <Route
          path="/TyreStock"
          element={
            <Layout currentPageName="TyreStock">
              <TyreStock />
            </Layout>
          }
        />
        <Route
          path="/Booking"
          element={
            <Layout currentPageName="Booking">
              <Booking />
            </Layout>
          }
        />
        <Route
          path="/Contact"
          element={
            <Layout currentPageName="Contact">
              <Contact />
            </Layout>
          }
        />
        <Route
          path="/Team"
          element={
            <Layout currentPageName="Team">
              <Team />
            </Layout>
          }
        />
        <Route
          path="/Sitemap"
          element={
            <Layout currentPageName="Sitemap">
              <Sitemap />
            </Layout>
          }
        />
        <Route
          path="/Impressum"
          element={
            <Layout currentPageName="Impressum">
              <Impressum />
            </Layout>
          }
        />
        <Route
          path="/Datenschutz"
          element={
            <Layout currentPageName="Datenschutz">
              <Datenschutz />
            </Layout>
          }
        />

        {/* Admin Route */}
        <Route
          path="/admin/bookings"
          element={
            <Layout currentPageName="AdminBookings">
              <AdminBookings />
            </Layout>
          }
        />

        {/* Fallback-Route für nicht gefundene Seiten */}
        <Route
          path="*"
          element={
            <Layout>
              <PageNotFound />
            </Layout>
          }
        />
      </Routes>

      {/* ChatBot Integration - auf allen Seiten sichtbar */}

      {/* ChatBot Integration - auf allen Seiten sichtbar */}
      {/* <ChatBot /> */}
    </BrowserRouter>
  );
}
