"use client"

import React, { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { 
  Package, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  AlertTriangle,
  CheckCircle,
  Settings,
  Download,
  TrendingUp,
  TrendingDown
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface InventoryItem {
  id: string
  sku: string
  name: string
  category: string
  quantity: number
  threshold: number
  unit: string
  price: number
  status: 'ok' | 'low' | 'out'
  lastUpdated: string
}

const mockInventoryData: InventoryItem[] = [
  {
    id: '1',
    sku: 'SR001',
    name: 'Steel Rods 12mm',
    category: 'Raw Materials',
    quantity: 150,
    threshold: 50,
    unit: 'pieces',
    price: 450,
    status: 'ok',
    lastUpdated: '2024-01-15'
  },
  {
    id: '2',
    sku: 'CB002',
    name: 'Cement Bags 50kg',
    category: 'Construction',
    quantity: 25,
    threshold: 30,
    unit: 'bags',
    price: 350,
    status: 'low',
    lastUpdated: '2024-01-14'
  },
  {
    id: '3',
    sku: 'WS003',
    name: 'Welding Supplies',
    category: 'Tools',
    quantity: 0,
    threshold: 10,
    unit: 'sets',
    price: 1200,
    status: 'out',
    lastUpdated: '2024-01-13'
  },
  {
    id: '4',
    sku: 'PL004',
    name: 'Plastic Sheets',
    category: 'Materials',
    quantity: 200,
    threshold: 75,
    unit: 'sheets',
    price: 85,
    status: 'ok',
    lastUpdated: '2024-01-15'
  },
  {
    id: '5',
    sku: 'AL005',
    name: 'Aluminum Pipes',
    category: 'Raw Materials',
    quantity: 45,
    threshold: 50,
    unit: 'pieces',
    price: 280,
    status: 'low',
    lastUpdated: '2024-01-12'
  }
]

const stockTrendData = [
  { month: 'Jan', inStock: 85, lowStock: 12, outOfStock: 3 },
  { month: 'Feb', inStock: 78, lowStock: 15, outOfStock: 7 },
  { month: 'Mar', inStock: 82, lowStock: 13, outOfStock: 5 },
  { month: 'Apr', inStock: 88, lowStock: 9, outOfStock: 3 },
  { month: 'May', inStock: 75, lowStock: 18, outOfStock: 7 },
  { month: 'Jun', inStock: 80, lowStock: 15, outOfStock: 5 },
]

export default function InventoryManagement() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'ok' | 'low' | 'out'>('all')
  const [sortBy, setSortBy] = useState<'name' | 'quantity' | 'status'>('name')
  const [showAddModal, setShowAddModal] = useState(false)

  const filteredInventory = mockInventoryData
    .filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(item => filterStatus === 'all' || item.status === filterStatus)
    .sort((a, b) => {
      if (sortBy === 'quantity') return b.quantity - a.quantity
      if (sortBy === 'status') return a.status.localeCompare(b.status)
      return a.name.localeCompare(b.name)
    })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ok': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'low': return <AlertTriangle className="w-4 h-4 text-orange-500" />
      case 'out': return <AlertTriangle className="w-4 h-4 text-red-500" />
      default: return null
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ok': return 'In Stock'
      case 'low': return 'Low Stock'
      case 'out': return 'Out of Stock'
      default: return status
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ok': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'low': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
      case 'out': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t('inventory.title')}</h1>
          <p className="text-muted-foreground">Manage your inventory and stock levels</p>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            <Plus className="w-4 h-4" />
            <span>{t('inventory.addItem')}</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors">
            <Settings className="w-4 h-4" />
            <span>{t('inventory.alertSettings')}</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card rounded-lg p-6 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Items</p>
              <p className="text-2xl font-bold text-foreground">248</p>
            </div>
            <Package className="w-8 h-8 text-blue-500" />
          </div>
          <div className="flex items-center mt-2 text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500">+12%</span>
            <span className="text-muted-foreground ml-1">from last month</span>
          </div>
        </div>

        <div className="bg-card rounded-lg p-6 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Low Stock Items</p>
              <p className="text-2xl font-bold text-foreground">15</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-orange-500" />
          </div>
          <div className="flex items-center mt-2 text-sm">
            <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
            <span className="text-red-500">+3</span>
            <span className="text-muted-foreground ml-1">from yesterday</span>
          </div>
        </div>

        <div className="bg-card rounded-lg p-6 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Out of Stock</p>
              <p className="text-2xl font-bold text-foreground">5</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          <div className="flex items-center mt-2 text-sm">
            <TrendingUp className="w-4 h-4 text-red-500 mr-1" />
            <span className="text-red-500">+2</span>
            <span className="text-muted-foreground ml-1">urgent action needed</span>
          </div>
        </div>

        <div className="bg-card rounded-lg p-6 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Value</p>
              <p className="text-2xl font-bold text-foreground">₹2.4L</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
          <div className="flex items-center mt-2 text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500">+8%</span>
            <span className="text-muted-foreground ml-1">inventory value</span>
          </div>
        </div>
      </div>

      {/* Stock Trends Chart */}
      <div className="bg-card rounded-lg p-6 border border-border">
        <h3 className="text-lg font-semibold mb-4">Stock Level Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stockTrendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="inStock" fill="#22c55e" name="In Stock" />
            <Bar dataKey="lowStock" fill="#f59e0b" name="Low Stock" />
            <Bar dataKey="outOfStock" fill="#ef4444" name="Out of Stock" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Filters and Search */}
      <div className="bg-card rounded-lg p-6 border border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder={t('common.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex space-x-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Status</option>
              <option value="ok">In Stock</option>
              <option value="low">Low Stock</option>
              <option value="out">Out of Stock</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="name">Sort by Name</option>
              <option value="quantity">Sort by Quantity</option>
              <option value="status">Sort by Status</option>
            </select>
            <button className="flex items-center space-x-2 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors">
              <Download className="w-4 h-4" />
              <span>{t('common.export')}</span>
            </button>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">{t('inventory.sku')}</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Name</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Category</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">{t('inventory.quantity')}</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">{t('inventory.threshold')}</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Price</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">{t('inventory.status')}</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map((item) => (
                <tr key={item.id} className="border-b border-border hover:bg-accent/50 transition-colors">
                  <td className="py-3 px-4 font-mono text-sm">{item.sku}</td>
                  <td className="py-3 px-4 font-medium">{item.name}</td>
                  <td className="py-3 px-4 text-muted-foreground">{item.category}</td>
                  <td className="py-3 px-4">
                    <span className="font-medium">{item.quantity}</span>
                    <span className="text-muted-foreground ml-1">{item.unit}</span>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{item.threshold}</td>
                  <td className="py-3 px-4">₹{item.price}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {getStatusIcon(item.status)}
                      <span>{getStatusText(item.status)}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button className="p-1 text-muted-foreground hover:text-primary transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-muted-foreground hover:text-destructive transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
