'use client';
export default function KpiCard({ title, value, icon, trend, type }) {
  return (
    <div className="card kpi-card">
      <div className="kpi-header">
        <span className="kpi-title">{title}</span>
        <div className={`kpi-icon ${type}`}>
          {icon}
        </div>
      </div>
      <div className="kpi-body">
        <h2 className="kpi-value">{value}</h2>
        {trend && (
          <span className={`kpi-trend ${trend.startsWith('+') ? 'up' : 'down'}`}>
            {trend}
          </span>
        )}
      </div>

      <style jsx>{`
        .kpi-card {
           min-width: 280px;
           flex: 1;
        }
        .kpi-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }
        .kpi-title {
          font-size: 0.875rem;
          color: #64748b;
          font-weight: 500;
        }
        .kpi-icon {
          padding: 0.5rem;
          border-radius: 0.5rem;
          background: #f1f5f9;
          color: #2563eb;
        }
        .kpi-icon.danger {
          color: #ef4444;
          background: #fef2f2;
        }
        .kpi-value {
          font-size: 2rem;
          font-weight: 700;
          color: #1e293b;
        }
        .kpi-trend {
          font-size: 0.75rem;
          font-weight: 600;
          margin-left: 0.5rem;
        }
        .kpi-trend.up { color: #10b981; }
        .kpi-trend.down { color: #ef4444; }
        .kpi-body {
          display: flex;
          align-items: baseline;
        }
      `}</style>
    </div>
  );
}
