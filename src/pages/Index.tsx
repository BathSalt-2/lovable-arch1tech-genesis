import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ModeSelector } from "@/components/ModeSelector";
import { GenesisLog } from "@/components/GenesisLog";
import { EthicalMatrix } from "@/components/EthicalMatrix";
import { CommandInterface } from "@/components/CommandInterface";
import { Brain, Sparkles, Shield, Zap, Cpu, Code2 } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

type Mode = "legacy" | "autonomous";

const Index = () => {
  const [selectedMode, setSelectedMode] = useState<Mode>("autonomous");

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section 
        className="relative py-20 px-6 overflow-hidden"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Lovable 2.0: Arch1tech Edition</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            <span className="gradient-text">Ignite the Future</span>
            <br />
            <span className="neon-text">of AI Development</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Revolutionary AI-native development environment that transforms ideas into reality 
            through ethical, autonomous creation powered by the Arch1tech engine.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button variant="autonomous" size="lg" className="gap-2">
              <Brain className="w-5 h-5" />
              Enter Autonomous Mode
            </Button>
            <Button variant="cyber" size="lg" className="gap-2">
              <Shield className="w-5 h-5" />
              View Σ-Matrix
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {[
              { icon: <Cpu className="w-6 h-6" />, label: "Serverless", value: "100%" },
              { icon: <Shield className="w-6 h-6" />, label: "Ethical", value: "AI" },
              { icon: <Zap className="w-6 h-6" />, label: "Real-time", value: "∞" },
              { icon: <Code2 className="w-6 h-6" />, label: "Autonomous", value: "2.0" },
            ].map((stat, index) => (
              <div key={index} className="cyber-border p-4 rounded-lg text-center">
                <div className="text-accent mb-2 flex justify-center">{stat.icon}</div>
                <div className="text-2xl font-bold neon-text">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mode Selection */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Choose Your Development Mode</h2>
            <p className="text-lg text-muted-foreground">
              Select between traditional coding or revolutionary autonomous creation
            </p>
          </div>
          
          <ModeSelector 
            selectedMode={selectedMode} 
            onModeChange={setSelectedMode} 
          />
        </div>
      </section>

      {/* Dashboard Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Live Development Environment
            </h2>
            <p className="text-lg text-muted-foreground">
              Monitor your AI creations in real-time with ethical governance
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <GenesisLog />
              <CommandInterface />
            </div>
            <div>
              <EthicalMatrix />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Revolutionary Architecture</h2>
            <p className="text-lg text-muted-foreground">
              Built on cutting-edge technologies for the future of development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Brain className="w-8 h-8" />,
                title: "Autonomous Agents",
                description: "AI-powered agents that code, optimize, and maintain applications independently"
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Ethical Governance",
                description: "Σ-Matrix control plane ensures all AI decisions follow ethical guidelines"
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Serverless Architecture",
                description: "Scalable microservices with real-time command processing capabilities"
              },
              {
                icon: <Cpu className="w-8 h-8" />,
                title: "Docker Containerization",
                description: "Seamless deployment and scaling with modern containerization"
              },
              {
                icon: <Code2 className="w-8 h-8" />,
                title: "FastAPI Communication",
                description: "High-performance internal communication between microservices"
              },
              {
                icon: <Sparkles className="w-8 h-8" />,
                title: "Immutable Decision Log",
                description: "Complete audit trail of all AI decisions and ethical checkpoints"
              }
            ].map((feature, index) => (
              <div key={index} className="cyber-border p-6 rounded-lg group hover:cyber-glow transition-all duration-300">
                <div className="text-accent mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Brain className="w-6 h-6 neon-text" />
            <span className="text-lg font-semibold gradient-text">Lovable 2.0: Arch1tech Edition</span>
          </div>
          <p className="text-muted-foreground">
            Transforming the future of development through ethical AI and autonomous creation
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
