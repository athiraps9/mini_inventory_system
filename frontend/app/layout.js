import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import './globals.css';

export const metadata = {
  title: 'StockFlow - Inventory Management',
  description: 'Manage your warehouse stock levels efficiently',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="app-container">
          <Sidebar />
          <div className="main-content">
            <Header />
            <main>{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
