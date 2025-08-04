# Vercel Environment Variables Setup

This document explains how to configure environment variables for the StockGPT app in Vercel.

## Required Environment Variables

### 1. ENCRYPTION_MASTER_PASSWORD
**Required for decrypting API keys**
```
Variable Name: ENCRYPTION_MASTER_PASSWORD
Value: d1be2d4516fc5facdcddac41db055a833944f2bfff46adefb71ebaeb37439b42
Environments: Production, Preview, Development
```

## How to Set Environment Variables in Vercel

### Method 1: Vercel Dashboard (Recommended)
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your `stockgpt-app` project
3. Navigate to **Settings** → **Environment Variables**
4. Click **Add New**
5. Enter the variable name and value
6. Select the environments where it should be available
7. Click **Save**

### Method 2: Vercel CLI
```bash
# Set for all environments
vercel env add ENCRYPTION_MASTER_PASSWORD

# When prompted, enter the value:
# d1be2d4516fc5facdcddac41db055a833944f2bfff46adefb71ebaeb37439b42

# Select all environments (Production, Preview, Development)
```

### Method 3: Using the deployment script
```bash
# Run the automated deployment script
./scripts/deploy-vercel.sh
```

## Verification

After setting the environment variables:

1. **Redeploy your application** (Vercel will automatically redeploy when you save environment variables)
2. **Test the API** by visiting: `https://your-app.vercel.app/api/env-status`
3. **Check the response** - it should show encrypted keys as "secure"

## Troubleshooting

### If APIs still show as "demo mode":
1. Verify the environment variable is set correctly in Vercel dashboard
2. Check that the value matches exactly (no extra spaces)
3. Ensure it's enabled for the correct environment (Production/Preview)
4. Force a new deployment: `vercel --prod --force`

### If deployment fails:
1. Check Vercel function logs in the dashboard
2. Verify all environment variables are set
3. Check that the encryption master password is correct

## Security Notes

- The encryption master password should be kept secure
- Never commit this value to your repository
- Only set it in secure environment variable storage (Vercel dashboard)
- Rotate this password periodically for security
