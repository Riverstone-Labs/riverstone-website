// Environment variable validation
// This module validates that all required environment variables are present at startup

export function validateEnv() {
  const requiredEnvVars = ['RESEND_API_KEY'];
  const missing = [];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      missing.push(envVar);
    }
  }

  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:');
    missing.forEach(envVar => console.error(`   - ${envVar}`));
    console.error('\nPlease set these variables in your .env file or environment.');
    console.error('See .env.example for reference.\n');
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

// Validate on module load in server contexts
if (typeof window === 'undefined') {
  validateEnv();
}
