import mongoose from 'mongoose';
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    branch: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: ''
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    emailVerificationToken: {
        type: String
    },
    emailVerificationExpires: {
        type: Date
    }
}, {
    timestamps: true
});

// Method to generate email verification token
userSchema.methods.generateVerificationToken = function () {
    const token = crypto.randomBytes(32).toString('hex');
    this.emailVerificationToken = token;
    this.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    return token;
};

export default mongoose.model('User', userSchema);
