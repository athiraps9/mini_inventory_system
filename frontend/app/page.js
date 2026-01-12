'use client';
import { useState, useEffect } from 'react';
import { productApi } from '@/utils/api';
import KpiCard from '@/components/KpiCard';
import InventoryTable from '@/components/InventoryTable';
import DeleteModal from '@/components/DeleteModal';
import { Package, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    inStockItems: 0,
    outOfStockItems: 0,
    lowStockItems: 0
  });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  
  // Modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [prodRes, statsRes] = await Promise.all([
        productApi.getProducts(page),
        productApi.getStats()
      ]);
      setProducts(prodRes.data.products);
      setPagination({
        totalPages: prodRes.data.totalPages,
        currentPage: prodRes.data.currentPage,
        totalItems: prodRes.data.totalItems
      });
      setStats(statsRes.data);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    try {
      await productApi.deleteProduct(productToDelete._id);
      setIsDeleteModalOpen(false);
      setProductToDelete(null);
      fetchData();
    } catch (err) {
      alert('Failed to delete product');
    }
  };

  if (loading && products.length === 0) return <div className="loading">Loading dashboard...</div>;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <p className="breadcrumb">Dashboard &nbsp; &gt; &nbsp; Inventory List</p>
        <h1>Inventory</h1>
      </div>

      <div className="kpi-grid">
        <KpiCard 
          title="Total Products" 
          value={stats.totalProducts} 
          icon={<Package size={20} />} 
          trend="+2.5%"
          type="primary"
        />
        <KpiCard 
          title="Out of Stock Items" 
          value={stats.outOfStockItems} 
          icon={<AlertCircle size={20} />} 
          trend="+2%"
          type="danger"
        />
      </div>

      <InventoryTable 
        products={products} 
        onDelete={handleDeleteClick}
        onPageChange={setPage}
        pagination={pagination}
      />

      <DeleteModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        productName={productToDelete?.name}
      />

      <style jsx>{`
        .dashboard {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .breadcrumb {
          font-size: 0.75rem;
          color: #64748b;
          margin-bottom: 0.5rem;
        }
        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
        }
        .loading {
          padding: 4rem;
          text-align: center;
          color: #64748b;
        }
      `}</style>
    </div>
  );
}
