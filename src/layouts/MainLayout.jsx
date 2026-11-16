import React from 'react';
import { Outlet } from 'react-router-dom';
import NavbarUtama from '../components/layout/NavbarUtama';
import Footer from '../components/layout/Footer';
import TombolWhatsAppMelayang from '../components/common/TombolWhatsAppMelayang';
import WidgetChatbot from '../components/common/WidgetChatbot';

export const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-latar text-cokelat-tua">
      <NavbarUtama />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <TombolWhatsAppMelayang />
      <WidgetChatbot />
    </div>
  );
};

export default MainLayout;
