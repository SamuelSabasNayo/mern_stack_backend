import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const SessionSchema = new Schema({
  userId: { type: String, required: [true, 'userId is required'] },
  userName: { type: String, required: [true, 'userName is required'] },
  session: { type: String, required: [true, 'Session is required'] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Sessions', SessionSchema);
