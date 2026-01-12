'use client';
import { Search, Bell, HelpCircle, Plus } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="header">
      <div className="search-bar">
        <Search size={18} color="#64748b" />
        <input type="text" placeholder="Search by SKU, Product Name..." />
      </div>

      <div className="header-actions">
        <button className="icon-btn"><Bell size={20} /></button>
        <button className="icon-btn"><HelpCircle size={20} /></button>
        <Link href="/products/add" className="btn btn-primary">
          <Plus size={18} />
          Add Product
        </Link>
      </div>

      <style jsx>{`
        .header {
          height: 70px;
          background: #fff;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .search-bar {
          display: flex;
          align-items: center;
          background: #f1f5f9;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          gap: 0.5rem;
          width: 320px;
        }

        .search-bar input {
          background: none;
          border: none;
          flex: 1;
          font-size: 0.875rem;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .icon-btn {
          background: none;
          color: #64748b;
          padding: 0.5rem;
          border-radius: 0.5rem;
          transition: all 0.2s;
        }

        .icon-btn:hover {
          background: #f1f5f9;
          color: #1e293b;
        }
      `}</style>
    </header>
  );
}
