"use client"

import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { 
  Truck, 
  Package, 
  Users, 
  Warehouse, 
  TrendingUp, 
  AlertTriangle,
  Clock,
  CheckCircle,
  ArrowRight,
  MapPin
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const deliveryData = [
  { name: 'Mon', deliveries: 12 },
  { name: 'Tue', deliveries: 19 },
  { name: 'Wed', deliveries: 15 },
  { name: 'Thu', deliveries: 22 },
  { name: 'Fri', deliveries: 18 },
  { name: 'Sat', deliveries: 8 },
  { name: 'Sun', deliveries: 5 },
]

const inventoryData = [
  { name: 'In Stock', value: 65, color: '#22c55e' },
  { name: 'Low Stock', value: 25, color: '#f59e0b' },
  { name: 'Out of Stock', value: 10, color: '#ef4444' },
]

export default function Dashboard() {
  const { t } = useLanguage()

  const overviewCards = [
    {
      title: t('dashboard.upcomingDeliveries'),
      value: '24',
      change: '+12%',
      icon: Truck,
      color: 'bg-blue-500',
      trend: 'up'
    },
    {
      title: t('dashboard.lowStock'),
      value: '8',
      change: '-3',
      icon: AlertTriangle,
      color: 'bg-orange-500',
      trend: 'down'
    },
    {
      title: t('dashboard.sharedRoutes'),
      value: '15',
      change: '+5',
      icon: Users,
      color: 'bg-green-500',
      trend: 'up'
    },
    {
      title: t('dashboard.warehouseBooking'),
      value: '92%',
      change: '+8%',
      icon: Warehouse,
      color: 'bg-purple-500',
      trend: 'up'
    }
  ]

  const recentActivities = [
    {
      id: 1,
      type: 'delivery',
      message: 'Delivery completed to Okhla Industrial Area',
      time: '2 hours ago',
      icon: CheckCircle,
      color: 'text-green-500'
    },
    {
      id: 2,
      type: 'inventory',
      message: 'Low stock alert: Steel Rods (SKU: SR001)',
      time: '4 hours ago',
      icon: AlertTriangle,
      color: 'text-orange-500'
    },
    {
      id: 3,
      type: 'route',
      message: 'New shared route available to Gurgaon',
      time: '6 hours ago',
      icon: MapPin,
      color: 'text-blue-500'
    },
    {
      id: 4,
      type: 'warehouse',
      message: 'Warehouse booking confirmed for next week',
      time: '1 day ago',
      icon: Warehouse,
      color: 'text-purple-500'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          {t('dashboard.welcome')}, Rajesh Kumar
        </h1>
        <p className="text-blue-100">
          Managing operations for Kumar Industries, Bawana Industrial Area
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewCards.map((card, index) => {
          const Icon = card.icon
          return (
            <div key={index} className="bg-card rounded-lg p-6 border border-border hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${card.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center text-sm ${
                  card.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}>
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {card.change}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-1">{card.value}</h3>
              <p className="text-muted-foreground text-sm">{card.title}</p>
            </div>
          )
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Delivery Trends */}
        <div className="bg-card rounded-lg p-6 border border-border">
          <h3 className="text-lg font-semibold mb-4">Weekly Delivery Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={deliveryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="deliveries" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Inventory Status */}
        <div className="bg-card rounded-lg p-6 border border-border">
          <h3 className="text-lg font-semibold mb-4">Inventory Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={inventoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {inventoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-4 mt-4">
            {inventoryData.map((item, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-muted-foreground">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activities & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-card rounded-lg p-6 border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Recent Activities</h3>
            <button className="text-primary hover:text-primary/80 text-sm flex items-center">
              {t('common.viewAll')} <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => {
              const Icon = activity.icon
              return (
                <div key={activity.id} className="flex items-start space-x-3">
                  <Icon className={`w-5 h-5 mt-0.5 ${activity.color}`} />
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{activity.message}</p>
                    <p className="text-xs text-muted-foreground flex items-center mt-1">
                      <Clock className="w-3 h-3 mr-1" />
                      {activity.time}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-card rounded-lg p-6 border border-border">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 border border-border rounded-lg hover:bg-accent transition-colors text-left">
              <Package className="w-8 h-8 text-primary mb-2" />
              <h4 className="font-medium text-sm">Add Inventory</h4>
              <p className="text-xs text-muted-foreground">Add new items to stock</p>
            </button>
            <button className="p-4 border border-border rounded-lg hover:bg-accent transition-colors text-left">
              <Truck className="w-8 h-8 text-primary mb-2" />
              <h4 className="font-medium text-sm">Plan Route</h4>
              <p className="text-xs text-muted-foreground">Create delivery route</p>
            </button>
            <button className="p-4 border border-border rounded-lg hover:bg-accent transition-colors text-left">
              <Users className="w-8 h-8 text-primary mb-2" />
              <h4 className="font-medium text-sm">Find Partners</h4>
              <p className="text-xs text-muted-foreground">Join shared logistics</p>
            </button>
            <button className="p-4 border border-border rounded-lg hover:bg-accent transition-colors text-left">
              <Warehouse className="w-8 h-8 text-primary mb-2" />
              <h4 className="font-medium text-sm">Book Warehouse</h4>
              <p className="text-xs text-muted-foreground">Reserve storage space</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
