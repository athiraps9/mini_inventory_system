'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Settings, LogOut, Package } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <Package size={24} color="#2563eb" />
        <span>StockFlow</span>
      </div>

      <div className="sidebar-user">
         <img src="https://ui-avatars.com/api/?name=Alex+Rivera&background=0D8ABC&color=fff" alt="User" />
         <div className="user-info">
            <p className="user-name">Alex Rivera</p>
            <p className="user-role">Admin Account</p>
         </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <Link 
            key={item.name} 
            href={item.path}
            className={`nav-item ${pathname === item.path ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <Link href="/settings" className="nav-item">
          <Settings size={20} />
          <span>Settings</span>
        </Link>
        <button className="nav-item sign-out">
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>

      <style jsx>{`
        .sidebar {
          width: 260px;
          height: 100vh;
          background: #fff;
          border-right: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          position: fixed;
          left: 0;
          top: 0;
        }

        .sidebar-logo {
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 700;
          font-size: 1.25rem;
          color: #1e293b;
        }

        .sidebar-user {
          margin: 0 1rem 1.5rem;
          padding: 0.75rem;
          background: #f8fafc;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .sidebar-user img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        .user-name {
          font-weight: 600;
          font-size: 0.875rem;
          color: #1e293b;
        }

        .user-role {
          font-size: 0.75rem;
          color: #64748b;
        }

        .sidebar-nav {
          flex: 1;
          padding: 0 1rem;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          color: #64748b;
          border-radius: 0.5rem;
          margin-bottom: 0.25rem;
          transition: all 0.2s;
        }

        .nav-item:hover {
          background: #f1f5f9;
          color: #1e293b;
        }

        .nav-item.active {
          background: #eff6ff;
          color: #2563eb;
        }

        .sidebar-footer {
          padding: 1rem;
          border-top: 1px solid #e2e8f0;
        }

        .sign-out {
          width: 100%;
          background: none;
          color: #ef4444;
        }

        .sign-out:hover {
          background: #fef2f2;
          color: #dc2626;
        }
      `}</style>
    </div>
  );
}
