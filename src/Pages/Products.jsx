import React, { useState } from 'react';
import './Pages css/Products.css';
import cartIcon from '../assets/cart.png';
import img1 from '../assets/product img/6 Gear Control.png';
import img2 from '../assets/product img/Zebra Metal.png';
import img3 from '../assets/product img/Zebra Plastic.png';
import img4 from '../assets/product img/Roman Control.png';
import img5 from '../assets/product img/M Runner.png';
import img6 from '../assets/product img/Arabian Trishul.png';
import img7 from '../assets/product img/Arabian Mindi.png';
import img8 from '../assets/product img/Bottom Chain.png';
import img9 from '../assets/product img/Endless chain.png';
import img10 from '../assets/product img/EndlessWhite.jpg';
import img11 from '../assets/product img/Operation Chain B.jpg';
import img12 from '../assets/product img/Operation Chain Brown.jpg';
import img13 from '../assets/product img/Operation Chain S.jpg';
import img14 from '../assets/product img/Cod Weight 1.png';
import img15 from '../assets/product img/Cod Weight 2.png';

const sampleProducts = [
  {
    id: 1,
    name: 'Roller Chain',
    number: 'RC101',
    size: '15mm',
    design: 'Classic',
    colour: 'red',
    standardQty: '50 pcs',
    image: img1,
    minQty: 10,
    fields: ['size', 'design', 'standardQty', 'colour'],
  },
  {
    id: 2,
    name: 'Steel Roller',
    number: 'SR202',
    size: '20mm',
    standardQty: '50 pcs',
    image: img2,
    minQty: 5,
    fields: ['size', 'standardQty'],
  },
  {
    id: 3,
    name: 'Aluminum System',
    number: 'AS303',
    size: '10mm',
    colour: 'Silver',
    image: img3,
    minQty: 3,
    fields: ['name', 'colour', 'size'],
  },
  {
    id: 4,
    name: 'Aluminum System',
    number: 'AS304',
    size: '12mm',
    design: 'Textured',
    image: img4,
    minQty: 3,
    fields: ['size', 'design'],
  },
  {
    id: 5,
    name: 'Aluminum System',
    number: 'AS304',
    size: '12mm',
    design: 'Textured',
    image: img5,
    minQty: 3,
    fields: ['size', 'design'],
  },
  {
    id: 6,
    name: 'Aluminum System',
    number: 'AS304',
    size: '12mm',
    design: 'Textured',
    image: img6,
    minQty: 3,
    fields: ['size', 'design'],
  },
  {
    id: 7,
    name: 'Aluminum System',
    number: 'AS304',
    size: '12mm',
    design: 'Textured',
    image: img7,
    minQty: 3,
    fields: ['size', 'design'],
  },
  {
    id: 8,
    name: 'Aluminum System',
    number: 'AS304',
    size: '12mm',
    design: 'Textured',
    image: img8,
    minQty: 3,
    fields: ['size', 'design'],
  },
  {
    id: 9,
    name: 'Aluminum System',
    number: 'AS304',
    size: '12mm',
    design: 'Textured',
    image: img9,
    minQty: 3,
    fields: ['size', 'design'],
  },
  {
    id: 10,
    name: 'Aluminum System',
    number: 'AS304',
    size: '12mm',
    design: 'Textured',
    image: img10,
    minQty: 3,
    fields: ['size', 'design'],
  },
  {
    id: 11,
    name: 'Aluminum System',
    number: 'AS304',
    size: '12mm',
    design: 'Textured',
    image: img11,
    minQty: 3,
    fields: ['size', 'design'],
  },
  {
    id: 12,
    name: 'Aluminum System',
    number: 'AS304',
    size: '12mm',
    design: 'Textured',
    image: img12,
    minQty: 3,
    fields: ['size', 'design'],
  },
  {
    id: 13,
    name: 'Aluminum System',
    number: 'AS304',
    size: '12mm',
    design: 'Textured',
    image: img13,
    minQty: 3,
    fields: ['size', 'design'],
  },
  {
    id: 14,
    name: 'Aluminum System',
    number: 'AS304',
    size: '12mm',
    design: 'Textured',
    image: img14,
    minQty: 3,
    fields: ['size', 'design'],
  },
  {
    id: 15,
    name: 'Aluminum System',
    number: 'AS304',
    size: '12mm',
    design: 'Textured',
    image: img15,
    minQty: 3,
    fields: ['size', 'design'],
  },
];


const ProductPage = () => {
  const [cart, setCart] = useState([]);
  const [formType, setFormType] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    company: '',
  });

  const isInCart = (productId) => cart.find((p) => p.id === productId);

  const toggleCart = (product) => {
    if (isInCart(product.id)) {
      setCart((prev) => prev.filter((p) => p.id !== product.id));
    } else {
      setCart((prev) => [...prev, { ...product, quantity: product.minQty }]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleQuantityChange = (productId, value) => {
    setCart(prev =>
      prev.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(Number(value), item.minQty) }
          : item
      )
    );
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://anb-nuis.vercel.app/api/send-mail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: formType,
          ...formData,
          items: cart.map(({ id, name, quantity }) => ({
            id,
            name,
            quantity: formType === "Sample" ? 1 : quantity
          }))
        })
      });

      const result = await response.json();

      if (result.success) {
        alert(`${formType} request submitted successfully.`);
        setCart([]);
        setFormType(null);
        setFormData({ name: '', email: '', phone: '', address: '', company: '' });
      } else {
        alert('Failed to send request.');
      }
    } catch (err) {
      console.error(err);
      alert('Error submitting the form.');
    }
  };

  return (
    <div className="product-page">
      {/* Cart Icon */}
      <div className="cart-button">
        <img src={cartIcon} alt="Cart" />
        <span className="cart-count">{cart.length}</span>
      </div>

      {/* Product Grid */}
      <div className="product-grid">
        {sampleProducts.map((product) => (
          <div key={product.id} className="product-vertical-card">
            <img src={product.image} alt={product.name} />
            <div className="product-details">
              <h3>{product.name}</h3>
              {product.fields.includes('size') && (
                <p><strong>Size:</strong> {product.size}</p>
              )}
              {product.fields.includes('design') && (
                <p><strong>Design:</strong> {product.design}</p>
              )}
              {product.fields.includes('colour') && (
                <p><strong>Colour:</strong> {product.colour}</p>
              )}
              {product.fields.includes('standardQty') && (
                <p><strong>Standard Qty:</strong> {product.standardQty}</p>
              )}

              <button onClick={() => toggleCart(product)} className="add-cart">
                {isInCart(product.id) ? '−' : '+'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Panel */}
      <div className="cart-panel">
        <h2>Cart Summary</h2>
        {cart.length === 0 ? (
          <p>No products added yet.</p>
        ) : (
          <div className="cart-preview-list">
            {cart.map((item) => (
              <div key={item.id} className="cart-preview-card">
                <img src={item.image} alt={item.name} />
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        )}
        <div className="cart-actions">
          <button onClick={() => setFormType('Quote')}>Get a Quote</button>
          <button onClick={() => setFormType('Sample')}>Request Sample</button>
          <button onClick={() => setFormType('Order')}>Place Order</button>
        </div>
      </div>

      {/* Form Modal */}
      {formType && (
        <div className="form-overlay">
          <div className="form-container">
            <h2>{formType} Form</h2>

            {cart.length === 0 ? (
              <>
                <p className="warning-text">Please add products before submitting.</p>
                <div className="form-actions">
                  <button onClick={() => setFormType(null)}>Close</button>
                </div>
              </>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <label>
                  Name:
                  <input name="name" value={formData.name} onChange={handleChange} required />
                </label>
                <label>
                  Mobile Number:
                  <input name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
                </label>
                <label>
                  Email:
                  <input name="email" type="email" value={formData.email} onChange={handleChange} required />
                </label>
                <label>
                  Company:
                  <input name="company" value={formData.company} onChange={handleChange} />
                </label>

                {(formType === "Sample" || formType === "Order") && (
                  <label>
                    Address:
                    <textarea name="address" value={formData.address} onChange={handleChange} required />
                  </label>
                )}
                <div className="product-summary-scroll">

                  <div className="product-summary">
                    {cart.map((product) => (
                      <div key={product.id} className="product-summary-item">
                        <span>{product.name}</span>
                        {formType === "Sample" ? (
                          <span>Quantity: 1</span>
                        ) : (
                          <input
                            type="number"
                            min={product.minQty}
                            value={product.quantity}
                            onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="form-actions">
                  <button type="submit" disabled={cart.length === 0}>Submit</button>
                  <button type="button" onClick={() => setFormType(null)}>Cancel</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
