import React from 'react';
import { Part } from '../types';

interface PartListProps {
  parts: Part[];
  onDeletePart: (id: string) => void;
  sortKey?: 'name' | 'quantity' | 'price';
  sortOrder?: 'asc' | 'desc';
  onSortChange?: (key: 'name' | 'quantity' | 'price') => void;
}

export const PartList: React.FC<PartListProps> = ({
  parts,
  onDeletePart,
  sortKey,
  sortOrder,
  onSortChange
}) => {
  if (parts.length === 0) {
    return (
      <div className="card">
        <h2>Parts Inventory</h2>
        <div className="empty-state">
          <p>No parts in inventory</p>
          <p>Add your first part using the form on the left.</p>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const getTotalValue = (): string => {
    const total = parts.reduce((sum, part) => sum + part.quantity * part.price, 0);
    return formatPrice(total);
  };

  const renderSortIndicator = (key: 'name' | 'quantity' | 'price') => {
    if (sortKey !== key) return null;
    return sortOrder === 'asc' ? ' ↑' : ' ↓';
  };

  return (
    <div className="card">
      <h2>Parts Inventory ({parts.length} items)</h2>
      <div className="parts-list">
        <table className="parts-table">
          <thead>
            <tr>
              <th
                style={{ cursor: 'pointer' }}
                onClick={() => onSortChange && onSortChange('name')}
              >
                Name{renderSortIndicator('name')}
              </th>
              <th
                style={{ cursor: 'pointer' }}
                onClick={() => onSortChange && onSortChange('quantity')}
              >
                Quantity{renderSortIndicator('quantity')}
              </th>
              <th
                style={{ cursor: 'pointer' }}
                onClick={() => onSortChange && onSortChange('price')}
              >
                Price{renderSortIndicator('price')}
              </th>
              <th>Total Value</th>
              <th>Added At</th> {/* New column */}
            </tr>
          </thead>
          <tbody>
            {parts.map((part) => (
              <tr key={part.id}>
                <td>{part.name}</td>
                <td>{part.quantity}</td>
                <td>{formatPrice(part.price)}</td>
                <td>{formatPrice(part.quantity * part.price)}</td>
                <td>{part.addedAt ? new Date(part.addedAt).toLocaleString() : '-'}</td>
                <td>
                  <button onClick={() => onDeletePart(part.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div
          style={{
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#f8f9fa',
            borderRadius: '6px',
            textAlign: 'right'
          }}
        >
          <strong>Total Inventory Value: {getTotalValue()}</strong>
        </div>
      </div>
    </div>
  );
};
