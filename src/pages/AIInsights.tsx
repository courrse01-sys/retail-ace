import { Sparkles, TrendingUp, Package, ShoppingCart, Lightbulb, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const insights = [
  {
    icon: TrendingUp,
    title: "Increase Coffee Bean Orders",
    description: "Based on sales trends, Organic Coffee Beans sell 40% more on weekends. Consider increasing stock by 15 units before Friday.",
    impact: "High",
    category: "Demand Forecasting",
  },
  {
    icon: Package,
    title: "Restock Greek Yogurt Immediately",
    description: "Current stock (3 units) is critically low. Historical data shows 8 units sold per day on average. Risk of stockout within 24 hours.",
    impact: "Critical",
    category: "Stock Alert",
  },
  {
    icon: ShoppingCart,
    title: "Bundle Opportunity Detected",
    description: "Customers who buy Almond Butter frequently also purchase Whole Wheat Bread. Consider creating a bundle deal with 10% discount.",
    impact: "Medium",
    category: "Cross-Selling",
  },
  {
    icon: Lightbulb,
    title: "Optimize Pricing for Sparkling Water",
    description: "Price elasticity analysis suggests a $0.50 increase would result in only 3% volume drop while boosting margins by 8%.",
    impact: "Medium",
    category: "Pricing",
  },
];

const impactColor: Record<string, string> = {
  Critical: "bg-destructive/10 text-destructive",
  High: "bg-warning/10 text-warning",
  Medium: "bg-primary/10 text-primary",
};

export default function AIInsights() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">AI Insights</h1>
          <p className="text-sm text-muted-foreground mt-1">Smart recommendations powered by AI analysis</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent-foreground border border-accent/20">
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          <span className="text-xs font-medium">Placeholder — Connect AI backend</span>
        </div>
      </div>

      <div className="space-y-4">
        {insights.map((insight, i) => (
          <div key={i} className="glass-card-elevated p-5 flex gap-4">
            <div className="mt-0.5 p-2.5 rounded-lg bg-muted shrink-0">
              <insight.icon className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h3 className="text-sm font-semibold text-foreground">{insight.title}</h3>
                <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${impactColor[insight.impact]}`}>
                  {insight.impact}
                </span>
                <span className="text-[10px] font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                  {insight.category}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{insight.description}</p>
              <Button variant="link" className="h-auto p-0 mt-2 text-primary text-xs gap-1">
                Take action <ArrowRight className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
