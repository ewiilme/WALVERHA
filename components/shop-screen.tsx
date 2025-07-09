"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Coins, TrendingUp, Shield, Zap } from "lucide-react"
import { mockUser, mockShopItems } from "@/lib/mockData"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { NORMAL_DAILY_OFFLINE, NORMAL_MONTHLY_OFFLINE } from "@/lib/constants"

export function ShopScreen() {
  const [user] = useLocalStorage("walverha_user", mockUser)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)

  const getItemIcon = (type: string) => {
    switch (type) {
      case "offline":
        return <TrendingUp className="h-6 w-6" />
      case "extra_multiplier":
        return <Zap className="h-6 w-6" />
      case "ad_blocker":
        return <Shield className="h-6 w-6" />
      default:
        return <Coins className="h-6 w-6" />
    }
  }

  const getItemColor = (type: string) => {
    switch (type) {
      case "offline":
        return "from-green-500 to-green-600"
      case "extra_multiplier":
        return "from-yellow-500 to-yellow-600"
      case "ad_blocker":
        return "from-blue-500 to-blue-600"
      default:
        return "from-purple-500 to-purple-600"
    }
  }

  const calculateTotalEarning = (item: any) => {
    if (item.type === "offline") {
      return (NORMAL_DAILY_OFFLINE * item.multiplier * item.duration).toFixed(3)
    }
    return "0"
  }

  const handlePurchase = (itemId: string) => {
    setSelectedItem(itemId)
    setTimeout(() => {
      setSelectedItem(null)
      alert("Satın alma işlemi tamamlandı!")
    }, 2000)
  }

  return (
    <div className="p-4 pb-20 bg-gradient-to-br from-purple-50 to-purple-100 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-purple-600 p-2 rounded-full">
          <ShoppingBag className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-purple-900">Walverha Mağazası</h1>
      </div>

      {/* Balance */}
      <Card className="mb-6 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-90">Mevcut Bakiyeniz</p>
              <p className="text-2xl font-bold">{user.whaBalance.toFixed(6)} WHA</p>
              <p className="text-lg opacity-90">≈ ${user.usdBalance.toFixed(6)} USD</p>
            </div>
            <Coins className="h-8 w-8 opacity-75" />
          </div>
        </CardContent>
      </Card>

      {/* Normal Offline Info */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg text-purple-900">Normal Offline Kazancınız (Çarpan Olmadan)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Günlük</p>
              <p className="text-lg font-bold text-purple-900">${NORMAL_DAILY_OFFLINE}</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Aylık (30 Gün)</p>
              <p className="text-lg font-bold text-purple-900">${NORMAL_MONTHLY_OFFLINE}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shop Items */}
      <div className="space-y-4">
        {mockShopItems.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className={`bg-gradient-to-r ${getItemColor(item.type)} p-4 text-white`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getItemIcon(item.type)}
                    <div>
                      <h3 className="font-bold">{item.name}</h3>
                      <p className="text-sm opacity-90">{item.description}</p>
                    </div>
                  </div>
                  {item.profitPercentage && (
                    <Badge className="bg-white text-purple-600">%{item.profitPercentage} Kar</Badge>
                  )}
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-2xl font-bold text-purple-900">
                      ${item.price} {item.currency}
                    </p>
                    {item.type === "offline" && (
                      <div className="text-sm text-gray-600">
                        <p>Normal kazanç: ${(NORMAL_DAILY_OFFLINE * item.duration).toFixed(3)}</p>
                        <p className="font-semibold text-green-600">Toplam kazanç: ${calculateTotalEarning(item)}</p>
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Süre</p>
                    <p className="font-bold">{item.duration} gün</p>
                    {item.type === "offline" && <p className="text-sm text-purple-600">{item.multiplier}x Çarpan</p>}
                  </div>
                </div>
                <Button
                  onClick={() => handlePurchase(item.id)}
                  disabled={user.usdBalance < item.price || selectedItem === item.id}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  {selectedItem === item.id ? "Satın Alınıyor..." : "Satın Al"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Payment Methods */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg text-purple-900">Ödeme Yöntemleri</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            <Badge variant="outline" className="justify-center p-2">
              Kredi Kartı
            </Badge>
            <Badge variant="outline" className="justify-center p-2">
              PayPal
            </Badge>
            <Badge variant="outline" className="justify-center p-2">
              Kripto Para
            </Badge>
            <Badge variant="outline" className="justify-center p-2">
              WHA Coin
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
