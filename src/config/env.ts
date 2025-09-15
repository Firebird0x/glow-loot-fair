export const config = {
  chainId: import.meta.env.VITE_CHAIN_ID || '11155111',
  rpcUrl: import.meta.env.VITE_RPC_URL || 'https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990',
  walletConnectProjectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || '2ec9743d0d0cd7fb94dee1a7e6d33475',
  infuraApiKey: import.meta.env.VITE_INFURA_API_KEY || 'b18fb7e6ca7045ac83c41157ab93f990',
  lootboxContractAddress: import.meta.env.VITE_LOOTBOX_CONTRACT_ADDRESS || '',
  fheContractAddress: import.meta.env.VITE_FHE_CONTRACT_ADDRESS || '',
};
