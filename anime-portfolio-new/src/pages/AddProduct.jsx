import React, { useState } from 'react';
import { addProduct } from '../api/index.js';

/**
 * Admin page to add a new product.  This demonstrates a simple form
 * using controlled components.  When submitted it calls the
 * `addProduct` API endpoint.  Validation is minimal; in a real
 * application you would restrict access to admins and perform
 * server‑side validation.
 */
const AddProduct = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const product = {
        title,
        price: parseFloat(price),
        description,
        image,
        category,
      };
      await addProduct(product);
      setMessage('Product added successfully');
      setTitle('');
      setPrice('');
      setDescription('');
      setImage('');
      setCategory('');
    } catch (err) {
      setMessage(err.message || 'Failed to add product');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded bg-card text-foreground"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium" htmlFor="price">
            Price
          </label>
          <input
            id="price"
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded bg-card text-foreground"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium" htmlFor="category">
            Category
          </label>
          <input
            id="category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded bg-card text-foreground"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium" htmlFor="image">
            Image URL
          </label>
          <input
            id="image"
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded bg-card text-foreground"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="4"
            className="w-full px-3 py-2 border rounded bg-card text-foreground"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded hover:bg-primary/80"
        >
          Add Product
        </button>
        {message && <p className="text-sm mt-2">{message}</p>}
      </form>
    </div>
  );
};

export default AddProduct;