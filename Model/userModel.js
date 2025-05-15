import mongoose from './connect.js';
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  avatar: {
    data: Buffer,
    contentType: String
  }
});

const User = mongoose.model('User', UserSchema);
export default User;