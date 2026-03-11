// Environment variable validation
// This module validates required environment variables at runtime

const REQUIRED_ENV_VARS: string[] = [];

const OPTIONAL_ENV_VARS = [
  'RESEND_API_KEY',
];

export function validateEnvironment(): { valid: boolean; errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check required variables
  REQUIRED_ENV_VARS.forEach((key) => {
    if (!process.env[key]) {
      errors.push(`Missing required environment variable: ${key}`);
    }
  });

  // Check optional variables (warn but don't fail)
  OPTIONAL_ENV_VARS.forEach((key) => {
    if (!process.env[key]) {
      warnings.push(`Missing optional environment variable: ${key} (contact form will log submissions but not send emails)`);
    }
  });

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

// Log environment status on startup
export function logEnvironmentStatus(): void {
  const status = validateEnvironment();

  if (status.warnings.length > 0) {
    console.warn('[Environment] Warnings:');
    status.warnings.forEach((warning) => console.warn(`  - ${warning}`));
  }

  if (!status.valid) {
    console.error('[Environment] Errors:');
    status.errors.forEach((error) => console.error(`  - ${error}`));
    // Don't exit process - let the app run with degraded functionality
  } else {
    console.log('[Environment] All required variables present');
  }
}
