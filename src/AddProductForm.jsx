import React, { useState } from 'react';

function AddProductForm({ onProductAdded }) {
  // Create state for each form field
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission (page reload)

    const newProduct = {
      name,
      description,
      price: parseFloat(price), // Ensure price is a number
      imageUrl,
      category,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        console.log('Product added successfully!');
        // Clear the form fields after successful submission
        setName('');
        setDescription('');
        setPrice('');
        setImageUrl('');
        setCategory('');
        onProductAdded(); // Call the function passed from App.jsx to refresh the list
      } else {
        console.error('Failed to add product');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  // The form structure
  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a New Product</h2>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
      <input type="text" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
      <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required />
      <button type="submit">Add Product</button>
    </form>
  );
}

export default AddProductForm;