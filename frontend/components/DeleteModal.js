'use client';
import { AlertTriangle, X, Info } from 'lucide-react';

export default function DeleteModal({ isOpen, onClose, onConfirm, productName }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          <X size={20} />
        </button>
        
        <div className="modal-body">
          <div className="warning-icon-wrapper">
             <AlertTriangle size={32} color="#ef4444" />
          </div>
          
          <h2>Delete Product</h2>
          <p className="description">
            Are you sure you want to delete <br />
            <strong>"{productName}"</strong>?
          </p>

          <div className="warning-box">
             <Info size={16} />
             <span>THIS ACTION CANNOT BE UNDONE</span>
          </div>

          <div className="modal-actions">
            <button className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-danger-solid" onClick={onConfirm}>
              Delete Product
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(15, 23, 42, 0.4);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          background: #fff;
          width: 100%;
          max-width: 440px;
          border-radius: 1rem;
          padding: 2.5rem 2rem;
          position: relative;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .close-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          color: #94a3b8;
          padding: 0.5rem;
          border-radius: 0.5rem;
          transition: all 0.2s;
        }

        .close-btn:hover {
          background: #f1f5f9;
          color: #1e293b;
        }

        .modal-body {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .warning-icon-wrapper {
          width: 64px;
          height: 64px;
          background: #fef2f2;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 0.75rem;
        }

        .description {
          color: #64748b;
          font-size: 0.9375rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .warning-box {
          width: 100%;
          background: #f8fafc;
          padding: 0.75rem;
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          color: #64748b;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.025em;
          margin-bottom: 2rem;
        }

        .modal-actions {
          display: flex;
          gap: 1rem;
          width: 100%;
        }

        .modal-actions button {
          flex: 1;
          padding: 0.875rem;
          font-size: 0.875rem;
        }

        .btn-danger-solid {
          background: #dc2626;
          color: white;
          font-weight: 600;
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px -1px rgba(220, 38, 38, 0.2);
        }

        .btn-danger-solid:hover {
          background: #b91c1c;
        }
      `}</style>
    </div>
  );
}
