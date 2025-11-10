import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import path from "path";
import { fileURLToPath } from "url";

/*
  Simple Express backend for the portfolio project.

  In a real application you would move business logic into
  controllers/services and implement authentication, validation and
  persistence.  Here we return an in‑memory array of products and
  demonstrate how to connect to a PostgreSQL database using the
  `pg` library.  The database connection is optional—if no
  DATABASE_URL environment variable is set the pool will not be
  initialised.

  The server listens on port 4000 by default; update this value if
  necessary.
*/

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

// Optional Postgres connection
let pool = null;
if (process.env.DATABASE_URL) {
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
}

// In‑memory store of products for demo purposes
let products = [


  {
    id: 1,
    title: 'Naruto T‑Shirt',
    price: 599,
    category: 'T‑Shirt',
    description: 'Soft cotton tee featuring Naruto Uzumaki.',
    image: 'https://fanatics.frgimages.com/naruto/youth-bioworld-black/orange-naruto-uzumaki-cosplay-t-shirt_pi5283000_altimages_ff_5283608-ac53a8318b6d6cf4da67alt1_full.jpg',
  },
  {
    id: 2,
    title: 'One Piece Hoodie',
    price: 899,
    category: 'Hoodie',
    description: 'Stay warm with Luffy and crew on this cosy hoodie.',
    image: 'https://prestige-life.com/wp-content/uploads/2022/09/One-piece-Hoodie-Jacket-06.jpg',
  },
  {
    id: 3,
    title: 'Attack on Titan Jacket',
    price: 1299,
    category: 'Jacket',
    description: 'Scout Regiment jacket inspired by Attack on Titan.',
    image: 'https://animeape.com/wp-content/uploads/2025/08/Survey-Corps-Attack-on-Titan_Varsity-Jacket-3L_BACK-Mockup-400x400.jpg',
  },
  {
    id: 4,
    title: 'Demon Slayer Katana',
    price: 2999,
    category: 'Katana',
    description: 'Replica Nichirin blade from Demon Slayer.',
    image: 'https://shoppingnest.in/cdn/shop/files/9_3b62cd83-6a9c-4c01-986a-d546fc0fa575.jpg',
  },
  {
    id: 5,
    title: 'Dragon Ball Action Figure',
    price: 499,
    category: 'Figure',
    description: 'Collectible figure of Goku powering up.',
    image: 'https://www.tinyminymo.com/cdn/shop/files/Goku-Super-Saiyan-Action-Figure_1200x1200.png',
  },
  {
    id: 6,
    title: 'My Hero Academia Jacket',
    price: 299,
    category: 'Poster',
    description: 'High quality poster featuring Deku and friends.',
    image: 'https://m.media-amazon.com/images/I/61NVD4XIhhL._AC_UY1100_.jpg',
  },
  {
    id: 7,
    title: 'Jujutsu Kaisen Jacket',
    price: 1499,
    category: 'Jacket',
    description: 'Sport the Tokyo Jujutsu High uniform.',
    image: 'https://i5.walmartimages.com/seo/Jujutsu-Kaisen-s-Yuji-Itadori-Anime-Cosplay-Costume_e344a221-3bda-4376-8e37-24c2f893476d.acccbd1d917b9f747ce4050149e61736.jpeg',
  },
  {
    id: 8,
    title: 'Bleach Hoodie',
    price: 799,
    category: 'Hoodie',
    description: 'Bankai‑inspired hoodie from Bleach.',
    image: 'https://images-cdn.ubuy.com.pk/66194f5f32f0ba57e7045270-bleach-kurosaki-ichigo-robe-cloak-coat.jpg',
  },
];

let orders = []


// GET /api/products – return all products
app.get('/api/products', async (req, res) => {
  // Attempt to fetch products from the database if available.
  // If the query fails (e.g. missing table), fall back to in-memory products.
  if (pool) {
    try {
      const result = await pool.query('SELECT * FROM products');
      return res.json(result.rows);
    } catch (err) {
      console.error('Database query failed for /api/products:', err);
      return res.json(products);
    }
  }
  return res.json(products);
});

// GET /api/products/:id – return a single product by id
app.get('/api/products/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (pool) {
    try {
      const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
      if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
      return res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      return res.json(products.find((p) => p.id === id) || null);
    }
  }
  const product = products.find((p) => p.id === id);
  if (!product) return res.status(404).json({ error: 'Not found' });
  res.json(product);
});

// POST /api/products – add a new product
app.post('/api/products', async (req, res) => {
  const { title, price, category, description, image } = req.body;
  const newProduct = {
    id: products.length + 1,
    title,
    price,
    category,
    description,
    image,
  };
  if (pool) {
    try {
      const result = await pool.query(
        'INSERT INTO products (title, price, category, description, image) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [title, price, category, description, image]
      );
      return res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      return res.json(products.find((p) => p.id === id) || null);
    }
  }
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// POST /api/auth/register – handle user registration
app.post('/api/auth/register', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  try {
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    if (pool) {
      const existing = await pool.query('SELECT id FROM users WHERE email = $1 OR username = $2', [email, username]);
      if (existing.rows.length > 0) {
        return res.status(400).json({ error: 'User already exists' });
      }
      const result = await pool.query(
        'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email',
        [username, email, hash]
      );
      return res.status(201).json({ user: result.rows[0] });
    }
    // Fallback: in‑memory register (not persisted)
    return res.json({ user: { id: Date.now(), username, email } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/auth/login – handle user login
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Missing credentials' });
  try {
    if (pool) {
      // Users may login by username or email
      const result = await pool.query('SELECT id, username, email, password_hash FROM users WHERE username = $1 OR email = $1', [username]);
      if (result.rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });
      const user = result.rows[0];
      const match = await bcrypt.compare(password, user.password_hash);
      if (!match) return res.status(401).json({ error: 'Invalid credentials' });
      // Return user object and dummy token for demo; in production return JWT
      return res.json({ token: 'fake-jwt-token', user: { id: user.id, username: user.username, email: user.email } });
    }
    // Fallback: accept any credentials
    return res.json({ token: 'fake-jwt-token', user: { username } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/orders – return all orders
app.get('/api/orders', (req, res) => {
  // In a real app you'd filter by authenticated user
  res.json(orders);
});

// POST /api/orders – create an order
app.post('/api/orders', (req, res) => {
  const { items, total, date } = req.body;
  const order = { id: orders.length + 1, items, total, date: date || new Date().toISOString() };
  orders.push(order);
  res.status(201).json(order);
});


// Start the server

// Determine file paths for serving the compiled client
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, '..', 'dist');

// Serve static files from the dist directory
app.use(express.static(distDir));

// Fallback: send index.html for all other routes to support client routing
app.get('*', (req, res) => {
  res.sendFile(path.join(distDir, 'index.html'));
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
