"use client"

import React, { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { 
  Warehouse, 
  MapPin, 
  Calendar, 
  Clock, 
  DollarSign,
  Star,
  Filter,
  Search,
  CheckCircle,
  AlertCircle,
  Truck,
  Shield,
  Thermometer,
  Zap,
  Phone,
  Mail
} from 'lucide-react'

interface WarehouseLocation {
  id: string
  name: string
  address: string
  area: string
  distance: string
  rating: number
  reviews: number
  size: {
    total: string
    available: string
    unit: string
  }
  pricing: {
    daily: number
    weekly: number
    monthly: number
  }
  features: string[]
  availability: 'available' | 'limited' | 'full'
  contact: {
    phone: string
    email: string
  }
  images: string[]
  description: string
}

const mockWarehouses: WarehouseLocation[] = [
  {
    id: '1',
    name: 'Delhi Industrial Storage Hub',
    address: 'Plot 45, Bawana Industrial Area, Delhi',
    area: 'Bawana',
    distance: '2.3 km',
    rating: 4.8,
    reviews: 124,
    size: {
      total: '5000',
      available: '1200',
      unit: 'sq ft'
    },
    pricing: {
      daily: 15,
      weekly: 90,
      monthly: 350
    },
    features: ['24/7 Security', 'Climate Control', 'Loading Dock', 'CCTV', 'Fire Safety'],
    availability: 'available',
    contact: {
      phone: '+91 98765 43210',
      email: 'contact@delhistorage.com'
    },
    images: ['warehouse1.jpg'],
    description: 'Modern warehouse facility with state-of-the-art security and climate control systems.'
  },
  {
    id: '2',
    name: 'Okhla Logistics Center',
    address: 'Sector 12, Okhla Industrial Area, Delhi',
    area: 'Okhla',
    distance: '5.7 km',
    rating: 4.6,
    reviews: 89,
    size: {
      total: '3500',
      available: '800',
      unit: 'sq ft'
    },
    pricing: {
      daily: 12,
      weekly: 75,
      monthly: 280
    },
    features: ['24/7 Access', 'Loading Bay', 'Security', 'Inventory Management'],
    availability: 'limited',
    contact: {
      phone: '+91 98765 43211',
      email: 'info@okhlalogistics.com'
    },
    images: ['warehouse2.jpg'],
    description: 'Strategic location with excellent connectivity to major highways and transport hubs.'
  },
  {
    id: '3',
    name: 'Mayapuri Storage Solutions',
    address: 'Phase 2, Mayapuri Industrial Area, Delhi',
    area: 'Mayapuri',
    distance: '8.1 km',
    rating: 4.9,
    reviews: 156,
    size: {
      total: '7500',
      available: '0',
      unit: 'sq ft'
    },
    pricing: {
      daily: 18,
      weekly: 110,
      monthly: 420
    },
    features: ['Premium Security', 'Climate Control', 'Cold Storage', 'Automated Systems', 'Insurance'],
    availability: 'full',
    contact: {
      phone: '+91 98765 43212',
      email: 'bookings@mayapuristorage.com'
    },
    images: ['warehouse3.jpg'],
    description: 'Premium warehouse facility with advanced automation and specialized storage options.'
  }
]

export default function WarehouseAccess() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterArea, setFilterArea] = useState<string>('all')
  const [filterAvailability, setFilterAvailability] = useState<'all' | 'available' | 'limited' | 'full'>('all')
  const [selectedWarehouse, setSelectedWarehouse] = useState<WarehouseLocation | null>(null)
  const [showBookingModal, setShowBookingModal] = useState(false)

  const filteredWarehouses = mockWarehouses
    .filter(warehouse => 
      warehouse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      warehouse.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
      warehouse.address.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(warehouse => filterArea === 'all' || warehouse.area.toLowerCase() === filterArea.toLowerCase())
    .filter(warehouse => filterAvailability === 'all' || warehouse.availability === filterAvailability)

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'limited': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
      case 'full': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case 'available': return 'Available'
      case 'limited': return 'Limited Space'
      case 'full': return 'Fully Booked'
      default: return availability
    }
  }

  const getFeatureIcon = (feature: string) => {
    switch (feature.toLowerCase()) {
      case '24/7 security':
      case 'premium security':
      case 'security': return <Shield className="w-4 h-4" />
      case 'climate control':
      case 'cold storage': return <Thermometer className="w-4 h-4" />
      case 'loading dock':
      case 'loading bay': return <Truck className="w-4 h-4" />
      case 'automated systems': return <Zap className="w-4 h-4" />
      default: return <CheckCircle className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t('warehouse.title')}</h1>
          <p className="text-muted-foreground">Find and book micro-warehousing spaces near you</p>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <button className="flex items-center space-x-2 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors">
            <Calendar className="w-4 h-4" />
            <span>My Bookings</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card rounded-lg p-6 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Available Warehouses</p>
              <p className="text-2xl font-bold text-foreground">18</p>
            </div>
            <Warehouse className="w-8 h-8 text-blue-500" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">Across Delhi NCR</p>
        </div>

        <div className="bg-card rounded-lg p-6 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Average Rate</p>
              <p className="text-2xl font-bold text-foreground">₹14/day</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-500" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">Per sq ft</p>
        </div>

        <div className="bg-card rounded-lg p-6 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Space</p>
              <p className="text-2xl font-bold text-foreground">45K</p>
            </div>
            <MapPin className="w-8 h-8 text-purple-500" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">Sq ft available</p>
        </div>

        <div className="bg-card rounded-lg p-6 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Rating</p>
              <p className="text-2xl font-bold text-foreground">4.7</p>
            </div>
            <Star className="w-8 h-8 text-yellow-500" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">Customer satisfaction</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Warehouse Listings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Filters */}
          <div className="bg-card rounded-lg p-6 border border-border">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search warehouses, areas, or features..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex space-x-2">
                <select
                  value={filterArea}
                  onChange={(e) => setFilterArea(e.target.value)}
                  className="px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">All Areas</option>
                  <option value="bawana">Bawana</option>
                  <option value="okhla">Okhla</option>
                  <option value="mayapuri">Mayapuri</option>
                  <option value="wazirpur">Wazirpur</option>
                </select>
                <select
                  value={filterAvailability}
                  onChange={(e) => setFilterAvailability(e.target.value as any)}
                  className="px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">All Status</option>
                  <option value="available">Available</option>
                  <option value="limited">Limited</option>
                  <option value="full">Full</option>
                </select>
              </div>
            </div>
          </div>

          {/* Warehouse Cards */}
          <div className="space-y-4">
            {filteredWarehouses.map((warehouse) => (
              <div key={warehouse.id} className="bg-card rounded-lg p-6 border border-border hover:shadow-lg transition-shadow">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold">{warehouse.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(warehouse.availability)}`}>
                        {getAvailabilityText(warehouse.availability)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{warehouse.address}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>{warehouse.distance} away</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{warehouse.rating}</span>
                        <span className="text-sm text-muted-foreground">({warehouse.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Available Space</p>
                    <p className="font-medium">{warehouse.size.available} {warehouse.size.unit}</p>
                    <p className="text-xs text-muted-foreground">of {warehouse.size.total} {warehouse.size.unit}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Daily Rate</p>
                    <p className="font-medium">₹{warehouse.pricing.daily}/{warehouse.size.unit}</p>
                    <p className="text-xs text-muted-foreground">₹{warehouse.pricing.monthly}/month</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Contact</p>
                    <div className="flex items-center space-x-2 text-xs">
                      <Phone className="w-3 h-3" />
                      <span>{warehouse.contact.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-2">Features</p>
                  <div className="flex flex-wrap gap-2">
                    {warehouse.features.map((feature, index) => (
                      <span key={index} className="inline-flex items-center space-x-1 px-2 py-1 bg-accent text-accent-foreground rounded-full text-xs">
                        {getFeatureIcon(feature)}
                        <span>{feature}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setSelectedWarehouse(warehouse)}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
                  >
                    <span>View Details</span>
                  </button>
                  <button 
                    disabled={warehouse.availability === 'full'}
                    onClick={() => {
                      setSelectedWarehouse(warehouse)
                      setShowBookingModal(true)
                    }}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {warehouse.availability === 'full' ? (
                      <>
                        <AlertCircle className="w-4 h-4" />
                        <span>Fully Booked</span>
                      </>
                    ) : (
                      <>
                        <Calendar className="w-4 h-4" />
                        <span>{t('warehouse.bookNow')}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredWarehouses.length === 0 && (
            <div className="text-center py-12">
              <Warehouse className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No warehouses found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria or contact us for custom requirements.</p>
            </div>
          )}
        </div>

        {/* Map and Quick Info */}
        <div className="space-y-6">
          {/* Map Placeholder */}
          <div className="bg-card rounded-lg p-6 border border-border">
            <h3 className="text-lg font-semibold mb-4">Warehouse Locations</h3>
            <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Interactive Map</p>
                <p className="text-sm text-muted-foreground">Warehouse locations with availability status</p>
              </div>
            </div>
          </div>

          {/* Quick Booking Calendar */}
          <div className="bg-card rounded-lg p-6 border border-border">
            <h3 className="text-lg font-semibold mb-4">Quick Booking</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Check-in Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Duration</label>
                <select className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Required Space (sq ft)</label>
                <input
                  type="number"
                  placeholder="Enter space needed"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                <Search className="w-4 h-4" />
                <span>Find Available</span>
              </button>
            </div>
          </div>

          {/* Popular Areas */}
          <div className="bg-card rounded-lg p-6 border border-border">
            <h3 className="text-lg font-semibold mb-4">Popular Areas</h3>
            <div className="space-y-3">
              {['Bawana Industrial Area', 'Okhla Industrial Area', 'Mayapuri', 'Wazirpur'].map((area, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-accent cursor-pointer transition-colors">
                  <span className="font-medium">{area}</span>
                  <span className="text-sm text-muted-foreground">{Math.floor(Math.random() * 10) + 3} available</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
