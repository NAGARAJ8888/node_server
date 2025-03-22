const express = require('express');
const app = express();

//like a body parser
app.use(express.json());

//.env configuration
require('dotenv').config();

//Database
const db = require('./db')
db();

//routes
const personRoutes = require('./routes/PersonRouter');
app.use('/persons',personRoutes);

app.get('/',(req, res)=>{
    res.send('hello server');
  })

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
