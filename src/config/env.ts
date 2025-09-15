export const config = {
  chainId: import.meta.env.VITE_CHAIN_ID || '11155111',
  rpcUrl: import.meta.env.VITE_RPC_URL || 'https://1rpc.io/sepolia',
  walletConnectProjectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || '',
  infuraApiKey: import.meta.env.VITE_INFURA_API_KEY || '',
  lootboxContractAddress: import.meta.env.VITE_LOOTBOX_CONTRACT_ADDRESS || '',
  fheContractAddress: import.meta.env.VITE_FHE_CONTRACT_ADDRESS || '',
};
