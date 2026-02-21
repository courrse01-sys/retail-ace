// Mock API service — replace with real REST API calls later

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
];

let products = [...mockProducts];
let sales = [...mockRecentSales];

// Simulate async API calls
const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

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
    // Reduce stock
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
};
