import { NextRequest, NextResponse } from 'next/server'

// Mock shared routes database
let sharedRoutes = [
  {
    id: '1',
    organizer: 'Kumar Industries',
    organizerRating: 4.8,
    organizerContact: '+91 98765 43210',
    route: {
      from: 'Bawana Industrial Area',
      to: 'Okhla Industrial Area',
      distance: '28 km',
      duration: '45 mins'
    },
    schedule: {
      date: '2024-01-20',
      time: '10:00 AM',
      frequency: 'Weekly',
      recurringDays: ['Monday', 'Wednesday', 'Friday']
    },
    vehicle: {
      type: 'Medium Truck',
      capacity: '3 tons',
      available: '1.2 tons',
      licensePlate: 'DL-01-AB-1234'
    },
    cost: {
      perKg: 8,
      perKm: 12,
      total: '₹960',
      currency: 'INR'
    },
    participants: 3,
    maxParticipants: 5,
    status: 'open',
    tags: ['Regular', 'Reliable', 'Cost-effective'],
    requirements: ['Industrial goods only', 'Proper packaging required'],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    organizer: 'Sharma Steel Works',
    organizerRating: 4.6,
    organizerContact: '+91 98765 43211',
    route: {
      from: 'Mayapuri Industrial Area',
      to: 'Gurgaon Sector 18',
      distance: '32 km',
      duration: '55 mins'
    },
    schedule: {
      date: '2024-01-21',
      time: '2:00 PM',
      frequency: 'Bi-weekly',
      recurringDays: ['Tuesday', 'Thursday']
    },
    vehicle: {
      type: 'Large Truck',
      capacity: '5 tons',
      available: '2.8 tons',
      licensePlate: 'DL-02-CD-5678'
    },
    cost: {
      perKg: 6,
      perKm: 10,
      total: '₹1920',
      currency: 'INR'
    },
    participants: 2,
    maxParticipants: 4,
    status: 'filling',
    tags: ['Express', 'Heavy Load'],
    requirements: ['Steel products preferred', 'Minimum 500kg load'],
    createdAt: '2024-01-14T14:00:00Z',
    updatedAt: '2024-01-14T14:00:00Z'
  },
  {
    id: '3',
    organizer: 'Delhi Logistics Co.',
    organizerRating: 4.9,
    organizerContact: '+91 98765 43212',
    route: {
      from: 'Wazirpur',
      to: 'Faridabad Industrial Area',
      distance: '45 km',
      duration: '1 hr 15 mins'
    },
    schedule: {
      date: '2024-01-22',
      time: '8:00 AM',
      frequency: 'Daily',
      recurringDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    },
    vehicle: {
      type: 'Small Truck',
      capacity: '1.5 tons',
      available: '0.3 tons',
      licensePlate: 'DL-03-EF-9012'
    },
    cost: {
      perKg: 10,
      perKm: 15,
      total: '₹675',
      currency: 'INR'
    },
    participants: 4,
    maxParticipants: 4,
    status: 'full',
    tags: ['Daily', 'Small Load', 'Premium'],
    requirements: ['Small packages only', 'Same day delivery'],
    createdAt: '2024-01-13T08:00:00Z',
    updatedAt: '2024-01-13T08:00:00Z'
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const status = searchParams.get('status')
    const from = searchParams.get('from')
    const to = searchParams.get('to')

    let filteredRoutes = [...sharedRoutes]

    // Apply search filter
    if (search) {
      filteredRoutes = filteredRoutes.filter(route =>
        route.route.from.toLowerCase().includes(search.toLowerCase()) ||
        route.route.to.toLowerCase().includes(search.toLowerCase()) ||
        route.organizer.toLowerCase().includes(search.toLowerCase())
      )
    }

    // Apply status filter
    if (status && status !== 'all') {
      filteredRoutes = filteredRoutes.filter(route => route.status === status)
    }

    // Apply route filters
    if (from) {
      filteredRoutes = filteredRoutes.filter(route =>
        route.route.from.toLowerCase().includes(from.toLowerCase())
      )
    }

    if (to) {
      filteredRoutes = filteredRoutes.filter(route =>
        route.route.to.toLowerCase().includes(to.toLowerCase())
      )
    }

    // Calculate statistics
    const stats = {
      totalRoutes: sharedRoutes.length,
      openRoutes: sharedRoutes.filter(r => r.status === 'open').length,
      fillingRoutes: sharedRoutes.filter(r => r.status === 'filling').length,
      fullRoutes: sharedRoutes.filter(r => r.status === 'full').length,
      totalParticipants: sharedRoutes.reduce((sum, r) => sum + r.participants, 0),
      avgCostSavings: '₹45,000',
      partnerMSMEs: 156,
      successRate: 96
    }

    return NextResponse.json({
      success: true,
      data: filteredRoutes,
      stats,
      total: filteredRoutes.length
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch shared routes' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      organizer,
      route,
      schedule,
      vehicle,
      cost,
      maxParticipants,
      tags,
      requirements
    } = body

    // Validate required fields
    if (!organizer || !route?.from || !route?.to || !schedule?.date || !vehicle?.type) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const newRoute = {
      id: (sharedRoutes.length + 1).toString(),
      organizer,
      organizerRating: 4.5, // Default rating for new organizers
      organizerContact: '+91 98765 43213', // Mock contact
      route: {
        from: route.from,
        to: route.to,
        distance: route.distance || 'Calculating...',
        duration: route.duration || 'Calculating...'
      },
      schedule: {
        date: schedule.date,
        time: schedule.time,
        frequency: schedule.frequency || 'One-time',
        recurringDays: schedule.recurringDays || []
      },
      vehicle: {
        type: vehicle.type,
        capacity: vehicle.capacity,
        available: vehicle.available || vehicle.capacity,
        licensePlate: vehicle.licensePlate || 'DL-XX-XX-XXXX'
      },
      cost: {
        perKg: cost?.perKg || 8,
        perKm: cost?.perKm || 12,
        total: cost?.total || '₹0',
        currency: 'INR'
      },
      participants: 1, // Organizer is the first participant
      maxParticipants: maxParticipants || 5,
      status: 'open',
      tags: tags || ['New Route'],
      requirements: requirements || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    sharedRoutes.push(newRoute)

    return NextResponse.json({
      success: true,
      data: newRoute,
      message: 'Shared route created successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create shared route' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, action, participantData } = body

    const routeIndex = sharedRoutes.findIndex(route => route.id === id)
    if (routeIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Route not found' },
        { status: 404 }
      )
    }

    const route = sharedRoutes[routeIndex]

    if (action === 'join') {
      if (route.participants >= route.maxParticipants) {
        return NextResponse.json(
          { success: false, error: 'Route is full' },
          { status: 400 }
        )
      }

      route.participants += 1
      if (route.participants >= route.maxParticipants) {
        route.status = 'full'
      } else if (route.participants > route.maxParticipants * 0.7) {
        route.status = 'filling'
      }

      route.updatedAt = new Date().toISOString()

      return NextResponse.json({
        success: true,
        data: route,
        message: 'Successfully joined the route'
      })
    }

    if (action === 'leave') {
      if (route.participants <= 1) {
        return NextResponse.json(
          { success: false, error: 'Cannot leave - you are the organizer' },
          { status: 400 }
        )
      }

      route.participants -= 1
      route.status = 'open'
      route.updatedAt = new Date().toISOString()

      return NextResponse.json({
        success: true,
        data: route,
        message: 'Successfully left the route'
      })
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update route' },
      { status: 500 }
    )
  }
}
