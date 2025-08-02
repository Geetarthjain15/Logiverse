"use client"

import AppLayout from '@/components/layout/AppLayout'
import { Calendar, Clock, Truck, AlertTriangle } from 'lucide-react'

export default function SchedulerPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Delivery Slot Scheduler</h1>
          <p className="text-muted-foreground">Schedule and manage delivery slots with traffic validation</p>
        </div>

        <div className="bg-card rounded-lg p-8 border border-border text-center">
          <Calendar className="w-16 h-16 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Delivery Scheduler</h3>
          <p className="text-muted-foreground mb-6">
            Drag-and-drop calendar interface for scheduling dispatches with Delhi traffic validation and congestion alerts.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="p-4 border border-border rounded-lg">
              <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <h4 className="font-medium">Time Slot Management</h4>
              <p className="text-sm text-muted-foreground">Optimize delivery windows</p>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <Truck className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <h4 className="font-medium">Vehicle Scheduling</h4>
              <p className="text-sm text-muted-foreground">Assign vehicles to routes</p>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <AlertTriangle className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <h4 className="font-medium">Traffic Alerts</h4>
              <p className="text-sm text-muted-foreground">Real-time congestion warnings</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
