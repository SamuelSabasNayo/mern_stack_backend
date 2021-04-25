import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstname: { type: String, required: [true, 'userName is required'] },
  lastname: { type: String, required: [true, 'userName is required'] },
  email: { type: String, required: [true, 'Email is required'] },
  password: { type: String, required: [true, 'Password is required'] },
  profile: { type: String, required: [false, 'profile is required'] },
  parentId: { type: String, required: [false, 'parentId is required'] },
  isVerified: { type: Boolean },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', UserSchema);

export default User;
