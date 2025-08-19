import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Terminal, Zap, CheckCircle, AlertTriangle, Clock } from "lucide-react";

interface LogEntry {
  id: string;
  timestamp: Date;
  type: "creation" | "ethical" | "system" | "agent";
  message: string;
  status: "success" | "warning" | "processing" | "error";
  agent?: string;
}

export function GenesisLog() {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    // Simulate real-time log updates
    const mockLogs: LogEntry[] = [
      {
        id: "1",
        timestamp: new Date(),
        type: "system",
        message: "Lovable 2.0 Genesis Log initialized",
        status: "success"
      },
      {
        id: "2",
        timestamp: new Date(Date.now() - 1000),
        type: "ethical",
        message: "Σ-Matrix control plane activated - ethical governance online",
        status: "success"
      },
      {
        id: "3",
        timestamp: new Date(Date.now() - 2000),
        type: "agent",
        message: "Arch1tech engine calibrating autonomous creation parameters",
        status: "processing",
        agent: "Arch1tech-Core"
      },
      {
        id: "4",
        timestamp: new Date(Date.now() - 3000),
        type: "creation",
        message: "Serverless microservices architecture initialized",
        status: "success"
      },
      {
        id: "5",
        timestamp: new Date(Date.now() - 4000),
        type: "system",
        message: "JWT authentication layer secured",
        status: "success"
      }
    ];

    setLogs(mockLogs);

    // Simulate new log entries
    const interval = setInterval(() => {
      const newLog: LogEntry = {
        id: Date.now().toString(),
        timestamp: new Date(),
        type: Math.random() > 0.5 ? "agent" : "ethical",
        message: Math.random() > 0.5 
          ? "Agent LLM processing autonomous creation request" 
          : "Ethical decision checkpoint: data isolation verified",
        status: "processing",
        agent: "Arch1tech-Agent-" + Math.floor(Math.random() * 100)
      };

      setLogs(prev => [newLog, ...prev.slice(0, 19)]);

      // Update status after a delay
      setTimeout(() => {
        setLogs(prev => prev.map(log => 
          log.id === newLog.id 
            ? { ...log, status: "success" as const }
            : log
        ));
      }, 2000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getIcon = (type: LogEntry["type"]) => {
    switch (type) {
      case "creation": return <Zap className="w-4 h-4" />;
      case "ethical": return <CheckCircle className="w-4 h-4" />;
      case "system": return <Terminal className="w-4 h-4" />;
      case "agent": return <CheckCircle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: LogEntry["status"]) => {
    switch (status) {
      case "success": return "text-secondary";
      case "warning": return "text-yellow-400";
      case "processing": return "text-accent animate-pulse";
      case "error": return "text-destructive";
    }
  };

  const getTypeColor = (type: LogEntry["type"]) => {
    switch (type) {
      case "creation": return "bg-primary/20 text-primary";
      case "ethical": return "bg-secondary/20 text-secondary";
      case "system": return "bg-muted/20 text-muted-foreground";
      case "agent": return "bg-accent/20 text-accent";
    }
  };

  return (
    <Card className="cyber-border">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 neon-text" />
          <h3 className="text-lg font-semibold">Genesis Log</h3>
          <Badge variant="outline" className="ml-auto text-xs animate-pulse-slow">
            Live
          </Badge>
        </div>
      </div>
      <ScrollArea className="h-80">
        <div className="p-4 space-y-3">
          {logs.map((log) => (
            <div key={log.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/5 hover:bg-muted/10 transition-colors">
              <div className={`p-1 rounded ${getStatusColor(log.status)}`}>
                {getIcon(log.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className={`text-xs ${getTypeColor(log.type)}`}>
                    {log.type.toUpperCase()}
                  </Badge>
                  {log.agent && (
                    <Badge variant="outline" className="text-xs bg-accent/10 text-accent">
                      {log.agent}
                    </Badge>
                  )}
                  <span className="text-xs text-muted-foreground ml-auto">
                    {log.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm text-foreground">{log.message}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}