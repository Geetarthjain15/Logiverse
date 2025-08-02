"use client"

import React, { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { 
  BarChart3, 
  Download, 
  Calendar, 
  TrendingUp,
  TrendingDown,
  DollarSign,
  Truck,
  Package,
  Leaf,
  Target,
  Clock,
  Users,
  FileText,
  Filter
} from 'lucide-react'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts'

const deliverySuccessData = [
  { month: 'Jan', success: 94, failed: 6, total: 100 },
  { month: 'Feb', success: 96, failed: 4, total: 100 },
  { month: 'Mar', success: 92, failed: 8, total: 100 },
  { month: 'Apr', success: 98, failed: 2, total: 100 },
  { month: 'May', success: 95, failed: 5, total: 100 },
  { month: 'Jun', success: 97, failed: 3, total: 100 },
]

const logisticsCostData = [
  { month: 'Jan', cost: 45, target: 40 },
  { month: 'Feb', cost: 42, target: 40 },
  { month: 'Mar', cost: 48, target: 40 },
  { month: 'Apr', cost: 38, target: 40 },
  { month: 'May', cost: 41, target: 40 },
  { month: 'Jun', cost: 39, target: 40 },
]

const inventoryTurnoverData = [
  { category: 'Raw Materials', turnover: 8.5, target: 10 },
  { category: 'Finished Goods', turnover: 12.3, target: 12 },
  { category: 'Components', turnover: 6.8, target: 8 },
  { category: 'Tools', turnover: 4.2, target: 6 },
]

const sustainabilityData = [
  { month: 'Jan', co2Saved: 120, fuelSaved: 450 },
  { month: 'Feb', co2Saved: 135, fuelSaved: 520 },
  { month: 'Mar', co2Saved: 98, fuelSaved: 380 },
  { month: 'Apr', co2Saved: 156, fuelSaved: 610 },
  { month: 'May', co2Saved: 142, fuelSaved: 580 },
  { month: 'Jun', co2Saved: 168, fuelSaved: 650 },
]

const routeEfficiencyData = [
  { name: 'Shared Routes', value: 65, color: '#22c55e' },
  { name: 'Direct Routes', value: 35, color: '#3b82f6' },
]

export default function ReportsAnalytics() {
  const { t } = useLanguage()
  const [selectedPeriod, setSelectedPeriod] = useState('6months')
  const [selectedReport, setSelectedReport] = useState('overview')

  const kpiCards = [
    {
      title: 'Delivery Success Rate',
      value: '96.2%',
      change: '+2.1%',
      trend: 'up',
      icon: Target,
      color: 'text-green-500'
    },
    {
      title: 'Avg Cost per Unit',
      value: '₹41.50',
      change: '-₹3.20',
      trend: 'down',
      icon: DollarSign,
      color: 'text-green-500'
    },
    {
      title: 'Inventory Turnover',
      value: '8.2x',
      change: '+0.8x',
      trend: 'up',
      icon: Package,
      color: 'text-blue-500'
    },
    {
      title: 'CO₂ Emissions Saved',
      value: '819 kg',
      change: '+156 kg',
      trend: 'up',
      icon: Leaf,
      color: 'text-green-500'
    }
  ]

  const exportOptions = [
    { label: 'Export as PDF', format: 'pdf' },
    { label: 'Export as Excel', format: 'xlsx' },
    { label: 'Export as CSV', format: 'csv' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t('reports.title')}</h1>
          <p className="text-muted-foreground">Comprehensive analytics and performance insights</p>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="1month">Last Month</option>
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
          </select>
          <div className="relative">
            <select className="px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary appearance-none pr-8">
              {exportOptions.map((option, index) => (
                <option key={index} value={option.format}>{option.label}</option>
              ))}
            </select>
            <Download className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, index) => {
          const Icon = kpi.icon
          return (
            <div key={index} className="bg-card rounded-lg p-6 border border-border">
              <div className="flex items-center justify-between mb-4">
                <Icon className={`w-8 h-8 ${kpi.color}`} />
                <div className={`flex items-center text-sm ${
                  kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {kpi.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 mr-1" />
                  )}
                  {kpi.change}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-1">{kpi.value}</h3>
              <p className="text-muted-foreground text-sm">{kpi.title}</p>
            </div>
          )
        })}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Delivery Success Rate */}
        <div className="bg-card rounded-lg p-6 border border-border">
          <h3 className="text-lg font-semibold mb-4">{t('reports.deliverySuccess')}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={deliverySuccessData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="success" 
                stackId="1"
                stroke="#22c55e" 
                fill="#22c55e" 
                fillOpacity={0.6}
                name="Success Rate (%)"
              />
              <Area 
                type="monotone" 
                dataKey="failed" 
                stackId="1"
                stroke="#ef4444" 
                fill="#ef4444" 
                fillOpacity={0.6}
                name="Failed Rate (%)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Logistics Cost per Unit */}
        <div className="bg-card rounded-lg p-6 border border-border">
          <h3 className="text-lg font-semibold mb-4">{t('reports.logisticsCost')}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={logisticsCostData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="cost" 
                stroke="#3b82f6" 
                strokeWidth={3}
                name="Actual Cost (₹)"
              />
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="#ef4444" 
                strokeDasharray="5 5"
                name="Target Cost (₹)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Inventory Turnover */}
        <div className="bg-card rounded-lg p-6 border border-border">
          <h3 className="text-lg font-semibold mb-4">{t('reports.inventoryTurnover')}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={inventoryTurnoverData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="category" type="category" width={100} />
              <Tooltip />
              <Bar dataKey="turnover" fill="#3b82f6" name="Current Turnover" />
              <Bar dataKey="target" fill="#e5e7eb" name="Target Turnover" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Sustainability Tracker */}
        <div className="bg-card rounded-lg p-6 border border-border">
          <h3 className="text-lg font-semibold mb-4">{t('reports.sustainabilityTracker')}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={sustainabilityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="co2Saved" 
                stroke="#22c55e" 
                fill="#22c55e" 
                fillOpacity={0.6}
                name="CO₂ Saved (kg)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Route Efficiency */}
        <div className="bg-card rounded-lg p-6 border border-border">
          <h3 className="text-lg font-semibold mb-4">Route Efficiency</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={routeEfficiencyData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {routeEfficiencyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-4 mt-4">
            {routeEfficiencyData.map((item, index) => (
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

        {/* Performance Metrics */}
        <div className="bg-card rounded-lg p-6 border border-border">
          <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <span className="text-sm">Avg Delivery Time</span>
              </div>
              <span className="font-medium">2.3 hrs</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Truck className="w-4 h-4 text-green-500" />
                <span className="text-sm">Vehicle Utilization</span>
              </div>
              <span className="font-medium">87%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-purple-500" />
                <span className="text-sm">Partner Satisfaction</span>
              </div>
              <span className="font-medium">4.8/5</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Package className="w-4 h-4 text-orange-500" />
                <span className="text-sm">Damage Rate</span>
              </div>
              <span className="font-medium">0.2%</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-card rounded-lg p-6 border border-border">
          <h3 className="text-lg font-semibold mb-4">Quick Reports</h3>
          <div className="space-y-2">
            <button className="w-full flex items-center space-x-2 p-3 border border-border rounded-lg hover:bg-accent transition-colors text-left">
              <FileText className="w-4 h-4 text-primary" />
              <span className="text-sm">Monthly Summary</span>
            </button>
            <button className="w-full flex items-center space-x-2 p-3 border border-border rounded-lg hover:bg-accent transition-colors text-left">
              <BarChart3 className="w-4 h-4 text-primary" />
              <span className="text-sm">Cost Analysis</span>
            </button>
            <button className="w-full flex items-center space-x-2 p-3 border border-border rounded-lg hover:bg-accent transition-colors text-left">
              <Leaf className="w-4 h-4 text-primary" />
              <span className="text-sm">Sustainability Report</span>
            </button>
            <button className="w-full flex items-center space-x-2 p-3 border border-border rounded-lg hover:bg-accent transition-colors text-left">
              <Target className="w-4 h-4 text-primary" />
              <span className="text-sm">Performance Review</span>
            </button>
          </div>
        </div>
      </div>

      {/* Environmental Impact */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Environmental Impact</h3>
            <p className="text-green-100 mb-4">Your contribution to sustainable logistics</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-2xl font-bold">819 kg</p>
                <p className="text-sm text-green-100">CO₂ Emissions Saved</p>
              </div>
              <div>
                <p className="text-2xl font-bold">3,190 L</p>
                <p className="text-sm text-green-100">Fuel Saved</p>
              </div>
              <div>
                <p className="text-2xl font-bold">65%</p>
                <p className="text-sm text-green-100">Shared Route Usage</p>
              </div>
            </div>
          </div>
          <Leaf className="w-16 h-16 text-green-200" />
        </div>
      </div>
    </div>
  )
}
