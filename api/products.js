// /api/products.js

import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import dbConnect from '../../lib/dbConnect'; // Ensure this connects to MongoDB
import Product from '../../models/Product'; // Mongoose model

export default async function handler(req, res) {
  // ✅ CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'https://www.anbindustries.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // ✅ Preflight support
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  await dbConnect();

  if (req.method === 'GET') {
    // 🟢 Return sample product list for now
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
    ];

    return res.status(200).json({ success: true, products });
  }

  // ✅ Authenticate for protected methods (e.g. POST)
  const cookies = cookie.parse(req.headers.cookie || '');
  const token = cookies.token;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);

    if (req.method === 'POST') {
      if (user.role !== 'owner') {
        return res.status(403).json({ success: false, message: 'Forbidden: Only owners can add products' });
      }

      const { name, image, minQty, details } = req.body;

      if (!name || !image || !minQty || !details) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
      }

      const product = new Product({ name, image, minQty, details });
      await product.save();

      return res.status(201).json({ success: true, product });
    }

    return res.status(405).json({ success: false, message: 'Method not allowed' });

  } catch (err) {
    console.error('Auth error:', err);
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
}
