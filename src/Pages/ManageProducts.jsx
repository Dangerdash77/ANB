import React, { useEffect, useState } from 'react';
import './Pages css/ManageProducts.css';

// ✅ Use environment variable for API base URL (Vercel/local)
const API = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, ''); // ✅ remove trailing slash

const initialForm = {
  name: '',
  size: '',
  color: '',
  material: '',
  stdPacking: '',
  minQty: '',
  image: '',
};

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API}/api/products`);
      const data = await res.json();
      setProducts(data.products || []);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `${API}/api/products/${editId}` : `${API}/api/products`;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // 🔐 send cookies (for JWT auth)
        body: JSON.stringify(form),
      });

      const result = await res.json();

      if (result.success) {
        fetchProducts();
        setForm(initialForm);
        setEditId(null);
      } else {
        alert(result.message || 'Something went wrong');
      }
    } catch (err) {
      console.error('Submit error:', err);
      alert('Failed to save product');
    }
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditId(product._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;

    try {
      const res = await fetch(`${API}/api/products/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const result = await res.json();

      if (result.success) {
        fetchProducts();
      } else {
        alert(result.message || 'Delete failed');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Server error while deleting');
    }
  };

  return (
    <div className="manage-products-container">
      <h2>Manage Products</h2>

      <form onSubmit={handleSubmit} className="product-form">
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="size" placeholder="Size" value={form.size} onChange={handleChange} />
        <input name="color" placeholder="Color" value={form.color} onChange={handleChange} />
        <input name="material" placeholder="Material" value={form.material} onChange={handleChange} />
        <input name="stdPacking" placeholder="Std Packing" value={form.stdPacking} onChange={handleChange} />
        <input name="minQty" placeholder="Min Qty" value={form.minQty} onChange={handleChange} />
        <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />

        <button type="submit">{editId ? 'Update' : 'Add'} Product</button>
        {editId && (
          <button type="button" onClick={() => {
            setEditId(null);
            setForm(initialForm);
          }}>
            Cancel
          </button>
        )}
      </form>

      <div className="products-list">
        {products.map((prod) => (
          <div key={prod._id} className="product-card">
            {prod.image && <img src={prod.image} alt={prod.name} />}
            <h3>{prod.name}</h3>
            <p><strong>Size:</strong> {prod.size}</p>
            <p><strong>Color:</strong> {prod.color}</p>
            <p><strong>Material:</strong> {prod.material}</p>
            <p><strong>Std Packing:</strong> {prod.stdPacking}</p>
            <p><strong>Min Qty:</strong> {prod.minQty}</p>
            <div className="product-actions">
              <button onClick={() => handleEdit(prod)}>Edit</button>
              <button onClick={() => handleDelete(prod._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageProducts;
