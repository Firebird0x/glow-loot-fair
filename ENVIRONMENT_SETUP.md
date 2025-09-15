# Environment Variables Setup

## Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# Chain Configuration
VITE_CHAIN_ID=11155111

# RPC Configuration
VITE_RPC_URL=https://1rpc.io/sepolia
# Alternative RPC URLs:
# VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_API_KEY
# VITE_RPC_URL=https://sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY

# Wallet Connect Configuration
VITE_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id

# Infura Configuration (Optional)
VITE_INFURA_API_KEY=your_infura_api_key

# Contract Addresses (Deploy contracts first)
VITE_LOOTBOX_CONTRACT_ADDRESS=
VITE_FHE_CONTRACT_ADDRESS=
```

## How to Get These Values

### 1. Wallet Connect Project ID
1. Go to [WalletConnect Cloud](https://cloud.walletconnect.com/)
2. Create a new project
3. Copy the Project ID

### 2. Infura API Key (Optional)
1. Go to [Infura](https://infura.io/)
2. Create a new project
3. Copy the API key

### 3. Contract Addresses
1. Deploy the smart contracts using Hardhat
2. Copy the deployed contract addresses
3. Add them to your environment variables

## Security Notes

- Never commit `.env.local` to version control
- Use different API keys for development and production
- Keep your private keys secure and never expose them in client-side code
