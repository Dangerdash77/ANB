import React, { useEffect, useState } from 'react';
import './Pages css/ManageProducts.css';

const API = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

const initialForm = {
  name: '',
  size: '',
  color: '',
  material: '',
  stdPacking: '',
  minQty: '',
};

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState(null);
  const [image, setImage] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_ORIGIN}/api/products/all`);
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

    if (!form.name || !form.minQty) {
      alert("Please fill in required fields (Name and Min Qty)");
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => formData.append(key, val));
    if (image) formData.append('image', image);

    const method = editId ? 'PUT' : 'POST';
    const url = editId
      ? `${import.meta.env.VITE_SERVER_ORIGIN}/api/products/product/${editId}`
      : `${import.meta.env.VITE_SERVER_ORIGIN}/api/products/add-product`;

    try {
      const res = await fetch(url, {
        method,
        body: formData,
        credentials: 'include',
      });

      const result = await res.json();

      if (result.success) {
        fetchProducts();
        setForm(initialForm);
        setImage(null);
        setEditId(null);
        alert(result.message);
      } else {
        alert(result.message || 'Something went wrong');
      }
    } catch (err) {
      console.error('Submit error:', err);
      alert('Failed to save product');
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name ?? '',
      size: product.size ?? '',
      color: product.color ?? '',
      material: product.material ?? '',
      stdPacking: product.stdPacking ?? '',
      minQty: product.minQty ?? '',
    });
    setEditId(product._id);
    setImage(null); // new image must be selected to replace
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_ORIGIN}/api/products/product/${id}`, {
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

      <form onSubmit={handleSubmit} className="product-form" encType="multipart/form-data">
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="size" placeholder="Size" value={form.size} onChange={handleChange} />
        <input name="color" placeholder="Color" value={form.color} onChange={handleChange} />
        <input name="material" placeholder="Material" value={form.material} onChange={handleChange} />
        <input name="stdPacking" placeholder="Std Packing" value={form.stdPacking} onChange={handleChange} />
        <input name="minQty" placeholder="Min Qty" type="number" value={form.minQty} onChange={handleChange} required />
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />

        <button type="submit">{editId ? 'Update' : 'Add'} Product</button>
        {editId && (
          <button type="button" onClick={() => {
            setEditId(null);
            setForm(initialForm);
            setImage(null);
          }}>
            Cancel
          </button>
        )}
      </form>

      <div className="products-list">
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          products.map((prod) => (
            <div key={prod._id} className="product-card">
              {prod.image
                ? <img src={prod.image} alt={prod.name || 'Product Image'} />
                : <div className="no-image">No Image</div>}
              <h3>{prod.name ?? 'Unnamed Product'}</h3>
              <p><strong>Size:</strong> {prod.size ?? 'N/A'}</p>
              <p><strong>Color:</strong> {prod.color ?? 'N/A'}</p>
              <p><strong>Material:</strong> {prod.material ?? 'N/A'}</p>
              <p><strong>Std Packing:</strong> {prod.stdPacking ?? 'N/A'}</p>
              <p><strong>Min Qty:</strong> {prod.minQty ?? 'N/A'}</p>
              <div className="product-actions">
                <button onClick={() => handleEdit(prod)}>Edit</button>
                <button onClick={() => handleDelete(prod._id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageProducts;
