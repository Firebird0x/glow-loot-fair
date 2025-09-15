import { Shield, Zap, Lock } from "lucide-react";

const GameHeader = () => {
  return (
    <header className="relative py-12 px-4 text-center">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-cyber-grid opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5" />
      
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Logo/Icon Section */}
        <div className="flex justify-center items-center gap-4 mb-6">
          <div className="p-4 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 backdrop-blur-sm">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <Zap className="w-6 h-6 text-neon-green animate-pulse" />
          <div className="p-4 rounded-xl bg-gradient-to-br from-accent/20 to-secondary/20 border border-accent/30 backdrop-blur-sm">
            <Lock className="w-8 h-8 text-accent" />
          </div>
        </div>
        
        {/* Main Title */}
        <h1 className="font-orbitron font-black text-4xl md:text-6xl lg:text-7xl mb-4 text-neon-glow">
          <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            LOOT FAIRLY
          </span>
        </h1>
        
        {/* Subtitle */}
        <h2 className="font-orbitron font-bold text-xl md:text-2xl lg:text-3xl mb-6 text-foreground/80">
          SECURED BY{" "}
          <span className="text-neon-green text-neon-glow">FHE</span>
        </h2>
        
        {/* Description */}
        <p className="font-rajdhani text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Experience truly fair gaming with fully homomorphic encryption. 
          Lootbox contents remain encrypted until opened, ensuring no insider advantage 
          and complete transparency in every drop.
        </p>
        
        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {[
            { icon: Shield, text: "Encrypted Contents", color: "primary" },
            { icon: Zap, text: "Instant Reveal", color: "accent" },
            { icon: Lock, text: "Zero Manipulation", color: "secondary" }
          ].map(({ icon: Icon, text, color }, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 px-4 py-2 rounded-full bg-background/50 border border-${color}/30 backdrop-blur-sm`}
            >
              <Icon className={`w-4 h-4 text-neon-${color === 'primary' ? 'blue' : color === 'accent' ? 'green' : 'purple'}`} />
              <span className="text-sm font-rajdhani font-semibold text-foreground/70">
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default GameHeader;