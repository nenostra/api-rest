const mongoose = require('mongoose');
const app = require('./app');
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/shop', (err,res) => {
  if (err) {console.log(err)}
  console.log('Database connection successful');

  app.listen(port, () => {
    console.log(`API REST RUNNING ON PORT ${port}`);
  });
});
