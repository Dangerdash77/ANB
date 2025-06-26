import React, { useState, useRef } from 'react';
import './Pages css/Products.css';
import cartIcon from '../assets/cart.png';
// Add separate imports for each product image:
import img1 from '../assets/product_img/Plastic Endless Chain.png';
import img2 from '../assets/product_img/Plastic Operation Chain W.jpg';
import img3 from '../assets/product_img/Plastic Operation Chain Brown.jpg';
import img4 from '../assets/product_img/Plastic Operation Chain S.jpg';
import img5 from '../assets/product_img/Plastic Operation Chain B.jpg';
import img6 from '../assets/product_img/6 Gear Control.png';
import img7 from '../assets/product_img/Zebra Metal.png';
import img8 from '../assets/product_img/Zebra Plastic.png';
// import img9 from '../assets/product_img/Heavy Cord Weight Plain.png';
import img10 from '../assets/product_img/Heavy Cord Weight Printed.png';
import img11 from '../assets/product_img/Oval Cord Weight Plain.png';
// import img12 from '../assets/product_img/Oval Cord Weight Printed.png';
import img13 from '../assets/product_img/Arabian Mindi Runner.png';
import img14 from '../assets/product_img/Arabian Trishul Runner.png';
// import img15 from '../assets/product_img/M Runner Ripple.png';
import img16 from '../assets/product_img/M Runner.png';
import img17 from '../assets/product_img/Roman Control Set.png';
import img18 from '../assets/product_img/Bottom Chain.png';
// import img19 from '../assets/product_img/Plastic Held.png';
// import img20 from '../assets/product_img/Plastic Lotion Pump.png';
// import img21 from '../assets/product_img/Soap Dispenser Pump.png';
import img22 from '../assets/product_img/Chain Stopper Button.png';
import img23 from '../assets/product_img/Chain Stopper Button Trans.png';
import img24 from '../assets/product_img/Chain Stopper Ball.png';
import img25 from '../assets/product_img/Chain Jointer.png';

const sampleProducts = [
  {
    id: 1,
    name: 'Plastic Endless Chain',
    image: img1,
    fields: {
      colour: 'white/brown/gray/cream/black',
      size: '0.5–5 m & custom',
      material: 'POM',
      standardQty: '500 pcs/box',
      minQty: '500 pcs'
    }
  },
  {
    id: 2,
    name: 'Plastic Operation Chain',
    image: img2,
    fields: {
      colour: 'white',
      size: '200 m/roll',
      material: 'POM',
      standardQty: '10 rolls/box',
      minQty: '10 rolls'
    }
  },
  {
    id: 3,
    name: 'Plastic Operation Chain',
    image: img3,
    fields: {
      colour: 'brown',
      size: '200 m/roll',
      material: 'POM',
      standardQty: '10 rolls/box',
      minQty: '10 rolls'
    }
  },
  {
    id: 4,
    name: 'Plastic Operation Chain',
    image: img4,
    fields: {
      colour: 'gray',
      size: '200 m/roll',
      material: 'POM',
      standardQty: '10 rolls/box',
      minQty: '10 rolls'
    }
  },
  {
    id: 5,
    name: 'Plastic Operation Chain',
    image: img5,
    fields: {
      colour: 'black',
      size: '200 m/roll',
      material: 'POM',
      standardQty: '10 rolls/box',
      minQty: '10 rolls'
    }
  },
  {
    id: 6,
    name: '6‑Gear Roller Control Unit',
    image: img6,
    fields: {
      colour: 'white/brown/gray/cream/black',
      size: '38 mm',
      material: 'POM',
      standardQty: '100 sets/box',
      minQty: '100 sets'
    }
  },
  {
    id: 7,
    name: 'Zebra Control Unit (Metal end caps)',
    image: img7,
    fields: {
      colour: 'white',
      size: '38 mm',
      material: 'POM',
      standardQty: '100 sets/box',
      minQty: '100 sets'
    }
  },
  {
    id: 8,
    name: 'Zebra Control Unit (Plastic end caps)',
    image: img8,
    fields: {
      colour: 'white',
      size: '38 mm',
      material: 'POM',
      standardQty: '100 sets/box',
      minQty: '100 sets'
    }
  },
  // {
  //   id: 9,
  //   name: 'Heavy Cord Weight (Plain)',
  //   image: img9,
  //   fields: {
  //     design: 'Plain',
  //     colour: 'transparent',
  //     standardQty: '500 pcs/box',
  //     minQty: '500 pcs'
  //   }
  // },
  {
    id: 10,
    name: 'Heavy Cord Weight (Printed)',
    image: img10,
    fields: {
      design: 'Printed (Customised)',
      colour: 'transparent',
      standardQty: '500 pcs/box',
      minQty: '2000 pcs'
    }
  },
  {
    id: 11,
    name: 'Oval Cord Weight (Plain)',
    image: img11,
    fields: {
      design: 'Plain',
      colour: 'white/brown',
      standardQty: '1000 pcs/box',
      minQty: '1000 pcs'
    }
  },
  // {
  //   id: 12,
  //   name: 'Oval Cord Weight (Printed)',
  //   image: img12,
  //   fields: {
  //     design: 'Printed (Customised)',
  //     colour: 'white/brown',
  //     standardQty: '1000 pcs/box',
  //     minQty: '2000 pcs'
  //   }
  // },
  {
    id: 13,
    name: 'Arabian Mindi Runner',
    image: img13,
    fields: {
      colour: 'white/black',
      distance: '60 mm',
      material: 'POM',
      standardQty: '1 660 pcs (100 m)/roll – 10 rolls/box',
      minQty: '10 rolls'
    }
  },
  {
    id: 14,
    name: 'Arabian Trishul Runner',
    image: img14,
    fields: {
      colour: 'white/black',
      distance: '60 mm',
      material: 'POM',
      standardQty: '1 660 pcs (100 m)/roll – 10 rolls/box',
      minQty: '10 rolls'
    }
  },
  // {
  //   id: 15,
  //   name: 'M Runner Ripple',
  //   image: img15,
  //   fields: {
  //     colour: 'white',
  //     distance: '60 mm',
  //     material: 'POM',
  //     standardQty: '500 pcs/roll (10 rolls/box)',
  //     minQty: '500 pcs'
  //   }
  // },
  {
    id: 16,
    name: 'M Runner',
    image: img16,
    fields: {
      colour: 'white',
      material: 'POM',
      standardQty: '10 000 pcs/box',
      minQty: '10000 pcs'
    }
  },
  {
    id: 17,
    name: 'Roman Control Set',
    image: img17,
    fields: {
      colour: 'white',
      material: 'POM',
      standardQty: '100 pcs/box',
      minQty: '100 pcs'
    }
  },
  {
    id: 18,
    name: 'Bottom Chain',
    image: img18,
    fields: {
      colour: 'white',
      size: '200 m/roll',
      material: 'POM',
      standardQty: '10 pcs/box',
      minQty: '10 pcs'
    }
  },
  // {
  //   id: 19,
  //   name: 'Plastic Held',
  //   image: img19,
  //   fields: {
  //     colour: 'orange',
  //     material: 'POM',
  //     standardQty: '20 000 pcs/box',
  //     minQty: '20000 pcs'
  //   }
  // },
  // {
  //   id: 20,
  //   name: 'Plastic Lotion Pump',
  //   image: img20,
  //   fields: {
  //     colour: 'white/black',
  //     size: '28 mm',
  //     material: 'Plastic',
  //     standardQty: '1000 pcs/box',
  //     minQty: '2000 pcs'
  //   }
  // },
  // {
  //   id: 21,
  //   name: 'Soap Dispenser Pump',
  //   image: img21,
  //   fields: {
  //     colour: 'white',
  //     material: 'Plastic',
  //     standardQty: '2000 pcs/bag',
  //     minQty: '2000 pcs'
  //   }
  // },
  {
    id: 22,
    name: 'Chain Stopper Button',
    image: img22,
    fields: {
      colour: 'White',
      material: 'Plastic',
      standardQty: '1000 pcs/bag',
      minQty: '2000 pcs'
    }
  },
  {
    id: 23,
    name: 'Chain Stopper Button Transparent',
    image: img23,
    fields: {
      colour: 'transparent',
      material: 'Plastic',
      standardQty: '1000 pcs/bag',
      minQty: '2000 pcs'
    }
  },
  {
    id: 24,
    name: 'Chain Stopper Ball',
    image: img24,
    fields: {
      colour: 'transparent',
      material: 'PC',
      standardQty: '1000 pcs/bag',
      minQty: '2000 pcs'
    }
  },
  {
    id: 25,
    name: 'Chain Jointer',
    image: img25,
    fields: {
      colour: 'white',
      material: 'Plastic',
      standardQty: '1000 sets/bag',
      minQty: '2000 sets'
    }
  },
  // Optionally add "More Products Coming Soon"
];

const ProductPage = () => {
  const [cart, setCart] = useState([]);
  const [formType, setFormType] = useState(null);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', address: '', company: '',
  });

  const cartRef = useRef(null);
  const scrollToCart = () => cartRef.current?.scrollIntoView({ behavior: 'smooth' });

  const isInCart = id => cart.some(p => p.id === id);
  const toggleCart = product => {
    setCart(prev =>
      isInCart(product.id)
        ? prev.filter(p => p.id !== product.id)
        : [...prev, {
          ...product, quantity: parseInt((product.fields.minQty || '1').replace(/\D/g, '')) || 1
        }]
    );
  };
  const handleChange = e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleQuantityChange = (id, val) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(Number(val), Number(item.fields.minQty || item.minQty || 1)) }
          : item
      )
    );
  };

  const handleFormSubmit = async e => {
    e.preventDefault();
    // same fetch logic...
  };

  return (
    <div className="product-page">
      <div className="cart-button" onClick={scrollToCart}>
        <img src={cartIcon} alt="Cart" />
        <span className="cart-count">{cart.length}</span>
      </div>

      <div className="product-grid">
        {sampleProducts.map(p => (
          <div key={p.id} className="product-vertical-card">
            <img src={p.image} alt={p.name} />
            <div className="product-details">
              <h3>{p.name}</h3>
              {Object.entries(p.fields).map(([key, value]) => (
                key !== 'minQty' && (
                  <p key={key}>
                    <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                  </p>
                )
              ))}

              <button onClick={() => toggleCart(p)} className="add-cart">
                {isInCart(p.id) ? '−' : '+'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-panel" ref={cartRef}>
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
                      {cart.map((product) => {
                        const minQtyStr = product.fields.minQty || '1';
                        const minQty = parseInt(minQtyStr.replace(/\D/g, '')) || 1;

                        return (
                          <div key={product.id} className="product-summary-item">
                            <span>{product.name}</span>
                            {formType === "Sample" ? (
                              <span>Quantity: 1</span>
                            ) : (
                              <div className="quantity-with-unit">
                                <input
                                  type="number"
                                  min={minQty}
                                  value={product.quantity}
                                  onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                                />
                                <span className="unit-text">
                                  {(() => {
                                    const match = product.fields.standardQty?.match(/(\bpcs\b|\bsets\b|\bset\b|\brolls\b|\broll\b)/i);
                                    return match ? match[0] : '';
                                  })()}
                                </span>
                              </div>

                            )}
                          </div>
                        );
                      })}

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
    </div>
  );
};

export default ProductPage;
