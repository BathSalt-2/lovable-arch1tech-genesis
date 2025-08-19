import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Shield, Eye, Lock, Users, AlertTriangle, CheckCircle } from "lucide-react";

interface MetricProps {
  label: string;
  value: number;
  status: "healthy" | "warning" | "critical";
  icon: React.ReactNode;
}

function EthicalMetric({ label, value, status, icon }: MetricProps) {
  const getStatusColor = () => {
    switch (status) {
      case "healthy": return "text-secondary";
      case "warning": return "text-yellow-400";
      case "critical": return "text-destructive";
    }
  };

  const getProgressColor = () => {
    switch (status) {
      case "healthy": return "bg-secondary";
      case "warning": return "bg-yellow-400";
      case "critical": return "bg-destructive";
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`${getStatusColor()}`}>
            {icon}
          </div>
          <span className="text-sm font-medium">{label}</span>
        </div>
        <Badge variant="outline" className={`text-xs ${getStatusColor()}`}>
          {value}%
        </Badge>
      </div>
      <Progress 
        value={value} 
        className="h-2"
        style={{
          '--progress-background': getProgressColor()
        } as React.CSSProperties}
      />
    </div>
  );
}

export function EthicalMatrix() {
  const metrics = [
    {
      label: "Data Privacy Compliance",
      value: 98,
      status: "healthy" as const,
      icon: <Lock className="w-4 h-4" />
    },
    {
      label: "User Consent Tracking",
      value: 95,
      status: "healthy" as const,
      icon: <Users className="w-4 h-4" />
    },
    {
      label: "AI Decision Transparency",
      value: 87,
      status: "warning" as const,
      icon: <Eye className="w-4 h-4" />
    },
    {
      label: "Ethical AI Alignment",
      value: 92,
      status: "healthy" as const,
      icon: <Shield className="w-4 h-4" />
    }
  ];

  return (
    <Card className="cyber-border">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 neon-text" />
          <h3 className="text-lg font-semibold">Σ-Matrix Control Plane</h3>
          <Badge variant="secondary" className="ml-auto text-xs">
            Active
          </Badge>
        </div>
      </div>
      <div className="p-4 space-y-6">
        {metrics.map((metric, index) => (
          <EthicalMetric key={index} {...metric} />
        ))}
        
        <div className="mt-6 p-3 rounded-lg bg-secondary/10 border border-secondary/20">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-secondary">Ethical Compliance Status</span>
          </div>
          <p className="text-xs text-muted-foreground">
            All autonomous agents operating within ethical boundaries. 
            Immutable decision log maintained for audit compliance.
          </p>
        </div>
      </div>
    </Card>
  );
}