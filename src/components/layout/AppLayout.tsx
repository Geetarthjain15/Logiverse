"use client"

import React, { useState } from 'react'
import { useTheme } from 'next-themes'
import { useLanguage } from '@/contexts/LanguageContext'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Package,
  Route,
  Users,
  Warehouse,
  Calendar,
  ShoppingCart,
  BarChart3,
  Settings,
  Menu,
  X,
  Sun,
  Moon,
  Globe,
  Bell,
  User
} from 'lucide-react'

interface AppLayoutProps {
  children: React.ReactNode
}

const navigationItems = [
  { key: 'dashboard', icon: LayoutDashboard, href: '/' },
  { key: 'inventory', icon: Package, href: '/inventory' },
  { key: 'routes', icon: Route, href: '/routes' },
  { key: 'pooling', icon: Users, href: '/pooling' },
  { key: 'warehousing', icon: Warehouse, href: '/warehousing' },
  { key: 'scheduler', icon: Calendar, href: '/scheduler' },
  { key: 'marketplace', icon: ShoppingCart, href: '/marketplace' },
  { key: 'reports', icon: BarChart3, href: '/reports' },
  { key: 'settings', icon: Settings, href: '/settings' },
]

export default function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')
  const toggleLanguage = () => setLanguage(language === 'en' ? 'hi' : 'en')

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-border">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">LogiVerse</span>
          </div>
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-md hover:bg-accent"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            return (
              <a
                key={item.key}
                href={item.href}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                <Icon className="w-5 h-5" />
                <span>{t(`nav.${item.key}`)}</span>
              </a>
            )
          })}
        </nav>
      </aside>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-md hover:bg-accent"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold text-foreground">
              {t('nav.dashboard')}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            {/* Language toggle */}
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-md hover:bg-accent transition-colors"
              title="Toggle Language"
            >
              <Globe className="w-5 h-5" />
              <span className="ml-1 text-sm">{language.toUpperCase()}</span>
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-accent transition-colors"
              title="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Notifications */}
            <button className="p-2 rounded-md hover:bg-accent transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full"></span>
            </button>

            {/* User menu */}
            <button className="p-2 rounded-md hover:bg-accent transition-colors">
              <User className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
