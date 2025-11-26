import app from './app.js';
import mongoose from 'mongoose';
import { config } from './config/config.js';

//connect to mongoDB
mongoose
.connect(config.mangoURI)
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error)=>{
  console.error('Error connecting to MongoDB:', error);
});

// start the server
const PORT = config.port || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});