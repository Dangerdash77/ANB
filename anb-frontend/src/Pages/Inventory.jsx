import React, { useState } from 'react';
import './Pages css/Inventory.css';

const initialProducts = [
  {
    id: 1,
    name: 'Curtain Roller Chain - Silver',
    sku: 'ANB-SLV-1001',
    quantity: 120,
    price: 35.0,
  },
  {
    id: 2,
    name: 'Curtain Roller Chain - Gold',
    sku: 'ANB-GLD-1002',
    quantity: 80,
    price: 38.5,
  },
  {
    id: 3,
    name: 'Curtain Roller Chain - Black',
    sku: 'ANB-BLK-1003',
    quantity: 45,
    price: 40.0,
  },
];

const Inventory = () => {
  const [products, setProducts] = useState(initialProducts);

  return (
    <div className="inventory-container">
      <h1 className="inventory-title">Inventory Dashboard</h1>
      <div className="inventory-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p><strong>SKU:</strong> {product.sku}</p>
            <p><strong>In Stock:</strong> {product.quantity} units</p>
            <p><strong>Price:</strong> ₹{product.price.toFixed(2)}</p>
            <button className="inventory-btn">Update</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventory;
