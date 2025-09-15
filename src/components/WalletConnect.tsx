import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Shield, Copy, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAccount, useDisconnect } from 'wagmi';

const WalletConnect = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast.success("Address Copied!", {
        description: "Wallet address copied to clipboard"
      });
    }
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 bg-card/50 border border-primary/30 rounded-lg backdrop-blur-sm">
        <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
        <Shield className="w-4 h-4 text-accent" />
        
        <div className="flex items-center gap-2">
          <span className="text-sm font-rajdhani text-accent">
            {formatAddress(address)}
          </span>
          
          <Button
            onClick={copyAddress}
            size="sm"
            variant="ghost"
            className="h-6 w-6 p-0 hover:bg-accent/20"
          >
            <Copy className="w-3 h-3" />
          </Button>
          
          <Button
            onClick={() => disconnect()}
            size="sm"
            variant="ghost"
            className="h-6 w-6 p-0 hover:bg-destructive/20 hover:text-destructive"
          >
            <LogOut className="w-3 h-3" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    onClick={openConnectModal}
                    variant="outline"
                    className="relative group bg-background/80 border-primary/50 hover:border-primary hover:bg-primary/10 backdrop-blur-sm transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/20 via-neon-purple/20 to-neon-pink/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="relative flex items-center gap-2">
                      <span className="font-rajdhani font-semibold">Connect Wallet</span>
                    </div>
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button
                    onClick={openChainModal}
                    variant="outline"
                    className="relative group bg-background/80 border-destructive/50 hover:border-destructive hover:bg-destructive/10 backdrop-blur-sm transition-all duration-300"
                  >
                    <div className="relative flex items-center gap-2">
                      <span className="font-rajdhani font-semibold">Wrong network</span>
                    </div>
                  </Button>
                );
              }

              return (
                <div className="flex items-center gap-2">
                  <Button
                    onClick={openChainModal}
                    variant="outline"
                    size="sm"
                    className="bg-background/80 border-primary/50 hover:border-primary hover:bg-primary/10 backdrop-blur-sm"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: 'hidden',
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </Button>

                  <Button
                    onClick={openAccountModal}
                    variant="outline"
                    className="bg-background/80 border-primary/50 hover:border-primary hover:bg-primary/10 backdrop-blur-sm"
                  >
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ''}
                  </Button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default WalletConnect;