import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    activityType: {
      type: String,
      required: true,
      enum: ['walking', 'running', 'cycling', 'swimming', 'strength', 'other'],
    },
    difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
    durationMinutes: { type: Number, required: true, min: 1 },
    fitnessGoals: [{ type: String, trim: true, lowercase: true }],
  },
  { timestamps: true },
);

const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema);

export default Workout;
