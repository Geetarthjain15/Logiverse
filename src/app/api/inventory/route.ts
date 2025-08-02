import { NextRequest, NextResponse } from 'next/server'

// Mock database - in production, use a real database
let inventoryItems = [
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
    lastUpdated: '2024-01-15',
    location: 'Warehouse A',
    supplier: 'Delhi Steel Co.'
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
    lastUpdated: '2024-01-14',
    location: 'Warehouse B',
    supplier: 'Ambuja Cement'
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
    lastUpdated: '2024-01-13',
    location: 'Warehouse A',
    supplier: 'Welding Pro'
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
    lastUpdated: '2024-01-15',
    location: 'Warehouse C',
    supplier: 'Plastic Industries'
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
    lastUpdated: '2024-01-12',
    location: 'Warehouse A',
    supplier: 'Aluminum Works'
  }
]

function getItemStatus(quantity: number, threshold: number): string {
  if (quantity === 0) return 'out'
  if (quantity <= threshold) return 'low'
  return 'ok'
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const status = searchParams.get('status')
    const category = searchParams.get('category')

    let filteredItems = [...inventoryItems]

    // Apply search filter
    if (search) {
      filteredItems = filteredItems.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.sku.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase())
      )
    }

    // Apply status filter
    if (status && status !== 'all') {
      filteredItems = filteredItems.filter(item => item.status === status)
    }

    // Apply category filter
    if (category && category !== 'all') {
      filteredItems = filteredItems.filter(item => item.category === category)
    }

    return NextResponse.json({
      success: true,
      data: filteredItems,
      total: filteredItems.length
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch inventory' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, sku, category, quantity, threshold, unit, price, location, supplier } = body

    // Validate required fields
    if (!name || !sku || !category || quantity === undefined || !threshold || !unit || !price) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if SKU already exists
    const existingItem = inventoryItems.find(item => item.sku === sku)
    if (existingItem) {
      return NextResponse.json(
        { success: false, error: 'SKU already exists' },
        { status: 400 }
      )
    }

    const newItem = {
      id: (inventoryItems.length + 1).toString(),
      sku,
      name,
      category,
      quantity: parseInt(quantity),
      threshold: parseInt(threshold),
      unit,
      price: parseFloat(price),
      status: getItemStatus(parseInt(quantity), parseInt(threshold)),
      lastUpdated: new Date().toISOString().split('T')[0],
      location: location || 'Warehouse A',
      supplier: supplier || 'Unknown'
    }

    inventoryItems.push(newItem)

    return NextResponse.json({
      success: true,
      data: newItem,
      message: 'Item added successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to add item' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, name, sku, category, quantity, threshold, unit, price, location, supplier } = body

    const itemIndex = inventoryItems.findIndex(item => item.id === id)
    if (itemIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Item not found' },
        { status: 404 }
      )
    }

    // Update item
    inventoryItems[itemIndex] = {
      ...inventoryItems[itemIndex],
      name: name || inventoryItems[itemIndex].name,
      sku: sku || inventoryItems[itemIndex].sku,
      category: category || inventoryItems[itemIndex].category,
      quantity: quantity !== undefined ? parseInt(quantity) : inventoryItems[itemIndex].quantity,
      threshold: threshold !== undefined ? parseInt(threshold) : inventoryItems[itemIndex].threshold,
      unit: unit || inventoryItems[itemIndex].unit,
      price: price !== undefined ? parseFloat(price) : inventoryItems[itemIndex].price,
      location: location || inventoryItems[itemIndex].location,
      supplier: supplier || inventoryItems[itemIndex].supplier,
      status: getItemStatus(
        quantity !== undefined ? parseInt(quantity) : inventoryItems[itemIndex].quantity,
        threshold !== undefined ? parseInt(threshold) : inventoryItems[itemIndex].threshold
      ),
      lastUpdated: new Date().toISOString().split('T')[0]
    }

    return NextResponse.json({
      success: true,
      data: inventoryItems[itemIndex],
      message: 'Item updated successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update item' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Item ID is required' },
        { status: 400 }
      )
    }

    const itemIndex = inventoryItems.findIndex(item => item.id === id)
    if (itemIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Item not found' },
        { status: 404 }
      )
    }

    inventoryItems.splice(itemIndex, 1)

    return NextResponse.json({
      success: true,
      message: 'Item deleted successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete item' },
      { status: 500 }
    )
  }
}
