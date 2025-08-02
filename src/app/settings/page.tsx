"use client"

import AppLayout from '@/components/layout/AppLayout'
import { Settings, User, Bell, Shield, Globe } from 'lucide-react'

export default function SettingsPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your account and application preferences</p>
        </div>

        <div className="bg-card rounded-lg p-8 border border-border text-center">
          <Settings className="w-16 h-16 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Application Settings</h3>
          <p className="text-muted-foreground mb-6">
            Configure your LogiVerse experience, notifications, and account preferences.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            <div className="p-4 border border-border rounded-lg">
              <User className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <h4 className="font-medium">Profile</h4>
              <p className="text-sm text-muted-foreground">Company details and preferences</p>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <Bell className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <h4 className="font-medium">Notifications</h4>
              <p className="text-sm text-muted-foreground">Alert preferences</p>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <Shield className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <h4 className="font-medium">Security</h4>
              <p className="text-sm text-muted-foreground">Password and privacy</p>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <Globe className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <h4 className="font-medium">Language</h4>
              <p className="text-sm text-muted-foreground">English / हिंदी</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
