import { useState } from "react";
import { useAccount } from 'wagmi';
import GameHeader from "@/components/GameHeader";
import WalletConnect from "@/components/WalletConnect";
import LootBox from "@/components/LootBox";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Zap, Users } from "lucide-react";
import { usePlayerStats } from "@/hooks/useContract";

interface LootItem {
  id: string;
  name: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  icon: React.ReactNode;
}

const Index = () => {
  const { isConnected, address } = useAccount();
  const { stats, isLoading } = usePlayerStats();
  const [openedBoxes, setOpenedBoxes] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0);

  const handleLootBoxOpen = (boxId: string, items: LootItem[]) => {
    setOpenedBoxes(prev => prev + 1);
    setTotalItems(prev => prev + items.length);
  };

  const lootBoxes = [
    { id: "box-1", isLocked: true },
    { id: "box-2", isLocked: true },
    { id: "box-3", isLocked: true },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-cyber-grid opacity-5" />
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      
      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center p-6 border-b border-primary/20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Zap className="w-4 h-4 text-background" />
          </div>
          <span className="font-orbitron font-bold text-lg">FHE LOOT</span>
        </div>
        
        <WalletConnect />
      </nav>

      <div className="relative z-10">
        <GameHeader />
        
        {/* Stats Section */}
        <section className="px-4 mb-12">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: Trophy, label: "Boxes Opened", value: isConnected ? stats.boxesOpened : openedBoxes, color: "neon-green" },
                { icon: Zap, label: "Items Found", value: isConnected ? stats.totalItems : totalItems, color: "neon-blue" },
                { icon: Users, label: "Active Players", value: "1,337", color: "neon-pink" }
              ].map(({ icon: Icon, label, value, color }, index) => (
                <Card key={index} className="p-4 bg-card/50 border-primary/30 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-${color}/20 border border-${color}/30`}>
                      <Icon className={`w-5 h-5 text-${color}`} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-rajdhani">{label}</p>
                      <p className="text-xl font-orbitron font-bold text-foreground">{value}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Lootbox Grid */}
        <section className="px-4 pb-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-orbitron font-bold text-3xl mb-4 text-neon-glow">
                ENCRYPTED LOOTBOXES
              </h2>
              <p className="font-rajdhani text-lg text-muted-foreground">
                Connect your wallet to decrypt and open lootboxes using FHE technology
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {lootBoxes.map((box) => (
                <LootBox
                  key={box.id}
                  id={box.id}
                  isLocked={box.isLocked}
                  canOpen={isConnected}
                  onOpen={handleLootBoxOpen}
                />
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="px-4 pb-12">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 bg-card/30 border-primary/30 backdrop-blur-sm">
              <h3 className="font-orbitron font-bold text-2xl mb-6 text-center text-neon-glow">
                HOW FHE ENSURES FAIRNESS
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    step: "1",
                    title: "Encrypted Contents",
                    description: "All lootbox contents are encrypted using FHE before deployment"
                  },
                  {
                    step: "2", 
                    title: "Secure Opening",
                    description: "Your wallet signature triggers FHE decryption without revealing contents to others"
                  },
                  {
                    step: "3",
                    title: "Fair Reveal",
                    description: "Items are revealed only to you, ensuring no insider manipulation"
                  }
                ].map(({ step, title, description }) => (
                  <div key={step} className="text-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4 font-orbitron font-bold text-background">
                      {step}
                    </div>
                    <h4 className="font-orbitron font-semibold text-lg mb-2 text-foreground">
                      {title}
                    </h4>
                    <p className="font-rajdhani text-muted-foreground">
                      {description}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;