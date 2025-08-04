import { EnvironmentEncryption } from './encryption';

export class SecureEnvironmentManager {
  private static instance: SecureEnvironmentManager;
  private masterPassword: string;
  private cachedValues: Map<string, string> = new Map();

  private constructor() {
    // Get master password from environment or generate one
    const envPassword = process.env.ENCRYPTION_MASTER_PASSWORD;
    const defaultPassword = this.generateDefaultPassword();
    
    // Use environment password if available, otherwise use default
    this.masterPassword = envPassword || defaultPassword;
    
    // Log which password we're using (masked for security)
    const usingEnvPassword = !!envPassword;
    console.log(`🔐 Using ${usingEnvPassword ? 'environment' : 'default'} encryption password`);
    
    // Validate the password
    if (!this.masterPassword || this.masterPassword.length < 64) {
      console.warn('⚠️ Warning: Encryption master password may be invalid');
    }
  }

  static getInstance(): SecureEnvironmentManager {
    if (!SecureEnvironmentManager.instance) {
      SecureEnvironmentManager.instance = new SecureEnvironmentManager();
    }
    return SecureEnvironmentManager.instance;
  }

  private generateDefaultPassword(): string {
    // Return the known master password as fallback
    return 'd1be2d4516fc5facdcddac41db055a833944f2bfff46adefb71ebaeb37439b42';
  }

  /**
   * Get a decrypted environment variable
   */
  getSecureValue(key: string): string | undefined {
    try {
      // Check cache first
      if (this.cachedValues.has(key)) {
        return this.cachedValues.get(key);
      }

      // First try the encrypted version
      const encryptedKey = `${key}_ENCRYPTED`;
      const encryptedValue = process.env[encryptedKey];
      
      if (encryptedValue && EnvironmentEncryption.isEncrypted(encryptedValue)) {
        try {
          const decrypted = EnvironmentEncryption.decrypt(encryptedValue, this.masterPassword);
          this.cachedValues.set(key, decrypted);
          return decrypted;
        } catch (decryptError: any) {
          console.error(`🔑 Decryption failed for ${key}. This usually means the encryption password doesn't match the one used to encrypt the value.`);
          console.error(`💡 Tip: Make sure ENCRYPTION_MASTER_PASSWORD matches the value used during encryption.`);
          throw decryptError;
        }
      }

      // Fallback to plain value (for backward compatibility)
      const envValue = process.env[key];
      if (!envValue) {
        return undefined;
      }

      // Check if the value is encrypted
      if (EnvironmentEncryption.isEncrypted(envValue)) {
        const decrypted = EnvironmentEncryption.decrypt(envValue, this.masterPassword);
        this.cachedValues.set(key, decrypted);
        return decrypted;
      }

      // If not encrypted, return as-is (for backward compatibility)
      this.cachedValues.set(key, envValue);
      return envValue;
    } catch (error: any) {
      console.error(`Failed to decrypt environment variable ${key}:`, error.message);
      return undefined;
    }
  }

  /**
   * Get a masked version of an environment variable for display
   */
  getMaskedValue(key: string): string {
    const value = this.getSecureValue(key);
    if (!value) {
      return 'Not set';
    }
    return EnvironmentEncryption.maskValue(value);
  }

  /**
   * Encrypt and set an environment variable
   */
  setSecureValue(key: string, value: string): string {
    try {
      const encrypted = EnvironmentEncryption.encrypt(value, this.masterPassword);
      this.cachedValues.set(key, value);
      return encrypted;
    } catch (error: any) {
      throw new Error(`Failed to encrypt value for ${key}: ${error.message}`);
    }
  }

  /**
   * Clear the cache
   */
  clearCache(): void {
    this.cachedValues.clear();
  }

  /**
   * Get environment status for debugging
   */
  getEnvironmentStatus(): { [key: string]: { encrypted: boolean; masked: string } } {
    const sensitiveKeys = [
      'OPENAI_API_KEY',
      'GOOGLE_AI_API_KEY',
      'HUGGINGFACE_API_KEY',
      'COHERE_API_KEY',
      'GROQ_API_KEY'
    ];

    const status: { [key: string]: { encrypted: boolean; masked: string } } = {};

    sensitiveKeys.forEach(key => {
      const encryptedKey = `${key}_ENCRYPTED`;
      const encryptedValue = process.env[encryptedKey];
      const plainValue = process.env[key];
      
      const isEncrypted = !!(encryptedValue && EnvironmentEncryption.isEncrypted(encryptedValue));
      
      status[key] = {
        encrypted: isEncrypted,
        masked: this.getMaskedValue(key)
      };
    });

    return status;
  }
}

// Convenience functions for common use cases
export function getSecureEnvVar(key: string): string | undefined {
  return SecureEnvironmentManager.getInstance().getSecureValue(key);
}

export function getMaskedEnvVar(key: string): string {
  return SecureEnvironmentManager.getInstance().getMaskedValue(key);
}

export function encryptEnvVar(key: string, value: string): string {
  return SecureEnvironmentManager.getInstance().setSecureValue(key, value);
}
