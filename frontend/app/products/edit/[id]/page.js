'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { productApi } from '@/utils/api';
import { Info, Box, DollarSign, ArrowLeft, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function EditProduct() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    sku: '',
    quantity: 0,
    price: 0,
    description: ''
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await productApi.getProduct(id);
        setFormData(res.data);
      } catch (err) {
        alert('Product not found');
        router.push('/');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' || name === 'price' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await productApi.updateProduct(id, formData);
      router.push('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Error updating product');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="loading">Loading product...</div>;

  return (
    <div className="add-product-page">
      <div className="page-header">
        <p className="breadcrumb">Dashboard &nbsp; &gt; &nbsp; Edit Product</p>
        <div className="title-row">
           <h1>Edit Stock Quantity</h1>
           <Link href="/" className="btn btn-outline">
              <ArrowLeft size={16} /> Back to Dashboard
           </Link>
        </div>
        <p className="text-muted">Adjust current inventory levels for high-performance items.</p>
      </div>

      <div className="edit-layout">
        <form onSubmit={handleSubmit} className="product-form">
          <div className="card form-section">
            <div className="section-title">
              <span>Product Information</span>
            </div>
            
            <div className="form-row">
              <div className="form-group half">
                <label>Product Name</label>
                <input type="text" value={formData.name} readOnly style={{ background: '#f8fafc' }} />
              </div>
              <div className="form-group half">
                <label>Category</label>
                <input type="text" value={formData.category} readOnly style={{ background: '#f8fafc' }} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group half">
                <label>SKU</label>
                <input type="text" value={formData.sku} readOnly style={{ background: '#f8fafc' }} />
              </div>
              <div className="form-group half">
                <label>Last Audit</label>
                <input type="text" value={new Date().toLocaleDateString() + ' 11:20'} readOnly style={{ background: '#f8fafc' }} />
              </div>
            </div>
          </div>

          <div className="card form-section">
            <div className="section-title">
              <span>Stock Adjustment</span>
            </div>
            
            <div className="adjustment-box">
               <div className="current-stock">
                  <p className="label">IN STOCK</p>
                  <h2 className="value">{formData.quantity}</h2>
                  <p className="unit">Units</p>
               </div>
               <div className="arrow">→</div>
               <div className="new-stock">
                  <label>New Stock Quantity</label>
                  <input 
                    type="number" 
                    name="quantity" 
                    min="0"
                    required
                    value={formData.quantity}
                    onChange={handleChange}
                  />
                  <p className="hint">Enter the total physical count currently available.</p>
               </div>
            </div>
          </div>

          <div className="form-actions-edit">
             <button type="button" onClick={() => router.back()} className="btn-text">Discard Changes</button>
             <button type="submit" disabled={saving} className="btn btn-primary">
               <RefreshCw size={18} className={saving ? 'spin' : ''} />
               {saving ? 'Updating...' : 'Update Inventory'}
             </button>
          </div>
        </form>

        <aside className="edit-sidebar">
          <div className="card sidebar-card insights">
            <h3>STOCK INSIGHTS</h3>
            <div className="insight-item">
               <span className="dot dot-green"></span>
               <span>Inventory health is <strong style={{ color: '#10b981' }}>Good </strong></span>
            </div>
            <div className="insight-item">
               <span className="dot dot-blue"></span>
               <span>Sales velocity: <strong>12 units/day</strong></span>
            </div>
          </div>

          <div className="card sidebar-card help-card">
            <h3>Need Help?</h3>
            <p>Adjusting stock levels affects your valuation and financial reports. Ensure counts are verified.</p>
            <a href="#" className="help-link">Read Inventory Guide &nbsp; ↗</a>
            <div className="help-icon-bg">
               <Box size={60} />
            </div>
          </div>
        </aside>
      </div>

      <style jsx>{`
        .add-product-page { max-width: 1100px; margin: 0 auto; }
        .page-header { margin-bottom: 2rem; }
        .breadcrumb { font-size: 0.75rem; color: #64748b; margin-bottom: 0.5rem; }
        .title-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
        
        .edit-layout {
           display: grid;
           grid-template-columns: 1fr 320px;
           gap: 2rem;
           align-items: start;
        }

        .product-form { display: flex; flex-direction: column; gap: 1.5rem; }
        .form-section { display: flex; flex-direction: column; gap: 1.5rem; }
        .section-title { 
          font-weight: 600; 
          color: #1e293b;
          border-bottom: 1px solid #f1f5f9;
          padding-bottom: 1rem;
          margin-bottom: 0.5rem;
        }

        .form-row { display: flex; gap: 1.5rem; }
        .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
        .half { flex: 1; }

        label { font-size: 0.875rem; font-weight: 500; color: #475569; }
        input {
          padding: 0.75rem;
          border: 1px solid #e2e8f0;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          transition: border-color 0.2s;
        }
        input:focus { border-color: #2563eb; }

        .adjustment-box {
           display: flex;
           align-items: center;
           gap: 2rem;
           padding: 1rem 0;
        }
        .current-stock {
           background: #eff6ff;
           padding: 1.5rem;
           border-radius: 0.75rem;
           text-align: center;
           min-width: 140px;
           border: 1px solid #dbeafe;
        }
        .current-stock .label { font-size: 0.625rem; font-weight: 700; color: #2563eb; margin-bottom: 0.5rem; }
        .current-stock .value { font-size: 2.25rem; font-weight: 800; color: #1e40af; line-height: 1; }
        .current-stock .unit { font-size: 0.75rem; color: #64748b; margin-top: 0.25rem; }
        .arrow { font-size: 1.5rem; color: #cbd5e1; }
        .new-stock { flex: 1; display: flex; flex-direction: column; gap: 0.5rem; }
        .new-stock input { font-size: 1.25rem; font-weight: 600; padding: 1rem; }
        .hint { font-size: 0.75rem; color: #94a3b8; font-style: italic; }

        .form-actions-edit {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1rem;
        }
        .btn-text { background: none; border: none; color: #64748b; font-weight: 500; font-size: 0.875rem; }
        .btn-text:hover { color: #1e293b; text-decoration: underline; }

        .edit-sidebar {
           display: flex;
           flex-direction: column;
           gap: 1.5rem;
        }
        .sidebar-card h3 {
           font-size: 0.75rem;
           font-weight: 700;
           color: #64748b;
           margin-bottom: 1rem;
           letter-spacing: 0.05em;
        }
        .insight-item {
           display: flex;
           align-items: center;
           gap: 0.75rem;
           font-size: 0.875rem;
           margin-bottom: 0.75rem;
           color: #475569;
        }
        .dot { width: 8px; height: 8px; border-radius: 50%; }
        .dot-green { background: #10b981; }
        .dot-blue { background: #3b82f6; }

        .help-card {
           background: #1e293b;
           color: white;
           padding: 1.5rem;
           position: relative;
           overflow: hidden;
        }
        .help-card h3 { color: white; }
        .help-card p { font-size: 0.8125rem; color: #cbd5e1; line-height: 1.6; margin-bottom: 1.5rem; position: relative; z-index: 1; }
        .help-link { color: #60a5fa; font-size: 0.8125rem; font-weight: 600; text-decoration: none; position: relative; z-index: 1; }
        .help-link:hover { text-decoration: underline; }
        .help-icon-bg {
           position: absolute;
           bottom: -10px;
           right: -10px;
           opacity: 0.1;
           transform: rotate(-15deg);
        }

        @media (max-width: 1024px) {
           .edit-layout { grid-template-columns: 1fr; }
           .edit-sidebar { order: -1; }
        }

        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .loading { padding: 4rem; text-align: center; color: #64748b; }
      `}</style>
    </div>
  );
}
