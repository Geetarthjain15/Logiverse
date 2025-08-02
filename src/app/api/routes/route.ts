import { NextRequest, NextResponse } from 'next/server'

// Mock route calculation service
function calculateRoute(source: string, destination: string, vehicleType: string, weight: number) {
  // Mock calculation - in production, integrate with Google Maps API or similar
  const distances: { [key: string]: number } = {
    'bawana-okhla': 28.5,
    'okhla-bawana': 28.5,
    'mayapuri-gurgaon': 32.0,
    'gurgaon-mayapuri': 32.0,
    'wazirpur-faridabad': 45.0,
    'faridabad-wazirpur': 45.0,
    'narela-noida': 55.0,
    'noida-narela': 55.0,
  }

  const routeKey = `${source.toLowerCase().replace(/\s+/g, '-')}-${destination.toLowerCase().replace(/\s+/g, '-')}`
  const distance = distances[routeKey] || Math.random() * 50 + 10

  // Calculate duration based on distance and traffic
  const baseSpeed = 25 // km/h average in Delhi traffic
  const duration = (distance / baseSpeed) * 60 // minutes

  // Calculate costs
  const fuelRate = vehicleType === 'small' ? 8 : vehicleType === 'medium' ? 12 : 15 // per km
  const fuelCost = distance * fuelRate

  const tollCost = distance > 30 ? Math.floor(distance / 10) * 15 : 0

  // Traffic status
  const hour = new Date().getHours()
  let trafficStatus = 'low'
  if ((hour >= 8 && hour <= 10) || (hour >= 17 && hour <= 20)) {
    trafficStatus = 'high'
  } else if ((hour >= 11 && hour <= 16) || (hour >= 21 && hour <= 23)) {
    trafficStatus = 'medium'
  }

  return {
    distance: `${distance.toFixed(1)} km`,
    duration: `${Math.round(duration)} mins`,
    eta: new Date(Date.now() + duration * 60000).toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
    fuelCost: `₹${Math.round(fuelCost)}`,
    tollCost: `₹${tollCost}`,
    trafficStatus,
    congestionPoints: trafficStatus === 'high' ? ['Ring Road Junction', 'DND Flyover'] : 
                     trafficStatus === 'medium' ? ['Outer Ring Road'] : [],
    alternativeRoutes: Math.floor(Math.random() * 3) + 1,
    estimatedEmissions: `${(distance * 0.12).toFixed(1)} kg CO₂`,
    recommendedDepartureTime: new Date(Date.now() + (trafficStatus === 'high' ? 30 : 0) * 60000).toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { source, destination, deliveryDate, deliveryTime, vehicleType, weight, priority } = body

    // Validate required fields
    if (!source || !destination || !vehicleType) {
      return NextResponse.json(
        { success: false, error: 'Source, destination, and vehicle type are required' },
        { status: 400 }
      )
    }

    // Calculate route
    const routeData = calculateRoute(source, destination, vehicleType, weight || 0)

    // Add delivery-specific information
    const result = {
      ...routeData,
      source,
      destination,
      deliveryDate,
      deliveryTime,
      vehicleType,
      weight: weight || 0,
      priority: priority || 'normal',
      routeId: `RT${Date.now()}`,
      createdAt: new Date().toISOString(),
      optimizationSuggestions: [
        'Consider shared logistics for cost reduction',
        'Avoid peak hours (8-10 AM, 5-8 PM) for faster delivery',
        'Use smaller vehicles for better lane access in industrial areas'
      ]
    }

    return NextResponse.json({
      success: true,
      data: result,
      message: 'Route calculated successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to calculate route' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Mock popular routes data
    const popularRoutes = [
      {
        id: '1',
        from: 'Bawana Industrial Area',
        to: 'Okhla Industrial Area',
        frequency: '15 trips/week',
        avgCost: '₹850',
        avgDuration: '45 mins',
        popularity: 95
      },
      {
        id: '2',
        from: 'Mayapuri Industrial Area',
        to: 'Gurgaon Sector 18',
        frequency: '12 trips/week',
        avgCost: '₹1200',
        avgDuration: '55 mins',
        popularity: 87
      },
      {
        id: '3',
        from: 'Wazirpur Industrial Area',
        to: 'Faridabad Industrial Area',
        frequency: '10 trips/week',
        avgCost: '₹1500',
        avgDuration: '75 mins',
        popularity: 78
      },
      {
        id: '4',
        from: 'Narela Industrial Area',
        to: 'Noida Sector 63',
        frequency: '8 trips/week',
        avgCost: '₹1800',
        avgDuration: '90 mins',
        popularity: 65
      }
    ]

    const trafficAlerts = [
      {
        id: '1',
        location: 'NH-1 Delhi-Gurgaon',
        status: 'Heavy Traffic',
        severity: 'high',
        time: '2:00 PM - 4:00 PM',
        description: 'Construction work causing delays',
        estimatedDelay: '30-45 minutes'
      },
      {
        id: '2',
        location: 'Ring Road',
        status: 'Moderate Congestion',
        severity: 'medium',
        time: 'Ongoing',
        description: 'Regular traffic flow',
        estimatedDelay: '10-15 minutes'
      },
      {
        id: '3',
        location: 'Yamuna Expressway',
        status: 'Clear',
        severity: 'low',
        time: 'All Day',
        description: 'Smooth traffic conditions',
        estimatedDelay: '0 minutes'
      }
    ]

    return NextResponse.json({
      success: true,
      data: {
        popularRoutes,
        trafficAlerts,
        totalRoutes: popularRoutes.length,
        lastUpdated: new Date().toISOString()
      }
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch routes data' },
      { status: 500 }
    )
  }
}
