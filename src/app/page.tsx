"use client"

import AppLayout from '@/components/layout/AppLayout'
import Dashboard from '@/components/dashboard/Dashboard'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <AppLayout>
        <Dashboard />
      </AppLayout>
    </div>
  )
}
