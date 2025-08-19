import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Send, Terminal, Cpu, Zap } from "lucide-react";

export function CommandInterface() {
  const [command, setCommand] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;

    setProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setProcessing(false);
      setCommand("");
    }, 2000);
  };

  const quickCommands = [
    { label: "Initialize Project", command: "init --autonomous", icon: <Zap className="w-3 h-3" /> },
    { label: "Deploy Microservice", command: "deploy --serverless", icon: <Cpu className="w-3 h-3" /> },
    { label: "Run Ethical Audit", command: "audit --sigma-matrix", icon: <Terminal className="w-3 h-3" /> },
  ];

  return (
    <Card className="cyber-border">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 neon-text" />
          <h3 className="text-lg font-semibold">Command Interface</h3>
          <Badge variant="outline" className="ml-auto text-xs">
            Serverless Ready
          </Badge>
        </div>
      </div>
      <div className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              placeholder="Enter autonomous creation command..."
              className="cyber-border"
              disabled={processing}
            />
            <Button 
              type="submit" 
              variant="cyber" 
              size="icon"
              disabled={processing || !command.trim()}
            >
              {processing ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <h4 className="text-sm font-medium mb-3 text-muted-foreground">Quick Commands</h4>
          <div className="space-y-2">
            {quickCommands.map((cmd, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className="w-full justify-start gap-2 hover:bg-muted/10"
                onClick={() => setCommand(cmd.command)}
              >
                {cmd.icon}
                <span className="text-xs">{cmd.label}</span>
                <code className="text-xs bg-muted/20 px-1 py-0.5 rounded ml-auto">
                  {cmd.command}
                </code>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}