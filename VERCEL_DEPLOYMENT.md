# 🚀 Vercel Deployment Guide for Glow Loot Fair

This guide provides step-by-step instructions for deploying Glow Loot Fair to Vercel.

## Prerequisites

- GitHub account with access to the repository
- Vercel account (free tier available)
- Node.js 18+ installed locally (for testing)

## Step 1: Prepare Your Repository

1. **Ensure all changes are committed and pushed to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Verify your repository structure**
   - Ensure `package.json` exists in the root
   - Verify `vite.config.ts` is properly configured
   - Check that all dependencies are listed in `package.json`

## Step 2: Connect to Vercel

1. **Go to Vercel Dashboard**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Create New Project**
   - Click "New Project" button
   - Select "Import Git Repository"
   - Choose `Firebird0x/glow-loot-fair` from the list
   - Click "Import"

## Step 3: Configure Project Settings

1. **Project Configuration**
   - **Project Name**: `glow-loot-fair` (or your preferred name)
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

2. **Environment Variables**
   Click "Environment Variables" and add the following:

   ```
   VITE_CHAIN_ID=11155111
   VITE_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
   VITE_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
   VITE_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
   VITE_LOOTBOX_CONTRACT_ADDRESS=
   VITE_FHE_CONTRACT_ADDRESS=
   ```

   **Important**: Leave contract addresses empty initially. Update them after smart contract deployment.

## Step 4: Deploy Smart Contracts (Optional)

If you want to deploy the smart contracts:

1. **Install Hardhat dependencies**
   ```bash
   npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
   ```

2. **Configure environment variables for deployment**
   Create `.env` file in the root directory:
   ```env
   PRIVATE_KEY=your_private_key_here
   RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
   ETHERSCAN_API_KEY=your_etherscan_api_key
   ```

3. **Deploy contracts**
   ```bash
   npx hardhat run scripts/deploy.js --network sepolia
   ```

4. **Update Vercel environment variables**
   - Go back to Vercel dashboard
   - Navigate to your project settings
   - Update the contract address environment variables with the deployed addresses

## Step 5: Deploy to Vercel

1. **Start Deployment**
   - Click "Deploy" button in Vercel dashboard
   - Wait for the build process to complete (usually 2-5 minutes)

2. **Monitor Build Process**
   - Watch the build logs for any errors
   - Common issues and solutions:
     - **Build timeout**: Increase build timeout in project settings
     - **Memory issues**: Upgrade to Pro plan or optimize build
     - **Dependency errors**: Check `package.json` for missing dependencies

## Step 6: Configure Custom Domain (Optional)

1. **Add Custom Domain**
   - Go to project settings
   - Navigate to "Domains" tab
   - Add your custom domain
   - Follow DNS configuration instructions

2. **SSL Certificate**
   - Vercel automatically provides SSL certificates
   - HTTPS will be enabled automatically

## Step 7: Post-Deployment Configuration

1. **Update Contract Addresses**
   - After smart contract deployment, update environment variables in Vercel
   - Redeploy the application to pick up new environment variables

2. **Test the Application**
   - Visit your deployed URL
   - Test wallet connection
   - Verify lootbox functionality
   - Check console for any errors

## Step 8: Continuous Deployment

1. **Automatic Deployments**
   - Vercel automatically deploys on every push to main branch
   - Preview deployments are created for pull requests

2. **Manual Deployments**
   - Use Vercel CLI: `vercel --prod`
   - Or trigger from Vercel dashboard

## Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Check build locally
   npm run build
   
   # Check for TypeScript errors
   npm run lint
   ```

2. **Environment Variables Not Working**
   - Ensure variables start with `VITE_`
   - Redeploy after adding new variables
   - Check variable names match exactly

3. **Wallet Connection Issues**
   - Verify WalletConnect Project ID is correct
   - Check network configuration
   - Ensure RPC URL is accessible

4. **Smart Contract Issues**
   - Verify contract addresses are correct
   - Check if contracts are deployed on Sepolia
   - Ensure wallet is connected to Sepolia network

### Performance Optimization

1. **Build Optimization**
   - Enable build caching in Vercel settings
   - Use `npm ci` instead of `npm install` for faster builds

2. **Bundle Size**
   - Analyze bundle size with `npm run build`
   - Consider code splitting for large dependencies

## Environment Variables Reference

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `VITE_CHAIN_ID` | Ethereum chain ID | Yes | 11155111 |
| `VITE_RPC_URL` | RPC endpoint URL | Yes | Sepolia Infura |
| `VITE_WALLET_CONNECT_PROJECT_ID` | WalletConnect project ID | Yes | Provided |
| `VITE_INFURA_API_KEY` | Infura API key | No | Provided |
| `VITE_LOOTBOX_CONTRACT_ADDRESS` | Deployed contract address | No | Empty |
| `VITE_FHE_CONTRACT_ADDRESS` | FHE contract address | No | Empty |

## Deployment URLs

After successful deployment, your application will be available at:
- **Production**: `https://glow-loot-fair.vercel.app`
- **Preview**: `https://glow-loot-fair-git-branch.vercel.app`

## Support

If you encounter issues during deployment:

1. Check Vercel build logs for specific errors
2. Verify all environment variables are set correctly
3. Ensure all dependencies are properly installed
4. Test the build locally before deploying

## Next Steps

After successful deployment:

1. **Test all functionality** with real wallet connections
2. **Deploy smart contracts** to Sepolia testnet
3. **Update contract addresses** in environment variables
4. **Configure custom domain** if needed
5. **Set up monitoring** and analytics
6. **Plan for mainnet deployment** when ready

---

**Happy Deploying! 🚀**

*Your Glow Loot Fair application should now be live and accessible to users worldwide.*
