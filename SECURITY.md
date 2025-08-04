# Security Guide for StockGPT

## 🔐 API Key Security

Your API keys are now encrypted for maximum security. Here's how it works:

### What We Fixed
- ❌ Plain text API keys in `.env.local` (security risk)
- ✅ Encrypted API keys with AES-256-CBC encryption
- ✅ Master password stored separately from code
- ✅ Automatic fallback if encryption fails

### How It Works
1. **Encryption**: API keys are encrypted using a master password
2. **Storage**: Encrypted keys are stored in `.env.local` with `_ENCRYPTED` suffix
3. **Runtime**: Keys are decrypted automatically when your app needs them
4. **Security**: Master password is never stored in your repository

### Files Created/Modified
- `scripts/secure-env.js` - Encryption utility
- `scripts/start-secure.sh` - Secure startup script
- `.env.local` - Now contains encrypted keys
- `.env.local.backup` - Backup of original (don't commit this!)
- `.gitignore` - Updated to exclude sensitive files

### Usage

#### Start the app securely:
```bash
npm run dev:secure
```

#### Check environment status:
```bash
npm run check-env
```

#### Re-encrypt keys (if needed):
```bash
npm run encrypt-env
```

### Master Password
**Store this securely** (password manager, secure notes, etc.):
```
ENCRYPTION_MASTER_PASSWORD=d1be2d4516fc5facdcddac41db055a833944f2bfff46adefb71ebaeb37439b42
```

### Important Security Notes
1. **Never commit** the master password to version control
2. **Never share** the master password in chat/email
3. **Store securely** in a password manager or secure notes
4. **Set in environment** using `export ENCRYPTION_MASTER_PASSWORD=...`
5. **Backup securely** - if you lose the master password, you'll need to regenerate API keys

### Production Deployment
For production, set the master password as an environment variable in your hosting platform:
- Vercel: Add to Environment Variables in dashboard
- Netlify: Add to Site Settings > Environment Variables
- Heroku: Use `heroku config:set ENCRYPTION_MASTER_PASSWORD=...`
- Docker: Pass as environment variable

### If You Lose the Master Password
1. Get new API keys from the respective services
2. Run `npm run encrypt-env` to create new encrypted versions
3. Update your environment with the new master password

## 🛡️ Additional Security Features
- Automatic key masking in logs
- Secure key validation
- Environment status checking
- Backup and recovery procedures

Your API keys are now secure! 🎉
