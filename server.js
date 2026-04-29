const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const schoolRoutes = require('./routes/schoolRoutes');
const { sendError } = require('./utils/response');

const app = express();
const PORT = process.env.PORT || 3000;

// Security Middleware
app.use(helmet());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: {
    status: 429,
    message: 'Too many requests from this IP, please try again after 15 minutes'
  }
});
app.use(limiter);

app.use(cors());
app.use(express.json());

// routes
app.use('/api', schoolRoutes);

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  return sendError(res, 500, 'Something went wrong!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
