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

  // ❌ Method not allowed
  return res.status(405).json({ error: 'Method not allowed' });
}
