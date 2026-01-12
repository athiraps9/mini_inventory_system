'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { productApi } from '@/utils/api';
import { Info, Box, DollarSign, List, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AddProduct() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    sku: '',
    quantity: 0,
    price: 0,
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' || name === 'price' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await productApi.createProduct(formData);
      router.push('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-page">
      <div className="page-header">
        <p className="breadcrumb">Dashboard &nbsp; &gt; &nbsp; Add New Product</p>
        <div className="title-row">
           <h1>Add New Product</h1>
           <Link href="/" className="btn btn-outline">
              <ArrowLeft size={16} /> Back to Dashboard
           </Link>
        </div>
        <p className="text-muted">Fill in the details below to add a new item to your retail inventory.</p>
      </div>

      <form onSubmit={handleSubmit} className="product-form">
        <div className="card form-section">
          <div className="section-title">
            <Info size={18} color="#2563eb" />
            <span>General Information</span>
          </div>
          
          <div className="form-group full">
            <label>Product Name</label>
            <input 
              type="text" 
              name="name" 
              placeholder="e.g. Premium Wireless Headphones M-200" 
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group half">
              <label>Category</label>
              <select name="category" required value={formData.category} onChange={handleChange}>
                <option value="">Select a category</option>
                <option value="Electronics">Electronics</option>
                <option value="Footwear">Footwear</option>
                <option value="Accessories">Accessories</option>
                <option value="Home & Garden">Home & Garden</option>
              </select>
            </div>
            <div className="form-group half">
              <label>SKU / Serial Number</label>
              <input 
                type="text" 
                name="sku" 
                placeholder="e.g. WH-100-BLUE" 
                required
                value={formData.sku}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="card form-section">
          <div className="section-title">
            <Box size={18} color="#2563eb" />
            <span>Inventory & Pricing</span>
          </div>
          
          <div className="form-row">
            <div className="form-group half">
              <label>Stock Quantity</label>
              <input 
                type="number" 
                name="quantity" 
                min="0"
                required
                value={formData.quantity}
                onChange={handleChange}
              />
            </div>
            <div className="form-group half">
              <label>Unit Price ($)</label>
              <input 
                type="number" 
                name="price" 
                min="0"
                step="0.01"
                required
                value={formData.price}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group full">
            <label>Product Description (Optional)</label>
            <textarea 
              name="description" 
              rows="4" 
              placeholder="Provide details about the item's specifications..."
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>

        <div className="form-actions">
           <button type="button" onClick={() => router.back()} className="btn btn-outline">Cancel</button>
           <button type="submit" disabled={loading} className="btn btn-primary">
             {loading ? 'Saving...' : 'Save Product'}
           </button>
        </div>
      </form>

      <style jsx>{`
        .add-product-page { max-width: 800px; margin: 0 auto; }
        .page-header { margin-bottom: 2rem; }
        .breadcrumb { font-size: 0.75rem; color: #64748b; margin-bottom: 0.5rem; }
        .title-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
        
        .product-form { display: flex; flex-direction: column; gap: 1.5rem; }
        .form-section { display: flex; flex-direction: column; gap: 1.5rem; }
        .section-title { 
          display: flex; 
          align-items: center; 
          gap: 0.75rem; 
          font-weight: 600; 
          color: #1e293b;
          border-bottom: 1px solid #f1f5f9;
          padding-bottom: 1rem;
          margin-bottom: 0.5rem;
        }

        .form-row { display: flex; gap: 1.5rem; }
        .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
        .full { width: 100%; }
        .half { flex: 1; }

        label { font-size: 0.875rem; font-weight: 500; color: #475569; }
        input, select, textarea {
          padding: 0.75rem;
          border: 1px solid #e2e8f0;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          transition: border-color 0.2s;
        }
        input:focus, select:focus, textarea:focus { border-color: #2563eb; }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 1rem;
          padding-bottom: 3rem;
        }
      `}</style>
    </div>
  );
}
