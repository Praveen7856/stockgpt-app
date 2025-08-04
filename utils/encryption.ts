const crypto = require('crypto');

export class EnvironmentEncryption {
  private static readonly ALGORITHM = 'aes-256-cbc';
  private static readonly KEY_LENGTH = 32;
  private static readonly IV_LENGTH = 16;

  /**
   * Generate a secure encryption key from a master password
   */
  private static deriveKey(masterPassword: string, salt: string): Buffer {
    return crypto.pbkdf2Sync(masterPassword, salt, 100000, this.KEY_LENGTH, 'sha256');
  }

  /**
   * Encrypt a value using AES-256-CBC
   */
  static encrypt(value: string, masterPassword: string): string {
    try {
      const salt = crypto.randomBytes(16).toString('hex');
      const iv = crypto.randomBytes(this.IV_LENGTH);
      const key = this.deriveKey(masterPassword, salt);
      
      const cipher = crypto.createCipheriv(this.ALGORITHM, key, iv);
      
      let encrypted = cipher.update(value, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      
      // Combine salt, iv, and encrypted data
      return `${salt}:${iv.toString('hex')}:${encrypted}`;
    } catch (error: any) {
      throw new Error(`Encryption failed: ${error.message}`);
    }
  }

  /**
   * Decrypt a value using AES-256-CBC
   */
  static decrypt(encryptedValue: string, masterPassword: string): string {
    try {
      const [salt, ivHex, encrypted] = encryptedValue.split(':');
      
      if (!salt || !ivHex || !encrypted) {
        throw new Error('Invalid encrypted value format');
      }
      
      const iv = Buffer.from(ivHex, 'hex');
      const key = this.deriveKey(masterPassword, salt);
      
      const decipher = crypto.createDecipheriv(this.ALGORITHM, key, iv);
      
      let decrypted = decipher.update(encrypted, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      
      return decrypted;
    } catch (error: any) {
      throw new Error(`Decryption failed: ${error.message}`);
    }
  }

  /**
   * Mask a sensitive value for display purposes
   */
  static maskValue(value: string, visibleChars: number = 4): string {
    if (!value || value.length <= visibleChars * 2) {
      return '*'.repeat(8);
    }
    
    const start = value.substring(0, visibleChars);
    const end = value.substring(value.length - visibleChars);
    const middle = '*'.repeat(Math.max(8, value.length - visibleChars * 2));
    
    return `${start}${middle}${end}`;
  }

  /**
   * Check if a value appears to be encrypted
   */
  static isEncrypted(value: string): boolean {
    const parts = value.split(':');
    return parts.length === 3 && 
           parts.every(part => /^[a-f0-9]+$/i.test(part));
  }

  /**
   * Generate a secure master password
   */
  static generateMasterPassword(): string {
    return crypto.randomBytes(32).toString('hex');
  }
}
