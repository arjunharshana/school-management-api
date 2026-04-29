const express = require('express');
const cors = require('cors');
require('dotenv').config();
const schoolRoutes = require('./routes/schoolRoutes');
const { sendError } = require('./utils/response');

const app = express();
const PORT = process.env.PORT || 3000;

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
