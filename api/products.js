// /api/products.js

import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import dbConnect from '../../lib/dbConnect'; // Your MongoDB connect helper
import Product from '../../models/Product';

export default async function handler(req, res) {
  await dbConnect();

  // ✅ Parse cookies manually
  const cookies = cookie.parse(req.headers.cookie || '');
  const token = cookies.token;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);

    // Only allow owners to add product
    if (req.method === 'POST') {
      if (user.role !== 'owner') {
        return res.status(403).json({ message: 'Forbidden: Owner only' });
      }

      const { name, image, minQty, details } = req.body;

      const newProduct = new Product({ name, image, minQty, details });
      await newProduct.save();

      return res.status(201).json({ success: true, product: newProduct });
    }

    // Handle GET, PUT, DELETE etc...
    // ✅ Handle GET request
    if (req.method === 'GET') {
      const products = [
        {
          _id: '1',
          name: 'Plastic Endless Chain',
          image: 'https://www.anbindustries.com/images/Plastic-Endless-chain.png',
          fields: {
            colour: 'white/brown/gray/cream/black',
            size: '0.5–5 m & custom',
            material: 'POM',
            standardQty: '500 pcs/box',
            minQty: '500 pcs'
          }
        },
        {
          _id: '2',
          name: 'Plastic Operation Chain',
          image: 'https://www.anbindustries.com/images/Plastic-Operation-Chain.png',
          fields: {
            colour: 'white',
            size: '200 m/roll',
            material: 'POM',
            standardQty: '10 rolls/box',
            minQty: '10 rolls'
          }
        },
        // 🧩 Add more products as needed here
      ];

      return res.status(200).json({ products });
    }
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
}



export default async function handler(req, res) {
  // ✅ CORS Headers
  res.setHeader('Access-Control-Allow-Origin', 'https://www.anbindustries.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // ✅ Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
}
