# LogiVerse - Smart Logistics Platform for MSMEs

LogiVerse is a modern, mobile-first SaaS web platform designed specifically for industrial MSMEs (Micro, Small & Medium Enterprises) in Delhi to manage smart logistics, inventory, and warehousing operations.

## 🚀 Features

### 📊 Dashboard

- **Welcome Interface**: Personalized dashboard with MSME name and region
- **Overview Cards**: Real-time insights on deliveries, inventory, routes, and warehouse status
- **Quick Actions**: Fast access to common operations
- **Analytics**: Visual charts and infographics for business insights

### 📦 Inventory Management (IMaaS)

- **Live Stock Tracking**: Real-time inventory monitoring with sortable tables
- **Smart Alerts**: Low stock and out-of-stock notifications
- **Auto-Replenish Rules**: Automated inventory management
- **Visual Analytics**: Stock level charts and trend analysis
- **CRUD Operations**: Complete inventory item management

### 🛣️ Route & Delivery Planner

- **AI-Optimized Routing**: Smart route generation considering traffic and constraints
- **Real-time Traffic Data**: Live traffic updates and congestion alerts
- **ETA Calculations**: Accurate delivery time predictions
- **Vehicle Constraints**: Lane width and vehicle size considerations
- **Cost Optimization**: Fuel and toll cost calculations

### 🤝 Shared Logistics Pooling

- **Route Matching**: Find MSMEs with similar delivery routes
- **Cost Sharing**: Reduce logistics costs through shared transportation
- **Partner Network**: Connect with verified MSME partners
- **Smart Algorithm**: AI-powered matching for optimal route sharing

### 🏭 Micro-Warehousing Access

- **Interactive Map**: Visual warehouse location finder
- **Availability Status**: Real-time space availability
- **Booking System**: Easy warehouse space reservation
- **Pricing Comparison**: Compare rates across different locations
- **Feature Filtering**: Find warehouses with specific amenities

### 📈 Reports & Analytics

- **Performance Metrics**: Delivery success rates and KPIs
- **Cost Analysis**: Logistics cost per unit tracking
- **Inventory Turnover**: Stock rotation analytics
- **Sustainability Tracking**: CO₂ emissions and fuel savings
- **Export Options**: PDF, Excel, and CSV report generation

### 🌐 Multilingual Support

- **Language Toggle**: Switch between English and Hindi
- **Localized Content**: Complete translation for Indian MSMEs
- **Cultural Adaptation**: UI/UX designed for local business practices

## 🛠️ Technology Stack

- **Frontend**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React icons
- **State Management**: React Context API
- **Theme**: Dark/Light mode support with next-themes
- **Notifications**: React Hot Toast
- **Forms**: React Hook Form with Zod validation

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Geetarthjain15/Logiverse.git
   cd logiverse
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Mobile-First Design

LogiVerse is built with a mobile-first approach, ensuring optimal experience across all devices:

- **Responsive Layout**: Adapts to all screen sizes
- **Touch-Friendly**: Optimized for mobile interactions
- **Fast Loading**: Optimized performance for mobile networks
- **Offline Capability**: Core features work offline

## 🎨 Design System

- **Modern UI**: Clean, intuitive interface design
- **Glassmorphism**: Subtle glass effects for modern appeal
- **Consistent Typography**: Inter font family for readability
- **Color Palette**: Professional colors suitable for business use
- **Accessibility**: WCAG compliant design

## 🏗️ Project Structure

```
logiverse/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── dashboard/         # Dashboard page
│   │   ├── inventory/         # Inventory management
│   │   ├── routes/           # Route planning
│   │   ├── pooling/          # Shared logistics
│   │   ├── warehousing/      # Warehouse access
│   │   ├── scheduler/        # Delivery scheduler
│   │   ├── marketplace/      # Digital marketplace
│   │   ├── reports/          # Analytics & reports
│   │   └── settings/         # Application settings
│   ├── components/           # Reusable React components
│   │   ├── layout/          # Layout components
│   │   ├── dashboard/       # Dashboard components
│   │   ├── inventory/       # Inventory components
│   │   ├── routes/          # Route planning components
│   │   ├── pooling/         # Shared logistics components
│   │   ├── warehousing/     # Warehouse components
│   │   └── reports/         # Analytics components
│   ├── contexts/            # React Context providers
│   ├── lib/                 # Utility functions
│   └── types/               # TypeScript type definitions
├── public/                  # Static assets
└── docs/                   # Documentation
```

## 🌟 Key Features for MSMEs

### For Small Factory Owners

- **Simple Interface**: Easy-to-use design for non-tech users
- **Cost Optimization**: Reduce logistics costs through smart routing
- **Inventory Control**: Prevent stockouts and overstock situations
- **Partner Network**: Connect with other local businesses

### For Delhi Industrial Areas

- **Local Focus**: Designed specifically for Delhi's industrial zones
- **Traffic Integration**: Real-time Delhi traffic data
- **Regional Warehouses**: Local micro-warehousing options
- **Compliance**: Aligned with local business practices

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Environment Variables

Create a `.env.local` file for environment-specific configurations:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=your-api-url
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support and questions, please contact:

- Email: support@logiverse.com
- Phone: +91 XXXXX XXXXX

---

**LogiVerse** - Empowering MSMEs with Smart Logistics Solutions 🚛📦
