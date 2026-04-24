const express = require('express');
const app = express();

// 👉 Import DB (VERY IMPORTANT)
require('./db');

// Middleware
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Server is running...');
});

// Routes
const brandRoutes = require('./routes/brandRoutes');
app.use('/api/brands', brandRoutes);

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});