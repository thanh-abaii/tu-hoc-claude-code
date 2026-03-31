/**
 * Authentication Configuration
 *
 * This module demonstrates the combined workflow of:
 * - Plan Mode: Research and design
 * - Extended Thinking: Deep analysis
 * - AcceptEdits: Auto-apply changes
 */

const authConfig = {
  // JWT Configuration
  jwt: {
    accessTokenSecret: process.env.JWT_ACCESS_SECRET,
    refreshTokenSecret: process.env.JWT_REFRESH_SECRET,
    accessTokenExpiry: '15m',
    refreshTokenExpiry: '7d',
  },

  // Password Hashing
  bcrypt: {
    rounds: 12,
  },

  // Rate Limiting (login attempts)
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxAttempts: 5,
  },

  // Cookie Settings
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  },
};

module.exports = authConfig;
