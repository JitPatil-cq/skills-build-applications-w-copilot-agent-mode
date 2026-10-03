import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    type: {
      type: String,
      required: true,
      enum: ['walking', 'running', 'cycling', 'swimming', 'strength', 'other'],
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, min: 0 },
    points: { type: Number, required: true, min: 0, default: 0 },
    date: { type: Date, required: true, default: Date.now },
    notes: { type: String, trim: true, default: '' },
  },
  { timestamps: true },
);

const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema);

export default Activity;
