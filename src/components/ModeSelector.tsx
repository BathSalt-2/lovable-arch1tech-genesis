import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cpu, Zap, Brain, Code } from "lucide-react";

type Mode = "legacy" | "autonomous";

interface ModeSelectorProps {
  selectedMode: Mode;
  onModeChange: (mode: Mode) => void;
}

export function ModeSelector({ selectedMode, onModeChange }: ModeSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card 
        className={`cyber-border p-6 cursor-pointer transition-all duration-300 ${
          selectedMode === "legacy" 
            ? "ring-2 ring-primary cyber-glow" 
            : "hover:bg-card/60"
        }`}
        onClick={() => onModeChange("legacy")}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/20">
            <Code className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Legacy Mode</h3>
            <Badge variant="outline" className="text-xs">Traditional</Badge>
          </div>
        </div>
        <p className="text-muted-foreground mb-4">
          Classic development approach with manual coding and step-by-step guidance. 
          Perfect for learning and precise control.
        </p>
        <Button 
          variant={selectedMode === "legacy" ? "neon" : "outline"} 
          size="sm"
          className="w-full"
        >
          {selectedMode === "legacy" ? "Active" : "Select Legacy"}
        </Button>
      </Card>

      <Card 
        className={`cyber-border p-6 cursor-pointer transition-all duration-300 ${
          selectedMode === "autonomous" 
            ? "ring-2 ring-accent cyber-glow" 
            : "hover:bg-card/60"
        }`}
        onClick={() => onModeChange("autonomous")}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-accent/20">
            <Brain className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold gradient-text">Autonomous Mode</h3>
            <Badge variant="secondary" className="text-xs bg-accent/20 text-accent">
              AI-Powered
            </Badge>
          </div>
        </div>
        <p className="text-muted-foreground mb-4">
          Revolutionary AI-driven development where intelligent agents create, 
          optimize, and maintain your applications autonomously.
        </p>
        <Button 
          variant={selectedMode === "autonomous" ? "autonomous" : "outline"} 
          size="sm"
          className="w-full"
        >
          {selectedMode === "autonomous" ? "Active" : "Enter Autonomous"}
        </Button>
      </Card>
    </div>
  );
}