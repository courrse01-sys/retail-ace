# RetailPulse Backend API

## Setup

```bash
cd backend
npm install
```

## Environment Variables

Create a `.env` file:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/retailpulse
```

## Run

```bash
npm run dev
```

## API Endpoints

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/products | Get all products |
| POST | /api/products | Create a product |
| PUT | /api/products/:id | Update a product |
| DELETE | /api/products/:id | Delete a product |

### Sales
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/sales | Get all sales |
| POST | /api/sales | Record a sale |

### Analytics
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/analytics/dashboard | Dashboard stats |
| GET | /api/analytics/daily-sales | Daily sales data |

## Folder Structure

```
backend/
├── server.js
├── config/
│   └── db.js
├── models/
│   ├── Product.js
│   └── Sale.js
├── controllers/
│   ├── productController.js
│   ├── saleController.js
│   └── analyticsController.js
├── routes/
│   ├── productRoutes.js
│   ├── saleRoutes.js
│   └── analyticsRoutes.js
└── middleware/
    └── errorHandler.js
```
