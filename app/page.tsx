"use client"

import { useState } from "react"
import { AuthScreen } from "@/components/auth-screen"
import { HomeScreen } from "@/components/home-screen"
import { WalletScreen } from "@/components/wallet-screen"
import { InviteScreen } from "@/components/invite-screen"
import { ShopScreen } from "@/components/shop-screen"
import { NewsScreen } from "@/components/news-screen"
import { SettingsScreen } from "@/components/settings-screen"
import { BottomNav } from "@/components/bottom-nav"
import { useLocalStorage } from "@/hooks/useLocalStorage"

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage("walverha_logged_in", false)
  const [activeTab, setActiveTab] = useState("home")

  if (!isLoggedIn) {
    return <AuthScreen onLogin={() => setIsLoggedIn(true)} />
  }

  const renderScreen = () => {
    switch (activeTab) {
      case "home":
        return <HomeScreen />
      case "wallet":
        return <WalletScreen />
      case "invite":
        return <InviteScreen />
      case "shop":
        return <ShopScreen />
      case "news":
        return <NewsScreen />
      case "settings":
        return <SettingsScreen />
      default:
        return <HomeScreen />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {renderScreen()}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
