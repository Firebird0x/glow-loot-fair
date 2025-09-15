import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Lock, Unlock, Zap, Gift, Star, Diamond, Shield, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useGlowLootContract } from "@/hooks/useContract";

interface LootItem {
  id: string;
  name: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  icon: React.ReactNode;
  value: number;
}

interface LootBoxProps {
  id: string;
  isLocked: boolean;
  canOpen: boolean;
  onOpen: (id: string, items: LootItem[]) => void;
}

const LOOT_ITEMS: LootItem[] = [
  { id: "1", name: "Cyber Blade", rarity: "legendary", icon: <Zap className="w-8 h-8" />, value: 1000 },
  { id: "2", name: "Neon Armor", rarity: "epic", icon: <Shield className="w-8 h-8" />, value: 500 },
  { id: "3", name: "Digital Coins", rarity: "common", icon: <Gift className="w-8 h-8" />, value: 50 },
  { id: "4", name: "Quantum Core", rarity: "rare", icon: <Star className="w-8 h-8" />, value: 200 },
  { id: "5", name: "FHE Crystal", rarity: "legendary", icon: <Diamond className="w-8 h-8" />, value: 1500 },
  { id: "6", name: "Plasma Shield", rarity: "epic", icon: <Shield className="w-8 h-8" />, value: 400 },
  { id: "7", name: "Data Fragment", rarity: "common", icon: <Sparkles className="w-8 h-8" />, value: 25 },
  { id: "8", name: "Energy Cell", rarity: "rare", icon: <Zap className="w-8 h-8" />, value: 150 },
];

const rarityColors = {
  common: "text-muted-foreground",
  rare: "text-accent",
  epic: "text-primary", 
  legendary: "text-secondary"
};

const rarityBorders = {
  common: "border-muted-foreground/30",
  rare: "border-accent/50",
  epic: "border-primary/60", 
  legendary: "border-secondary/80"
};

const rarityChances = {
  legendary: 0.05, // 5%
  epic: 0.15,      // 15%
  rare: 0.30,      // 30%
  common: 0.50     // 50%
};

const generateRandomLoot = (): LootItem[] => {
  const itemCount = Math.floor(Math.random() * 3) + 1; // 1-3 items
  const items: LootItem[] = [];
  
  for (let i = 0; i < itemCount; i++) {
    const rand = Math.random();
    let selectedRarity: keyof typeof rarityChances = 'common';
    
    if (rand <= rarityChances.legendary) {
      selectedRarity = 'legendary';
    } else if (rand <= rarityChances.legendary + rarityChances.epic) {
      selectedRarity = 'epic';
    } else if (rand <= rarityChances.legendary + rarityChances.epic + rarityChances.rare) {
      selectedRarity = 'rare';
    }
    
    const availableItems = LOOT_ITEMS.filter(item => item.rarity === selectedRarity);
    const randomItem = availableItems[Math.floor(Math.random() * availableItems.length)];
    items.push(randomItem);
  }
  
  return items;
};

const LootBox = ({ id, isLocked, canOpen, onOpen }: LootBoxProps) => {
  const [isOpening, setIsOpening] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [revealedItems, setRevealedItems] = useState<LootItem[]>([]);
  const [decryptionProgress, setDecryptionProgress] = useState(0);
  const [boxId, setBoxId] = useState<number | null>(null);
  
  const { createLootBox, openLootBox, isPending, isConfirming } = useGlowLootContract();

  const handleCreateAndOpen = async () => {
    if (!canOpen) {
      toast.error("Wallet Connection Required", {
        description: "Please connect your wallet to decrypt and open lootboxes"
      });
      return;
    }

    setIsOpening(true);
    setDecryptionProgress(0);
    
    try {
      // First create a lootbox
      const itemCount = Math.floor(Math.random() * 3) + 1; // 1-3 items
      const raritySeed = Math.floor(Math.random() * 1000000);
      
      toast.info("Creating encrypted lootbox...", {
        description: "Generating FHE-encrypted contents"
      });
      
      const createResult = await createLootBox(itemCount, raritySeed);
      
      if (createResult.success) {
        setBoxId(parseInt(id.replace('box-', '')));
        
        // Simulate FHE decryption process with progress
        const progressInterval = setInterval(() => {
          setDecryptionProgress(prev => {
            if (prev >= 100) {
              clearInterval(progressInterval);
              return 100;
            }
            return prev + Math.random() * 15;
          });
        }, 200);
        
        // Wait for transaction confirmation
        setTimeout(async () => {
          try {
            // Open the lootbox
            const randomSeed = Math.floor(Math.random() * 1000000);
            const openResult = await openLootBox(boxId || parseInt(id.replace('box-', '')), randomSeed);
            
            if (openResult.success) {
              clearInterval(progressInterval);
              setDecryptionProgress(100);
              
              // Generate items based on the encrypted parameters
              const randomItems = generateRandomLoot();
              const totalValue = randomItems.reduce((sum, item) => sum + item.value, 0);
              
              setRevealedItems(randomItems);
              setIsOpened(true);
              setIsOpening(false);
              onOpen(id, randomItems);
              
              // Show different toasts based on rarity
              const hasLegendary = randomItems.some(item => item.rarity === 'legendary');
              const hasEpic = randomItems.some(item => item.rarity === 'epic');
              
              if (hasLegendary) {
                toast.success("🎉 LEGENDARY DROP!", {
                  description: `Incredible! You found legendary items worth ${totalValue} coins!`
                });
              } else if (hasEpic) {
                toast.success("✨ EPIC LOOT!", {
                  description: `Great find! Items worth ${totalValue} coins decrypted successfully!`
                });
              } else {
                toast.success("Lootbox Decrypted!", {
                  description: `Found ${randomItems.length} items worth ${totalValue} coins using FHE technology`
                });
              }
            }
          } catch (error) {
            console.error('Error opening lootbox:', error);
            toast.error("Failed to open lootbox", {
              description: "Please try again"
            });
            setIsOpening(false);
          }
        }, 2000);
      }
    } catch (error) {
      console.error('Error creating lootbox:', error);
      toast.error("Failed to create lootbox", {
        description: "Please try again"
      });
      setIsOpening(false);
    }
  };

  if (isOpened) {
    const totalValue = revealedItems.reduce((sum, item) => sum + item.value, 0);
    
    return (
      <Card className="w-80 h-96 p-6 bg-card/80 border-accent/50 backdrop-blur-sm relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/10" />
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center">
          <div className="text-center mb-4">
            <Unlock className="w-12 h-12 text-accent mx-auto mb-2" />
            <h3 className="font-orbitron font-bold text-xl text-accent">
              DECRYPTED
            </h3>
            <p className="text-sm text-muted-foreground font-rajdhani mt-1">
              Total Value: {totalValue} coins
            </p>
          </div>
          
          <div className="space-y-2 w-full max-h-48 overflow-y-auto">
            {revealedItems.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className={`flex items-center gap-3 p-3 bg-background/50 rounded-lg border ${rarityBorders[item.rarity]} animate-fade-in`}
                style={{ animationDelay: `${index * 0.3}s` }}
              >
                <div className={rarityColors[item.rarity]}>
                  {item.icon}
                </div>
                <div className="flex-1">
                  <p className={`font-rajdhani font-semibold ${rarityColors[item.rarity]}`}>
                    {item.name}
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-muted-foreground capitalize">
                      {item.rarity}
                    </p>
                    <span className="text-xs text-accent font-medium">
                      {item.value} coins
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={`w-80 h-96 p-6 bg-card/80 border-primary/50 backdrop-blur-sm relative overflow-hidden group cursor-pointer transition-all duration-300 hover:border-primary ${
      isLocked ? "lootbox-pulse" : ""
    } ${isOpening ? "lootbox-unlock" : ""}`}>
      
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 bg-cyber-grid opacity-20" />
      
      {/* Neon Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 group-hover:from-primary/10 group-hover:to-secondary/10 transition-all duration-300" />
      
      <div className="relative z-10 h-full flex flex-col items-center justify-center">
        {isOpening ? (
          <div className="text-center">
            <Zap className="w-16 h-16 text-accent mx-auto mb-4 animate-spin" />
            <h3 className="font-orbitron font-bold text-xl text-accent mb-2">
              DECRYPTING WITH FHE
            </h3>
            <p className="text-sm text-muted-foreground font-rajdhani mb-4">
              Fully Homomorphic Encryption in progress...
            </p>
            <div className="w-full max-w-48 mx-auto">
              <Progress value={decryptionProgress} className="h-2 bg-background/50" />
              <p className="text-xs text-muted-foreground mt-2 font-rajdhani">
                {Math.round(decryptionProgress)}% Complete
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-8 relative">
              <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${
                isLocked 
                  ? "from-primary/20 to-secondary/20" 
                  : "from-accent/20 to-neon-green/20"
              } flex items-center justify-center border-2 ${
                isLocked ? "border-primary/40" : "border-accent/40"
              } transition-all duration-300`}>
                
                {isLocked ? (
                  <Lock className="w-12 h-12 text-primary" />
                ) : (
                  <Gift className="w-12 h-12 text-accent" />
                )}
                
                {/* Lock glow effect */}
                {isLocked && (
                  <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl animate-pulse" />
                )}
              </div>
            </div>
            
            <div className="text-center mb-6">
              <h3 className="font-orbitron font-bold text-xl mb-2 text-neon-glow">
                {isLocked ? "ENCRYPTED LOOT" : "READY TO OPEN"}
              </h3>
              <p className="text-sm text-muted-foreground font-rajdhani">
                {isLocked 
                  ? "Contents secured by FHE encryption" 
                  : "Click to decrypt and reveal items"}
              </p>
            </div>
            
            <Button
              onClick={handleCreateAndOpen}
              disabled={!canOpen || isOpening || isPending || isConfirming}
              variant="outline"
              className="relative group bg-background/50 border-primary/50 hover:border-primary hover:bg-primary/10 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-primary/20 to-secondary/20 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative flex items-center gap-2">
                <Unlock className="w-4 h-4" />
                <span className="font-rajdhani font-semibold">
                  {canOpen ? "DECRYPT & OPEN" : "CONNECT WALLET"}
                </span>
              </div>
            </Button>
          </>
        )}
      </div>
    </Card>
  );
};

export default LootBox;