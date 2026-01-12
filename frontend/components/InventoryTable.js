'use client';
import { Edit2, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function InventoryTable({ products, onDelete, onPageChange, pagination }) {
  return (
    <div className="card table-card">
      <div className="table-header">
        <div className="header-info">
           <h3>Inventory</h3>
           <p className="text-muted">Manage and track your warehouse stock levels efficiently.</p>
        </div>
        <div className="table-actions">
           <button className="btn btn-outline">Export CSV</button>
           <button className="btn btn-outline">Filter</button>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>PRODUCT NAME</th>
              <th>SKU</th>
              <th>CATEGORY</th>
              <th>STOCK QUANTITY</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>
                  <div className="product-name-cell">
                    <div className="product-img-placeholder"></div>
                    <span>{product.name}</span>
                  </div>
                </td>
                <td>{product.sku}</td>
                <td>{product.category}</td>
                <td>{product.quantity}</td>
                <td>
                  <span className={`badge ${product.status === 'In Stock' ? 'badge-success' : 'badge-danger'}`}>
                    {product.status}
                  </span>
                </td>
                <td className="actions-cell">
                  <Link href={`/products/edit/${product._id}`} className="action-btn edit">
                    <Edit2 size={16} />
                  </Link>
                  <button onClick={() => onDelete(product)} className="action-btn delete">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                  No products found. Start by adding one!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <span className="pagination-info">
          Showing {((pagination.currentPage - 1) * 10) + 1} to {Math.min(pagination.currentPage * 10, pagination.totalItems)} of {pagination.totalItems} results
        </span>
        <div className="pagination-controls">
          <button 
            disabled={pagination.currentPage === 1}
            onClick={() => onPageChange(pagination.currentPage - 1)}
            className="btn btn-outline p-btn"
          >
            <ChevronLeft size={16} /> Previous
          </button>
          {[...Array(pagination.totalPages)].map((_, i) => (
            <button 
              key={i + 1}
              onClick={() => onPageChange(i + 1)}
              className={`btn btn-outline p-num ${pagination.currentPage === i + 1 ? 'active' : ''}`}
            >
              {i + 1}
            </button>
          ))}
          <button 
            disabled={pagination.currentPage === pagination.totalPages}
            onClick={() => onPageChange(pagination.currentPage + 1)}
            className="btn btn-outline p-btn"
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <style jsx>{`
        .table-card { padding: 0; overflow: hidden; }
        .table-header {
          padding: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #e2e8f0;
        }
        .header-info h3 { margin-bottom: 0.25rem; font-size: 1.25rem; }
        .table-actions { display: flex; gap: 0.75rem; }
        
        .table-wrapper { width: 100%; overflow-x: auto; }
        .inventory-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }
        .inventory-table th {
          background: #f8fafc;
          padding: 1rem 1.5rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .inventory-table td {
          padding: 1rem 1.5rem;
          border-bottom: 1px solid #f1f5f9;
          font-size: 0.875rem;
          vertical-align: middle;
        }
        .product-name-cell { display: flex; align-items: center; gap: 0.75rem; }
        .product-img-placeholder {
          width: 32px;
          height: 32px;
          border-radius: 0.25rem;
          background: #e2e8f0;
        }
        .actions-cell { display: flex; gap: 0.5rem; }
        .action-btn {
          padding: 0.4rem;
          border-radius: 0.375rem;
          color: #64748b;
          background: none;
          border: 1px solid #e2e8f0;
          transition: all 0.2s;
          display: inline-flex;
          align-items: center;
        }
        .action-btn.edit:hover { background: #f1f5f9; color: #1e293b; }
        .action-btn.delete:hover { background: #fef2f2; color: #ef4444; border-color: #fca5a5; }

        .table-footer {
          padding: 1rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #fff;
        }
        .pagination-info { font-size: 0.875rem; color: #64748b; }
        .pagination-controls { display: flex; gap: 0.5rem; }
        .p-btn { font-size: 0.875rem; padding: 0.4rem 0.75rem; }
        .p-num { width: 32px; height: 32px; padding: 0; }
        .p-num.active { background: #2563eb; color: white; border-color: #2563eb; }
      `}</style>
    </div>
  );
}
