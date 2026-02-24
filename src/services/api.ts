// Mock API service — set BASE_URL to your Express backend to connect
// Example: const BASE_URL = "http://localhost:5000/api";
const BASE_URL = ""; // Empty = use mock data below
const USE_MOCK = !BASE_URL;

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  minStock: number;
  lastRestocked: string;
}

export interface SaleEntry {
  id: string;
  date: string;
  productId: string;
  productName: string;
  quantity: number;
  revenue: number;
}

export interface DailySales {
  date: string;
  revenue: number;
  orders: number;
}

export interface SmartAlert {
  id: string;
  type: "low_stock" | "overstock" | "slow_moving" | "demand_spike";
  severity: "critical" | "high" | "medium" | "low";
  title: string;
  message: string;
  productName: string;
  productId: string;
  read: boolean;
  createdAt: string;
}

export interface ProductPerformance {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  profitMargin: number;
  salesVelocity: number; // units per day
  inventoryTurnover: number; // times per month
  totalUnitsSold: number;
  totalRevenue: number;
  daysOfSupply: number;
}

export interface ForecastEntry {
  date: string;
  productName: string;
  productId: string;
  predictedDemand: number;
  confidence: number;
}

export interface CategoryPerformance {
  category: string;
  totalRevenue: number;
  totalQuantity: number;
  profit: number;
  margin: number;
  salesCount: number;
}

export interface AdvancedAnalytics {
  topProducts: { productName: string; totalRevenue: number; totalQuantity: number; salesCount: number }[];
  categoryPerformance: CategoryPerformance[];
  profitTrend: { date: string; revenue: number; cost: number; profit: number; orders: number }[];
  inventoryHealth: {
    totalProducts: number;
    healthyStock: number;
    warningStock: number;
    criticalStock: number;
    outOfStock: number;
    totalInventoryValue: number;
    totalRetailValue: number;
  };
}

// Mock data
const mockProducts: Product[] = [
  { id: "1", name: "Organic Coffee Beans", sku: "COF-001", category: "Beverages", price: 14.99, cost: 8.50, stock: 45, minStock: 20, lastRestocked: "2026-02-18" },
  { id: "2", name: "Whole Wheat Bread", sku: "BRD-001", category: "Bakery", price: 4.49, cost: 2.10, stock: 8, minStock: 15, lastRestocked: "2026-02-20" },
  { id: "3", name: "Fresh Milk 1L", sku: "DRY-001", category: "Dairy", price: 3.29, cost: 1.80, stock: 32, minStock: 25, lastRestocked: "2026-02-19" },
  { id: "4", name: "Avocados (pack of 3)", sku: "FRT-001", category: "Produce", price: 5.99, cost: 3.20, stock: 5, minStock: 10, lastRestocked: "2026-02-17" },
  { id: "5", name: "Almond Butter", sku: "SPR-001", category: "Pantry", price: 9.99, cost: 5.50, stock: 28, minStock: 10, lastRestocked: "2026-02-15" },
  { id: "6", name: "Greek Yogurt 500g", sku: "DRY-002", category: "Dairy", price: 4.99, cost: 2.40, stock: 3, minStock: 12, lastRestocked: "2026-02-16" },
  { id: "7", name: "Sparkling Water 6-pack", sku: "BEV-002", category: "Beverages", price: 6.49, cost: 3.00, stock: 52, minStock: 20, lastRestocked: "2026-02-20" },
  { id: "8", name: "Dark Chocolate Bar", sku: "SNK-001", category: "Snacks", price: 3.99, cost: 1.80, stock: 18, minStock: 15, lastRestocked: "2026-02-14" },
];

const mockSalesHistory: DailySales[] = [
  { date: "Feb 15", revenue: 1240, orders: 34 },
  { date: "Feb 16", revenue: 1580, orders: 42 },
  { date: "Feb 17", revenue: 980, orders: 28 },
  { date: "Feb 18", revenue: 1890, orders: 51 },
  { date: "Feb 19", revenue: 2100, orders: 58 },
  { date: "Feb 20", revenue: 1750, orders: 47 },
  { date: "Feb 21", revenue: 1420, orders: 39 },
];

const mockRecentSales: SaleEntry[] = [
  { id: "s1", date: "2026-02-21", productId: "1", productName: "Organic Coffee Beans", quantity: 3, revenue: 44.97 },
  { id: "s2", date: "2026-02-21", productId: "3", productName: "Fresh Milk 1L", quantity: 5, revenue: 16.45 },
  { id: "s3", date: "2026-02-21", productId: "8", productName: "Dark Chocolate Bar", quantity: 8, revenue: 31.92 },
  { id: "s4", date: "2026-02-21", productId: "5", productName: "Almond Butter", quantity: 2, revenue: 19.98 },
  { id: "s5", date: "2026-02-20", productId: "7", productName: "Sparkling Water 6-pack", quantity: 4, revenue: 25.96 },
  { id: "s6", date: "2026-02-20", productId: "1", productName: "Organic Coffee Beans", quantity: 5, revenue: 74.95 },
  { id: "s7", date: "2026-02-19", productId: "4", productName: "Avocados (pack of 3)", quantity: 6, revenue: 35.94 },
  { id: "s8", date: "2026-02-19", productId: "6", productName: "Greek Yogurt 500g", quantity: 10, revenue: 49.90 },
  { id: "s9", date: "2026-02-18", productId: "2", productName: "Whole Wheat Bread", quantity: 12, revenue: 53.88 },
  { id: "s10", date: "2026-02-18", productId: "3", productName: "Fresh Milk 1L", quantity: 8, revenue: 26.32 },
];

let products = [...mockProducts];
let sales = [...mockRecentSales];
let alerts: SmartAlert[] = [];

// Simulate async API calls
const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

// Helper: generate smart alerts from current data
function generateAlerts(): SmartAlert[] {
  const now = new Date().toISOString();
  const result: SmartAlert[] = [];

  // Compute sales per product
  const salesByProduct: Record<string, number> = {};
  sales.forEach(s => {
    salesByProduct[s.productId] = (salesByProduct[s.productId] || 0) + s.quantity;
  });

  products.forEach(p => {
    // Low stock
    if (p.stock <= p.minStock && p.stock > 0) {
      result.push({
        id: `alert-low-${p.id}`,
        type: "low_stock",
        severity: p.stock <= p.minStock * 0.5 ? "critical" : "high",
        title: `Low Stock: ${p.name}`,
        message: `Only ${p.stock} units remaining (min threshold: ${p.minStock}). Restock immediately to avoid stockouts.`,
        productName: p.name,
        productId: p.id,
        read: false,
        createdAt: now,
      });
    }
    // Out of stock
    if (p.stock <= 0) {
      result.push({
        id: `alert-oos-${p.id}`,
        type: "low_stock",
        severity: "critical",
        title: `Out of Stock: ${p.name}`,
        message: `${p.name} is completely out of stock. Revenue is being lost.`,
        productName: p.name,
        productId: p.id,
        read: false,
        createdAt: now,
      });
    }
    // Overstock
    if (p.stock > p.minStock * 3) {
      result.push({
        id: `alert-over-${p.id}`,
        type: "overstock",
        severity: "medium",
        title: `Overstock: ${p.name}`,
        message: `${p.stock} units in stock (min: ${p.minStock}). Consider running a promotion to move excess inventory.`,
        productName: p.name,
        productId: p.id,
        read: false,
        createdAt: now,
      });
    }
    // Slow-moving
    const unitsSold = salesByProduct[p.id] || 0;
    if (unitsSold < 3 && p.stock > 10) {
      result.push({
        id: `alert-slow-${p.id}`,
        type: "slow_moving",
        severity: "low",
        title: `Slow-Moving: ${p.name}`,
        message: `Only ${unitsSold} units sold recently with ${p.stock} in stock. Consider discounting or bundling.`,
        productName: p.name,
        productId: p.id,
        read: false,
        createdAt: now,
      });
    }
    // Demand spike
    if (unitsSold > 8) {
      result.push({
        id: `alert-spike-${p.id}`,
        type: "demand_spike",
        severity: "high",
        title: `Demand Spike: ${p.name}`,
        message: `${unitsSold} units sold recently — significantly above average. Ensure sufficient restocking.`,
        productName: p.name,
        productId: p.id,
        read: false,
        createdAt: now,
      });
    }
  });

  return result;
}

// Helper: compute product performance
function computePerformance(): ProductPerformance[] {
  const salesByProduct: Record<string, { units: number; revenue: number; count: number }> = {};
  sales.forEach(s => {
    if (!salesByProduct[s.productId]) salesByProduct[s.productId] = { units: 0, revenue: 0, count: 0 };
    salesByProduct[s.productId].units += s.quantity;
    salesByProduct[s.productId].revenue += s.revenue;
    salesByProduct[s.productId].count += 1;
  });

  return products.map(p => {
    const data = salesByProduct[p.id] || { units: 0, revenue: 0, count: 0 };
    const profitMargin = p.price > 0 ? +((p.price - p.cost) / p.price * 100).toFixed(1) : 0;
    const salesVelocity = +(data.units / 7).toFixed(1); // units per day over 7 days
    const inventoryTurnover = p.stock > 0 ? +((data.units / p.stock) * 4.3).toFixed(1) : 0; // monthly
    const daysOfSupply = salesVelocity > 0 ? Math.round(p.stock / salesVelocity) : 999;

    return {
      id: p.id,
      name: p.name,
      sku: p.sku,
      category: p.category,
      price: p.price,
      cost: p.cost,
      stock: p.stock,
      profitMargin,
      salesVelocity,
      inventoryTurnover,
      totalUnitsSold: data.units,
      totalRevenue: +data.revenue.toFixed(2),
      daysOfSupply,
    };
  });
}

// Helper: generate forecast
function generateForecast(): ForecastEntry[] {
  const salesByProduct: Record<string, number> = {};
  sales.forEach(s => {
    salesByProduct[s.productId] = (salesByProduct[s.productId] || 0) + s.quantity;
  });

  const forecasts: ForecastEntry[] = [];
  const today = new Date();

  products.forEach(p => {
    const avgDaily = (salesByProduct[p.id] || 0) / 7;
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      const variation = 0.8 + Math.random() * 0.4; // ±20%
      forecasts.push({
        date: date.toISOString().split("T")[0],
        productName: p.name,
        productId: p.id,
        predictedDemand: Math.max(1, Math.round(avgDaily * variation)),
        confidence: +(70 + Math.random() * 25).toFixed(0),
      });
    }
  });

  return forecasts;
}

// Helper: advanced analytics
function computeAdvancedAnalytics(): AdvancedAnalytics {
  const salesByProduct: Record<string, { name: string; revenue: number; quantity: number; count: number }> = {};
  const salesByCategory: Record<string, { revenue: number; quantity: number; cost: number; count: number }> = {};

  sales.forEach(s => {
    if (!salesByProduct[s.productId]) salesByProduct[s.productId] = { name: s.productName, revenue: 0, quantity: 0, count: 0 };
    salesByProduct[s.productId].revenue += s.revenue;
    salesByProduct[s.productId].quantity += s.quantity;
    salesByProduct[s.productId].count += 1;

    const product = products.find(p => p.id === s.productId);
    if (product) {
      const cat = product.category;
      if (!salesByCategory[cat]) salesByCategory[cat] = { revenue: 0, quantity: 0, cost: 0, count: 0 };
      salesByCategory[cat].revenue += s.revenue;
      salesByCategory[cat].quantity += s.quantity;
      salesByCategory[cat].cost += product.cost * s.quantity;
      salesByCategory[cat].count += 1;
    }
  });

  const topProducts = Object.values(salesByProduct)
    .map(p => ({ productName: p.name, totalRevenue: +p.revenue.toFixed(2), totalQuantity: p.quantity, salesCount: p.count }))
    .sort((a, b) => b.totalRevenue - a.totalRevenue);

  const categoryPerformance: CategoryPerformance[] = Object.entries(salesByCategory).map(([category, d]) => ({
    category,
    totalRevenue: +d.revenue.toFixed(2),
    totalQuantity: d.quantity,
    profit: +(d.revenue - d.cost).toFixed(2),
    margin: d.revenue > 0 ? +((d.revenue - d.cost) / d.revenue * 100).toFixed(1) : 0,
    salesCount: d.count,
  })).sort((a, b) => b.totalRevenue - a.totalRevenue);

  // Profit trend (reuse daily sales + estimate cost at 55%)
  const profitTrend = mockSalesHistory.map(d => ({
    date: d.date,
    revenue: d.revenue,
    cost: +(d.revenue * 0.55).toFixed(2),
    profit: +(d.revenue * 0.45).toFixed(2),
    orders: d.orders,
  }));

  const healthyStock = products.filter(p => p.stock > p.minStock * 1.5).length;
  const warningStock = products.filter(p => p.stock > p.minStock && p.stock <= p.minStock * 1.5).length;
  const criticalStock = products.filter(p => p.stock > 0 && p.stock <= p.minStock).length;
  const outOfStock = products.filter(p => p.stock === 0).length;

  return {
    topProducts,
    categoryPerformance,
    profitTrend,
    inventoryHealth: {
      totalProducts: products.length,
      healthyStock,
      warningStock,
      criticalStock,
      outOfStock,
      totalInventoryValue: +products.reduce((s, p) => s + p.cost * p.stock, 0).toFixed(2),
      totalRetailValue: +products.reduce((s, p) => s + p.price * p.stock, 0).toFixed(2),
    },
  };
}

// Generate dynamic AI insights from actual data
function generateAIInsights() {
  const perf = computePerformance();
  const alertsList = generateAlerts();

  const insights: { title: string; description: string; impact: string; category: string }[] = [];

  // Critical restocks
  const critical = perf.filter(p => p.daysOfSupply < 3 && p.salesVelocity > 0).sort((a, b) => a.daysOfSupply - b.daysOfSupply);
  critical.forEach(p => {
    insights.push({
      title: `Restock ${p.name} Immediately`,
      impact: "Critical",
      category: "Stock Alert",
      description: `Only ${p.stock} units left with ${p.salesVelocity} units/day velocity. Will stockout in ~${p.daysOfSupply} days. Suggested restock: ${Math.ceil(p.salesVelocity * 14)} units.`,
    });
  });

  // Best sellers
  const bestSellers = [...perf].sort((a, b) => b.totalRevenue - a.totalRevenue).slice(0, 2);
  bestSellers.forEach(p => {
    insights.push({
      title: `Top Performer: ${p.name}`,
      impact: "High",
      category: "Sales Insight",
      description: `Generated $${p.totalRevenue} revenue with ${p.totalUnitsSold} units sold. Profit margin: ${p.profitMargin}%. Consider increasing stock allocation.`,
    });
  });

  // Slow movers
  const slowMovers = perf.filter(p => p.salesVelocity < 0.5 && p.stock > 10);
  slowMovers.forEach(p => {
    insights.push({
      title: `Slow-Moving: ${p.name}`,
      impact: "Medium",
      category: "Inventory",
      description: `${p.stock} units in stock but only ${p.salesVelocity} units/day velocity. ${p.daysOfSupply}+ days of supply. Consider promotional pricing.`,
    });
  });

  // High margin opportunities
  const highMargin = perf.filter(p => p.profitMargin > 40 && p.salesVelocity < 2).sort((a, b) => b.profitMargin - a.profitMargin);
  highMargin.slice(0, 1).forEach(p => {
    insights.push({
      title: `High-Margin Opportunity: ${p.name}`,
      impact: "Medium",
      category: "Pricing",
      description: `${p.profitMargin}% margin but low velocity (${p.salesVelocity}/day). Increase marketing spend — each sale is highly profitable.`,
    });
  });

  // Demand spike warnings
  const spikes = alertsList.filter(a => a.type === "demand_spike");
  spikes.forEach(a => {
    insights.push({
      title: a.title,
      impact: "High",
      category: "Demand Forecasting",
      description: a.message,
    });
  });

  return insights.length > 0 ? insights : [
    { title: "All Systems Nominal", description: "Inventory levels and sales velocity are within normal ranges. No immediate actions required.", impact: "Low", category: "Status" },
  ];
}

export const api = {
  // Products
  async getProducts(): Promise<Product[]> {
    await delay(200);
    return [...products];
  },

  async addProduct(product: Omit<Product, "id">): Promise<Product> {
    await delay(300);
    const newProduct = { ...product, id: Date.now().toString() };
    products.push(newProduct);
    return newProduct;
  },

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    await delay(300);
    const idx = products.findIndex(p => p.id === id);
    if (idx === -1) throw new Error("Product not found");
    products[idx] = { ...products[idx], ...updates };
    return products[idx];
  },

  async deleteProduct(id: string): Promise<void> {
    await delay(200);
    products = products.filter(p => p.id !== id);
  },

  // Sales
  async getSales(): Promise<SaleEntry[]> {
    await delay(200);
    return [...sales];
  },

  async addSale(sale: Omit<SaleEntry, "id">): Promise<SaleEntry> {
    await delay(300);
    const newSale = { ...sale, id: `s${Date.now()}` };
    sales.unshift(newSale);
    const product = products.find(p => p.id === sale.productId);
    if (product) product.stock = Math.max(0, product.stock - sale.quantity);
    return newSale;
  },

  async getDailySales(): Promise<DailySales[]> {
    await delay(200);
    return [...mockSalesHistory];
  },

  // Dashboard
  async getDashboardStats() {
    await delay(200);
    const totalProducts = products.length;
    const lowStockItems = products.filter(p => p.stock <= p.minStock);
    const totalRevenue = mockSalesHistory.reduce((s, d) => s + d.revenue, 0);
    const totalOrders = mockSalesHistory.reduce((s, d) => s + d.orders, 0);
    const inventoryValue = products.reduce((s, p) => s + p.cost * p.stock, 0);

    return {
      totalProducts,
      lowStockCount: lowStockItems.length,
      lowStockItems,
      totalRevenue,
      totalOrders,
      inventoryValue,
      avgOrderValue: totalRevenue / totalOrders,
    };
  },

  // Smart Alerts
  async getAlerts(): Promise<SmartAlert[]> {
    await delay(200);
    return generateAlerts();
  },

  async getUnreadAlertCount(): Promise<number> {
    await delay(100);
    return generateAlerts().filter(a => !a.read).length;
  },

  // Product Performance
  async getProductPerformance(): Promise<ProductPerformance[]> {
    await delay(250);
    return computePerformance();
  },

  // Demand Forecasting
  async getForecast(): Promise<ForecastEntry[]> {
    await delay(300);
    return generateForecast();
  },

  // Advanced Analytics
  async getAdvancedAnalytics(): Promise<AdvancedAnalytics> {
    await delay(300);
    return computeAdvancedAnalytics();
  },

  // AI Insights (dynamic)
  async getAIInsights() {
    await delay(400);
    return generateAIInsights();
  },
};
