import React, { useState, useRef, useEffect } from "react";
import "./Pages css/Products.css";
import cartIcon from "../assets/cart.png";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [formType, setFormType] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    company: "",
  });
  const [loading, setLoading] = useState(false);

  const cartRef = useRef(null);

  const scrollToCart = () => {
    cartRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const isInCart = (id) => cart.some((p) => p._id === id);

  const toggleCart = (product) => {
    setCart((prev) =>
      isInCart(product._id)
        ? prev.filter((p) => p._id !== product._id)
        : [
            ...prev,
            {
              ...product,
              quantity: parseInt((product.minQty || "1").replace(/\D/g, "")) || 1,
            },
          ]
    );
  };

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleQuantityChange = (id, val) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity: Math.max(Number(val), Number(item.minQty || 1)),
            }
          : item
      )
    );
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      type: formType,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      address:
        formType === "Sample" || formType === "Order" ? formData.address : "",
      items: cart.map((p) => ({
        name: p.name,
        quantity: formType === "Sample" ? 1 : p.quantity,
      })),
    };

    try {
      const res = await fetch("https://anb-nuis.vercel.app/api/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (result.success) {
        alert(`✅ ${formType} request sent successfully!`);
        setCart([]);
        setFormType(null);
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          company: "",
        });
      } else {
        alert("❌ Failed to send mail. Please try again.");
      }
    } catch (err) {
      console.error("Error sending request:", err);
      alert("🚫 Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_ORIGIN}/api/products/all`);
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error("❌ Failed to load products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="product-page">
      <div className="cart-button" onClick={scrollToCart}>
        <img src={cartIcon} alt="Cart" />
        <span className="cart-count">{cart.length}</span>
      </div>

      <div className="product-grid">
        {products.map((p) => (
          <div key={p._id} className="product-vertical-card">
            <img src={p.image} alt={p.name} />
            <div className="product-details">
              <h3>{p.name}</h3>
              {["size", "color", "material", "stdPacking", "minQty"].map((key) =>
                p[key] ? (
                  <p key={key}>
                    <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {p[key]}
                  </p>
                ) : null
              )}
              <button onClick={() => toggleCart(p)} className="add-cart">
                {isInCart(p._id) ? "−" : "+"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-panel" ref={cartRef}>
        <h2>Cart Summary</h2>
        {cart.length === 0 ? (
          <p>No products added yet.</p>
        ) : (
          <div className="cart-preview-list">
            {cart.map((item) => (
              <div key={item._id} className="cart-preview-card">
                <img src={item.image} alt={item.name} />
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        )}
        <div className="cart-actions">
          <button onClick={() => setFormType("Quote")}>Get a Quote</button>
          <button onClick={() => setFormType("Sample")}>Request Sample</button>
          <button onClick={() => setFormType("Order")}>Place Order</button>
        </div>

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
                        const minQty = parseInt((product.minQty || "1").replace(/\D/g, "")) || 1;
                        return (
                          <div key={product._id} className="product-summary-item">
                            <span>{product.name}</span>
                            {formType === "Sample" ? (
                              <span>Quantity: 1</span>
                            ) : (
                              <div className="quantity-with-unit">
                                <input
                                  type="number"
                                  min={minQty}
                                  value={product.quantity}
                                  onChange={(e) => handleQuantityChange(product._id, e.target.value)}
                                />
                                <span className="unit-text">pcs</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="form-actions">
                    <button type="submit" disabled={loading}>
                      Submit
                    </button>
                    <button type="button" onClick={() => setFormType(null)}>
                      Cancel
                    </button>
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
