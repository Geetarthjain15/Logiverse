"use client"

import AppLayout from '@/components/layout/AppLayout'
import { ShoppingCart, MessageCircle, Filter, Search } from 'lucide-react'

export default function MarketplacePage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Digital Marketplace</h1>
          <p className="text-muted-foreground">Post and find logistics needs with other MSMEs</p>
        </div>

        <div className="bg-card rounded-lg p-8 border border-border text-center">
          <ShoppingCart className="w-16 h-16 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Logistics Marketplace</h3>
          <p className="text-muted-foreground mb-6">
            Connect with other MSMEs to share logistics needs, find transport solutions, and offer storage space.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="p-4 border border-border rounded-lg">
              <Search className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <h4 className="font-medium">Find Services</h4>
              <p className="text-sm text-muted-foreground">Search for transport and storage</p>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <Filter className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <h4 className="font-medium">Smart Filtering</h4>
              <p className="text-sm text-muted-foreground">Filter by urgency, cost, location</p>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <MessageCircle className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <h4 className="font-medium">Direct Communication</h4>
              <p className="text-sm text-muted-foreground">Chat with service providers</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
