"use client"

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import AppLayout from '@/components/layout/AppLayout'
import Dashboard from '@/components/dashboard/Dashboard'
import LoadingScreen from '@/components/ui/LoadingScreen'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return // Still loading

    if (!session) {
      router.push('/auth/signin')
      return
    }
  }, [session, status, router])

  if (status === 'loading') {
    return <LoadingScreen />
  }

  if (!session) {
    return <LoadingScreen />
  }

  return (
    <AppLayout>
      <Dashboard />
    </AppLayout>
  )
}
