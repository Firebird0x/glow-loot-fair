# 🌟 Glow Loot Fair - FHE Secured Gaming Platform

> **Experience truly fair gaming with encrypted lootboxes. Contents secured by FHE until opened - no insider advantage, complete transparency.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![FHE](https://img.shields.io/badge/FHE-Encrypted-blue)](https://fhevm.io/)

## 🎮 What is Glow Loot Fair?

Glow Loot Fair is a revolutionary gaming platform that uses **Fully Homomorphic Encryption (FHE)** to ensure completely fair lootbox mechanics. Unlike traditional gaming systems where developers could potentially manipulate outcomes, our platform encrypts all lootbox contents before deployment, making it impossible for anyone to know what's inside until you open it.

### 🔐 Key Features

- **FHE-Encrypted Contents**: All lootbox items are encrypted using advanced homomorphic encryption
- **Zero Manipulation**: No one, including developers, can see or alter lootbox contents
- **Real Wallet Integration**: Connect with RainbowKit, MetaMask, WalletConnect, and more
- **Transparent Fairness**: Every drop is verifiably random and fair
- **Modern UI/UX**: Beautiful, responsive interface with cyberpunk aesthetics
- **Blockchain Integration**: Built on Sepolia testnet with smart contract integration

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- A Web3 wallet (MetaMask, Rainbow, etc.)
- Sepolia ETH for gas fees

### Installation

```bash
# Clone the repository
git clone https://github.com/Firebird0x/glow-loot-fair.git
cd glow-loot-fair

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Setup

Create a `.env.local` file in the root directory:

```env
# Chain Configuration
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990

# Wallet Connect Configuration
VITE_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475

# Contract Addresses (update after deployment)
VITE_LOOTBOX_CONTRACT_ADDRESS=0x...
VITE_FHE_CONTRACT_ADDRESS=0x...
```

## 🏗️ Architecture

### Frontend Stack
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **shadcn/ui** for component library
- **RainbowKit** for wallet connection
- **Wagmi** for Ethereum interactions

### Smart Contracts
- **Solidity 0.8.24** with FHE support
- **FHEVM** for homomorphic encryption
- **Sepolia testnet** deployment
- **Hardhat** for development and testing

### Key Components

```
src/
├── components/          # React components
│   ├── LootBox.tsx     # Main lootbox interaction
│   ├── WalletConnect.tsx # Wallet connection UI
│   └── ui/             # shadcn/ui components
├── hooks/              # Custom React hooks
│   └── useContract.ts  # Smart contract interactions
├── lib/                # Utility libraries
│   └── wagmi.ts        # Wagmi configuration
└── pages/              # Page components
    └── Index.tsx       # Main game page
```

## 🎯 How It Works

### 1. **Encrypted Creation**
- Lootbox contents are generated and encrypted using FHE
- Even developers cannot see what's inside
- Contents are stored on-chain in encrypted form

### 2. **Secure Opening**
- Your wallet signature triggers the FHE decryption process
- Contents are revealed only to you
- No one else can see or manipulate the results

### 3. **Verifiable Fairness**
- All randomness is generated using encrypted seeds
- Probability distributions are mathematically verifiable
- Complete transparency in the fairness mechanism

## 🔧 Development

### Smart Contract Development

```bash
# Install Hardhat dependencies
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox

# Compile contracts
npx hardhat compile

# Run tests
npx hardhat test

# Deploy to Sepolia
npx hardhat run scripts/deploy.js --network sepolia
```

### Frontend Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## 🌐 Deployment

### Vercel Deployment

1. **Connect Repository**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Environment Variables**
   ```
   VITE_CHAIN_ID=11155111
   VITE_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
   VITE_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
   VITE_LOOTBOX_CONTRACT_ADDRESS=0x...
   ```

3. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be live at `https://your-project.vercel.app`

### Smart Contract Deployment

```bash
# Deploy to Sepolia
npx hardhat run scripts/deploy.js --network sepolia

# Verify contract on Etherscan
npx hardhat verify --network sepolia <CONTRACT_ADDRESS> <VERIFIER_ADDRESS>
```

## 🎮 Game Mechanics

### Lootbox Types
- **Common Lootboxes**: 50% chance, basic items
- **Rare Lootboxes**: 30% chance, valuable items  
- **Epic Lootboxes**: 15% chance, powerful items
- **Legendary Lootboxes**: 5% chance, ultra-rare items

### Item Rarities
- **Common**: Basic items with low value
- **Rare**: Uncommon items with moderate value
- **Epic**: Powerful items with high value
- **Legendary**: Ultra-rare items with maximum value

## 🔒 Security Features

- **FHE Encryption**: All sensitive data encrypted using homomorphic encryption
- **Zero-Knowledge Proofs**: Verify fairness without revealing contents
- **Smart Contract Security**: Audited and tested contract code
- **Wallet Security**: Integration with secure wallet providers

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **FHEVM** for homomorphic encryption support
- **RainbowKit** for wallet connection
- **shadcn/ui** for beautiful components
- **Zama** for FHE technology

## 📞 Support

- **Discord**: [Join our community](https://discord.gg/glowlootfair)
- **Twitter**: [@GlowLootFair](https://twitter.com/glowlootfair)
- **Email**: support@glowlootfair.com

## 🔮 Roadmap

- [ ] Mainnet deployment
- [ ] Mobile app development
- [ ] Additional game modes
- [ ] NFT integration
- [ ] Cross-chain support
- [ ] Tournament system

---

**Built with ❤️ by the Glow Loot Fair team**

*Experience the future of fair gaming with FHE technology.*
