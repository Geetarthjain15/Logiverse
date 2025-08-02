"use client"

import React, { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Truck, 
  AlertTriangle,
  CheckCircle,
  Route,
  Zap,
  Users,
  Fuel,
  Calendar,
  Share2
} from 'lucide-react'

interface RouteForm {
  source: string
  destination: string
  deliveryDate: string
  deliveryTime: string
  vehicleType: string
  weight: string
  priority: string
}

interface RouteResult {
  distance: string
  duration: string
  eta: string
  fuelCost: string
  tollCost: string
  trafficStatus: 'low' | 'medium' | 'high'
  congestionPoints: string[]
  alternativeRoutes: number
}

export default function RoutePlanner() {
  const { t } = useLanguage()
  const [routeForm, setRouteForm] = useState<RouteForm>({
    source: '',
    destination: '',
    deliveryDate: '',
    deliveryTime: '',
    vehicleType: 'small',
    weight: '',
    priority: 'normal'
  })
  const [routeResult, setRouteResult] = useState<RouteResult | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleInputChange = (field: keyof RouteForm, value: string) => {
    setRouteForm(prev => ({ ...prev, [field]: value }))
  }

  const generateRoute = async () => {
    setIsGenerating(true)
    // Simulate API call
    setTimeout(() => {
      setRouteResult({
        distance: '24.5 km',
        duration: '45 mins',
        eta: '2:30 PM',
        fuelCost: '₹180',
        tollCost: '₹45',
        trafficStatus: 'medium',
        congestionPoints: ['Ring Road Junction', 'Okhla Flyover'],
        alternativeRoutes: 3
      })
      setIsGenerating(false)
    }, 2000)
  }

  const popularRoutes = [
    { from: 'Bawana Industrial Area', to: 'Okhla Industrial Area', frequency: '15 trips/week' },
    { from: 'Mayapuri', to: 'Gurgaon Sector 18', frequency: '12 trips/week' },
    { from: 'Wazirpur', to: 'Faridabad Industrial Area', frequency: '10 trips/week' },
    { from: 'Narela', to: 'Noida Sector 63', frequency: '8 trips/week' }
  ]

  const trafficAlerts = [
    { location: 'NH-1 Delhi-Gurgaon', status: 'Heavy Traffic', time: '2:00 PM - 4:00 PM' },
    { location: 'Ring Road', status: 'Moderate Congestion', time: 'Ongoing' },
    { location: 'Yamuna Expressway', status: 'Clear', time: 'All Day' }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t('routes.title')}</h1>
          <p className="text-muted-foreground">AI-optimized route planning with real-time traffic data</p>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <button className="flex items-center space-x-2 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors">
            <Share2 className="w-4 h-4" />
            <span>Share Route</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors">
            <Calendar className="w-4 h-4" />
            <span>Schedule</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Route Planning Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-lg p-6 border border-border">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Route className="w-5 h-5 mr-2 text-primary" />
              Route Planning
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t('routes.source')}
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <input
                    type="text"
                    value={routeForm.source}
                    onChange={(e) => handleInputChange('source', e.target.value)}
                    placeholder="Enter pickup location"
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t('routes.destination')}
                </label>
                <div className="relative">
                  <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <input
                    type="text"
                    value={routeForm.destination}
                    onChange={(e) => handleInputChange('destination', e.target.value)}
                    placeholder="Enter delivery location"
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Delivery Date
                </label>
                <input
                  type="date"
                  value={routeForm.deliveryDate}
                  onChange={(e) => handleInputChange('deliveryDate', e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t('routes.deliveryTime')}
                </label>
                <input
                  type="time"
                  value={routeForm.deliveryTime}
                  onChange={(e) => handleInputChange('deliveryTime', e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t('routes.vehicleSize')}
                </label>
                <select
                  value={routeForm.vehicleType}
                  onChange={(e) => handleInputChange('vehicleType', e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="small">Small Vehicle (&lt; 1 ton)</option>
                  <option value="medium">Medium Vehicle (1-3 tons)</option>
                  <option value="large">Large Vehicle (3-7 tons)</option>
                  <option value="truck">Heavy Truck (&gt; 7 tons)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Load Weight (kg)
                </label>
                <input
                  type="number"
                  value={routeForm.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  placeholder="Enter load weight"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={generateRoute}
                disabled={isGenerating || !routeForm.source || !routeForm.destination}
                className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Generating Route...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    <span>{t('routes.generateRoute')}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Route Results */}
          {routeResult && (
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                Optimized Route Generated
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{routeResult.distance}</div>
                  <div className="text-sm text-muted-foreground">Distance</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{routeResult.duration}</div>
                  <div className="text-sm text-muted-foreground">Duration</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{routeResult.eta}</div>
                  <div className="text-sm text-muted-foreground">ETA</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{routeResult.fuelCost}</div>
                  <div className="text-sm text-muted-foreground">Fuel Cost</div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-muted rounded-lg h-64 flex items-center justify-center mb-4">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Interactive Map View</p>
                  <p className="text-sm text-muted-foreground">Route visualization with traffic data</p>
                </div>
              </div>

              {/* Traffic Status */}
              <div className="flex items-center justify-between p-4 bg-accent rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${
                    routeResult.trafficStatus === 'low' ? 'bg-green-500' :
                    routeResult.trafficStatus === 'medium' ? 'bg-orange-500' : 'bg-red-500'
                  }`}></div>
                  <span className="font-medium">Traffic Status: {routeResult.trafficStatus.toUpperCase()}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {routeResult.alternativeRoutes} alternative routes available
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Traffic Alerts */}
          <div className="bg-card rounded-lg p-6 border border-border">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" />
              Traffic Alerts
            </h3>
            <div className="space-y-3">
              {trafficAlerts.map((alert, index) => (
                <div key={index} className="p-3 border border-border rounded-lg">
                  <div className="font-medium text-sm">{alert.location}</div>
                  <div className={`text-xs ${
                    alert.status === 'Clear' ? 'text-green-500' :
                    alert.status === 'Moderate Congestion' ? 'text-orange-500' : 'text-red-500'
                  }`}>
                    {alert.status}
                  </div>
                  <div className="text-xs text-muted-foreground">{alert.time}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Routes */}
          <div className="bg-card rounded-lg p-6 border border-border">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2 text-blue-500" />
              Popular Routes
            </h3>
            <div className="space-y-3">
              {popularRoutes.map((route, index) => (
                <div key={index} className="p-3 border border-border rounded-lg hover:bg-accent cursor-pointer transition-colors">
                  <div className="font-medium text-sm">{route.from}</div>
                  <div className="text-xs text-muted-foreground">to {route.to}</div>
                  <div className="text-xs text-primary mt-1">{route.frequency}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-card rounded-lg p-6 border border-border">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center space-x-2 p-3 border border-border rounded-lg hover:bg-accent transition-colors text-left">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-sm">Find Shared Routes</span>
              </button>
              <button className="w-full flex items-center space-x-2 p-3 border border-border rounded-lg hover:bg-accent transition-colors text-left">
                <Fuel className="w-4 h-4 text-primary" />
                <span className="text-sm">Fuel Calculator</span>
              </button>
              <button className="w-full flex items-center space-x-2 p-3 border border-border rounded-lg hover:bg-accent transition-colors text-left">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm">Delivery Scheduler</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
