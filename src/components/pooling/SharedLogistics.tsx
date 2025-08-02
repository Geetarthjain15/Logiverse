"use client"

import React, { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  MapPin,
  Clock,
  Truck,
  Package,
  ArrowRight,
  Star,
  CheckCircle,
  AlertCircle,
  Factory,
  Route,
  DollarSign,
  Calendar
} from 'lucide-react'

interface SharedRoute {
  id: string
  organizer: string
  organizerRating: number
  route: {
    from: string
    to: string
    distance: string
    duration: string
  }
  schedule: {
    date: string
    time: string
    frequency: string
  }
  vehicle: {
    type: string
    capacity: string
    available: string
  }
  cost: {
    perKg: number
    perKm: number
    total: string
  }
  participants: number
  maxParticipants: number
  status: 'open' | 'filling' | 'full'
  tags: string[]
}

const mockSharedRoutes: SharedRoute[] = [
  {
    id: '1',
    organizer: 'Kumar Industries',
    organizerRating: 4.8,
    route: {
      from: 'Bawana Industrial Area',
      to: 'Okhla Industrial Area',
      distance: '28 km',
      duration: '45 mins'
    },
    schedule: {
      date: '2024-01-20',
      time: '10:00 AM',
      frequency: 'Weekly'
    },
    vehicle: {
      type: 'Medium Truck',
      capacity: '3 tons',
      available: '1.2 tons'
    },
    cost: {
      perKg: 8,
      perKm: 12,
      total: '₹960'
    },
    participants: 3,
    maxParticipants: 5,
    status: 'open',
    tags: ['Regular', 'Reliable', 'Cost-effective']
  },
  {
    id: '2',
    organizer: 'Sharma Steel Works',
    organizerRating: 4.6,
    route: {
      from: 'Mayapuri Industrial Area',
      to: 'Gurgaon Sector 18',
      distance: '32 km',
      duration: '55 mins'
    },
    schedule: {
      date: '2024-01-21',
      time: '2:00 PM',
      frequency: 'Bi-weekly'
    },
    vehicle: {
      type: 'Large Truck',
      capacity: '5 tons',
      available: '2.8 tons'
    },
    cost: {
      perKg: 6,
      perKm: 10,
      total: '₹1920'
    },
    participants: 2,
    maxParticipants: 4,
    status: 'filling',
    tags: ['Express', 'Heavy Load']
  },
  {
    id: '3',
    organizer: 'Delhi Logistics Co.',
    organizerRating: 4.9,
    route: {
      from: 'Wazirpur',
      to: 'Faridabad Industrial Area',
      distance: '45 km',
      duration: '1 hr 15 mins'
    },
    schedule: {
      date: '2024-01-22',
      time: '8:00 AM',
      frequency: 'Daily'
    },
    vehicle: {
      type: 'Small Truck',
      capacity: '1.5 tons',
      available: '0.3 tons'
    },
    cost: {
      perKg: 10,
      perKm: 15,
      total: '₹675'
    },
    participants: 4,
    maxParticipants: 4,
    status: 'full',
    tags: ['Daily', 'Small Load', 'Premium']
  }
]

export default function SharedLogistics() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'open' | 'filling' | 'full'>('all')
  const [showCreateModal, setShowCreateModal] = useState(false)

  const filteredRoutes = mockSharedRoutes
    .filter(route => 
      route.route.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.route.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.organizer.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(route => filterStatus === 'all' || route.status === filterStatus)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'filling': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
      case 'full': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open': return 'Open'
      case 'filling': return 'Filling Fast'
      case 'full': return 'Full'
      default: return status
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Shared Logistics Pooling</h1>
          <p className="text-muted-foreground">Join or create shared delivery routes to reduce costs</p>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create Shared Route</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card rounded-lg p-6 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Routes</p>
              <p className="text-2xl font-bold text-foreground">24</p>
            </div>
            <Route className="w-8 h-8 text-blue-500" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">+3 new this week</p>
        </div>

        <div className="bg-card rounded-lg p-6 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Cost Savings</p>
              <p className="text-2xl font-bold text-foreground">₹45K</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-500" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">This month</p>
        </div>

        <div className="bg-card rounded-lg p-6 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Partner MSMEs</p>
              <p className="text-2xl font-bold text-foreground">156</p>
            </div>
            <Factory className="w-8 h-8 text-purple-500" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">Verified partners</p>
        </div>

        <div className="bg-card rounded-lg p-6 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Success Rate</p>
              <p className="text-2xl font-bold text-foreground">96%</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">On-time deliveries</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-card rounded-lg p-6 border border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder="Search routes, locations, or organizers..."
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
              <option value="open">Open</option>
              <option value="filling">Filling</option>
              <option value="full">Full</option>
            </select>
          </div>
        </div>

        {/* Route Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredRoutes.map((route) => (
            <div key={route.id} className="border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Factory className="w-5 h-5 text-primary" />
                  <span className="font-medium">{route.organizer}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-muted-foreground">{route.organizerRating}</span>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(route.status)}`}>
                  {getStatusText(route.status)}
                </span>
              </div>

              {/* Route Info */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{route.route.from}</span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{route.route.to}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{route.schedule.date} at {route.schedule.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Truck className="w-4 h-4 text-muted-foreground" />
                    <span>{route.vehicle.type}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Package className="w-4 h-4 text-muted-foreground" />
                    <span>Available: {route.vehicle.available}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <span>₹{route.cost.perKg}/kg</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {route.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-accent text-accent-foreground rounded-full text-xs">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Participants */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{route.participants}/{route.maxParticipants} participants</span>
                </div>
                <div className="w-24 bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full" 
                    style={{ width: `${(route.participants / route.maxParticipants) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Action Button */}
              <button 
                disabled={route.status === 'full'}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {route.status === 'full' ? (
                  <>
                    <AlertCircle className="w-4 h-4" />
                    <span>Route Full</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Request to Join</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>

        {filteredRoutes.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No routes found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search criteria or create a new shared route.</p>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors mx-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Route</span>
            </button>
          </div>
        )}
      </div>

      {/* Matching Algorithm Visualization */}
      <div className="bg-card rounded-lg p-6 border border-border">
        <h3 className="text-lg font-semibold mb-4">Smart Matching Algorithm</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <MapPin className="w-8 h-8 text-blue-500" />
            </div>
            <h4 className="font-medium mb-2">Route Optimization</h4>
            <p className="text-sm text-muted-foreground">AI analyzes pickup and delivery locations to find optimal shared routes</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="w-8 h-8 text-green-500" />
            </div>
            <h4 className="font-medium mb-2">Schedule Matching</h4>
            <p className="text-sm text-muted-foreground">Matches delivery schedules and time preferences for maximum efficiency</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <DollarSign className="w-8 h-8 text-purple-500" />
            </div>
            <h4 className="font-medium mb-2">Cost Optimization</h4>
            <p className="text-sm text-muted-foreground">Calculates optimal cost sharing based on distance, weight, and vehicle capacity</p>
          </div>
        </div>
      </div>
    </div>
  )
}
