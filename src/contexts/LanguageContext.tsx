"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'en' | 'hi'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.inventory': 'Inventory',
    'nav.routes': 'Routes',
    'nav.pooling': 'Shared Logistics',
    'nav.warehousing': 'Warehousing',
    'nav.scheduler': 'Scheduler',
    'nav.marketplace': 'Marketplace',
    'nav.reports': 'Reports',
    'nav.settings': 'Settings',
    
    // Dashboard
    'dashboard.welcome': 'Welcome back',
    'dashboard.upcomingDeliveries': 'Upcoming Deliveries',
    'dashboard.lowStock': 'Low Stock Alerts',
    'dashboard.sharedRoutes': 'Shared Route Suggestions',
    'dashboard.warehouseBooking': 'Warehouse Booking Status',
    
    // Common
    'common.loading': 'Loading...',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.add': 'Add',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.export': 'Export',
    'common.viewAll': 'View All',
    
    // Inventory
    'inventory.title': 'Inventory Management',
    'inventory.addItem': 'Add Item',
    'inventory.autoReplenish': 'Auto-Replenish Rule',
    'inventory.alertSettings': 'Alert Settings',
    'inventory.sku': 'SKU',
    'inventory.quantity': 'Quantity',
    'inventory.threshold': 'Threshold',
    'inventory.status': 'Status',
    
    // Routes
    'routes.title': 'Route & Delivery Planner',
    'routes.source': 'Source',
    'routes.destination': 'Destination',
    'routes.deliveryTime': 'Delivery Time',
    'routes.vehicleSize': 'Vehicle Size',
    'routes.generateRoute': 'Generate Route',
    
    // Warehousing
    'warehouse.title': 'Micro-Warehousing Access',
    'warehouse.bookNow': 'Book Now',
    'warehouse.scheduleLater': 'Schedule for Later',
    'warehouse.address': 'Address',
    'warehouse.size': 'Size',
    'warehouse.rent': 'Rent',
    'warehouse.distance': 'Distance',
    
    // Reports
    'reports.title': 'Reports & Analytics',
    'reports.deliverySuccess': 'Delivery Success Rate',
    'reports.logisticsCost': 'Logistics Cost per Unit',
    'reports.inventoryTurnover': 'Inventory Turnover',
    'reports.sustainabilityTracker': 'Sustainability Tracker',
  },
  hi: {
    // Navigation
    'nav.dashboard': 'डैशबोर्ड',
    'nav.inventory': 'इन्वेंटरी',
    'nav.routes': 'रूट्स',
    'nav.pooling': 'साझा लॉजिस्टिक्स',
    'nav.warehousing': 'वेयरहाउसिंग',
    'nav.scheduler': 'शेड्यूलर',
    'nav.marketplace': 'मार्केटप्लेस',
    'nav.reports': 'रिपोर्ट्स',
    'nav.settings': 'सेटिंग्स',
    
    // Dashboard
    'dashboard.welcome': 'वापसी पर स्वागत है',
    'dashboard.upcomingDeliveries': 'आगामी डिलीवरी',
    'dashboard.lowStock': 'कम स्टॉक अलर्ट',
    'dashboard.sharedRoutes': 'साझा रूट सुझाव',
    'dashboard.warehouseBooking': 'वेयरहाउस बुकिंग स्थिति',
    
    // Common
    'common.loading': 'लोड हो रहा है...',
    'common.save': 'सेव करें',
    'common.cancel': 'रद्द करें',
    'common.edit': 'संपादित करें',
    'common.delete': 'हटाएं',
    'common.add': 'जोड़ें',
    'common.search': 'खोजें',
    'common.filter': 'फिल्टर',
    'common.export': 'निर्यात',
    'common.viewAll': 'सभी देखें',
    
    // Inventory
    'inventory.title': 'इन्वेंटरी प्रबंधन',
    'inventory.addItem': 'आइटम जोड़ें',
    'inventory.autoReplenish': 'ऑटो-रिप्लेनिश नियम',
    'inventory.alertSettings': 'अलर्ट सेटिंग्स',
    'inventory.sku': 'SKU',
    'inventory.quantity': 'मात्रा',
    'inventory.threshold': 'सीमा',
    'inventory.status': 'स्थिति',
    
    // Routes
    'routes.title': 'रूट और डिलीवरी प्लानर',
    'routes.source': 'स्रोत',
    'routes.destination': 'गंतव्य',
    'routes.deliveryTime': 'डिलीवरी समय',
    'routes.vehicleSize': 'वाहन का आकार',
    'routes.generateRoute': 'रूट जेनरेट करें',
    
    // Warehousing
    'warehouse.title': 'माइक्रो-वेयरहाउसिंग एक्सेस',
    'warehouse.bookNow': 'अभी बुक करें',
    'warehouse.scheduleLater': 'बाद के लिए शेड्यूल करें',
    'warehouse.address': 'पता',
    'warehouse.size': 'आकार',
    'warehouse.rent': 'किराया',
    'warehouse.distance': 'दूरी',
    
    // Reports
    'reports.title': 'रिपोर्ट्स और एनालिटिक्स',
    'reports.deliverySuccess': 'डिलीवरी सफलता दर',
    'reports.logisticsCost': 'प्रति यूनिट लॉजिस्टिक्स लागत',
    'reports.inventoryTurnover': 'इन्वेंटरी टर्नओवर',
    'reports.sustainabilityTracker': 'स्थिरता ट्रैकर',
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'hi')) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
