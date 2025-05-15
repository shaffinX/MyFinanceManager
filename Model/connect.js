// db.js or in app.js
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
mongoose.connect(`${process.env.MONGODB}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected!"))
.catch(err => console.error("MongoDB connection error:", err));

export default mongoose;