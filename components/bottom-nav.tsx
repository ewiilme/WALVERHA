"use client"

import { Home, Wallet, Users, ShoppingBag, Newspaper, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

interface BottomNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: "home", label: "Ana Sayfa", icon: Home },
    { id: "wallet", label: "Cüzdan", icon: Wallet },
    { id: "invite", label: "Davet", icon: Users },
    { id: "shop", label: "Mağaza", icon: ShoppingBag },
    { id: "news", label: "Haberler", icon: Newspaper },
    { id: "settings", label: "Ayarlar", icon: Settings },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-purple-200 px-2 py-2 z-50">
      <div className="flex justify-around items-center w-full">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-3 rounded-lg transition-colors flex-1 max-w-[80px]",
                activeTab === tab.id ? "bg-purple-100 text-purple-700" : "text-gray-500 hover:text-purple-600",
              )}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs font-medium text-center">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
