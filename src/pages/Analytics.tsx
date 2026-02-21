import { useEffect, useState } from "react";
import { api, type DailySales, type Product } from "@/services/api";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line,
} from "recharts";

const COLORS = [
  "hsl(220 70% 50%)", "hsl(35 95% 55%)", "hsl(150 60% 40%)",
  "hsl(280 60% 55%)", "hsl(0 72% 55%)", "hsl(180 60% 45%)",
];

export default function Analytics() {
  const [salesData, setSalesData] = useState<DailySales[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api.getDailySales().then(setSalesData);
    api.getProducts().then(setProducts);
  }, []);

  // Category breakdown
  const categoryMap = products.reduce<Record<string, number>>((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + p.stock * p.cost;
    return acc;
  }, {});
  const categoryData = Object.entries(categoryMap).map(([name, value]) => ({ name, value: +value.toFixed(2) }));

  // Margin data
  const marginData = products.map(p => ({
    name: p.name.split(" ").slice(0, 2).join(" "),
    margin: +((p.price - p.cost) / p.price * 100).toFixed(1),
  })).sort((a, b) => b.margin - a.margin);

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">Deep dive into your sales and inventory data</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Revenue Trend */}
        <div className="glass-card-elevated p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Daily Revenue</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 90%)" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="hsl(220 10% 50%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(220 10% 50%)" />
              <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(220 15% 90%)" }} />
              <Line type="monotone" dataKey="revenue" stroke="hsl(220 70% 50%)" strokeWidth={2} dot={{ fill: "hsl(220 70% 50%)", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Inventory by Category */}
        <div className="glass-card-elevated p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Inventory Value by Category</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(220 15% 90%)" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Profit Margins */}
        <div className="glass-card-elevated p-5 lg:col-span-2">
          <h3 className="text-sm font-semibold text-foreground mb-4">Profit Margins by Product</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={marginData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 90%)" />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} stroke="hsl(220 10% 50%)" unit="%" />
              <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} stroke="hsl(220 10% 50%)" />
              <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(220 15% 90%)" }} formatter={(v: number) => `${v}%`} />
              <Bar dataKey="margin" fill="hsl(150 60% 40%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
