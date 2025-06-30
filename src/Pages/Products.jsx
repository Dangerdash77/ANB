import React, { useState, useRef, useEffect } from "react";

import "./Pages css/Products.css";
import cartIcon from "../assets/cart.png";

const ProductPage = () => {
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
  const scrollToCart = () =>
    cartRef.current?.scrollIntoView({ behavior: "smooth" });

  const isInCart = (id) => cart.some((p) => p._id === id);
  const toggleCart = (product) => {
    setCart((prev) =>
      isInCart(product.id)
        ? prev.filter((p) => p._id !== product.id)
        : [
            ...prev,
            {
              ...product,
              quantity:
                parseInt((product.fields.minQty || "1").replace(/\D/g, "")) ||
                1,
            },
          ]
    );
  };
  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleQuantityChange = (id, val) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(
                Number(val),
                Number(item.fields.minQty || item.minQty || 1)
              ),
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
        body: JSON.stringify(payload),
        credentials: "include", // ✅ Send cookies with request
      });

      const result = await res.json();

      if (result.success) {
        alert(`✅ ${formType} request sent successfully!`);
        setFormType(null);
        setCart([]);
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
      console.error("Error while sending request:", err);
      alert("🚫 Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Set API base URL (fallback to relative path if not defined)
  const API = `${import.meta.env.VITE_SERVER_ORIGIN}/api/products/all` ?? "";

  // ✅ Inside your React component
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_ORIGIN}/api/products/all`
        );
        // if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        setProducts(data?.products || []);
      } catch (err) {
        console.error("❌ Failed to load products:", err.message || err);
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
              {Object.entries(p).map(
                ([key, value]) =>
                  key !== "_id" &&
                  key !== "name" &&
                  key !== "image" &&
                  key !== "__v" &&
                  key !== "minQty" && (
                    <p key={key}>
                      <strong>
                        {key.charAt(0).toUpperCase() + key.slice(1)}:
                      </strong>{" "}
                      {value}
                    </p>
                  )
              )}

              <button onClick={() => toggleCart(p)} className="add-cart">
                {isInCart(p._id) ? "−" : "+"}
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
            <button onClick={() => setFormType("Quote")}>Get a Quote</button>
            <button onClick={() => setFormType("Sample")}>
              Request Sample
            </button>
            <button onClick={() => setFormType("Order")}>Place Order</button>
          </div>
        </div>

        {/* Form Modal */}
        {formType && (
          <div className="form-overlay">
            <div className="form-container">
              <h2>{formType} Form</h2>

              {cart.length === 0 ? (
                <>
                  <p className="warning-text">
                    Please add products before submitting.
                  </p>
                  <div className="form-actions">
                    <button onClick={() => setFormType(null)}>Close</button>
                  </div>
                </>
              ) : (
                <form onSubmit={handleFormSubmit}>
                  <label>
                    Name:
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </label>
                  <label>
                    Mobile Number:
                    <input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </label>
                  <label>
                    Email:
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </label>
                  <label>
                    Company:
                    <input
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </label>

                  {(formType === "Sample" || formType === "Order") && (
                    <label>
                      Address:
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                      />
                    </label>
                  )}
                  <div className="product-summary-scroll">
                    <div className="product-summary">
                      {cart.map((product) => {
                        const minQtyStr = product.fields.minQty || "1";
                        const minQty =
                          parseInt(minQtyStr.replace(/\D/g, "")) || 1;

                        return (
                          <div
                            key={product.id}
                            className="product-summary-item"
                          >
                            <span>{product.name}</span>
                            {formType === "Sample" ? (
                              <span>Quantity: 1</span>
                            ) : (
                              <div className="quantity-with-unit">
                                <input
                                  type="number"
                                  min={minQty}
                                  value={product.quantity}
                                  onChange={(e) =>
                                    handleQuantityChange(
                                      product.id,
                                      e.target.value
                                    )
                                  }
                                />
                                <span className="unit-text">
                                  {(() => {
                                    const match =
                                      product.fields.standardQty?.match(
                                        /(\bpcs\b|\bsets\b|\bset\b|\brolls\b|\broll\b)/i
                                      );
                                    return match ? match[0] : "";
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
                    <button type="submit" disabled={cart.length === 0}>
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
