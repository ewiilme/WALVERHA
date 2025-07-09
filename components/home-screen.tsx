"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Gift, Clock, Star, HelpCircle, Globe, Sun, Moon } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { mockUser } from "@/lib/mockData"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import Image from "next/image"
import {
  BASE_CLICK_EARNING,
  AUTO_AD_CLICK_INTERVAL,
  MULTIPLIER_DURATION,
  OFFLINE_AD_DURATION,
  MAX_INSTANT_ADS_PER_DAY,
  MAX_OFFLINE_ADS_PER_DAY,
  MULTIPLIER_LEVELS,
  NORMAL_DAILY_OFFLINE,
  WHA_TO_USD_RATE,
} from "@/lib/constants"

export function HomeScreen() {
  const [user, setUser] = useLocalStorage("walverha_user", mockUser)
  const [clickCount, setClickCount] = useState(0)
  const [multiplierLevel, setMultiplierLevel] = useLocalStorage("multiplier_level", 0)
  const [multiplierEndTime, setMultiplierEndTime] = useLocalStorage("multiplier_end_time", 0)
  const [instantAdsToday, setInstantAdsToday] = useLocalStorage("instant_ads_today", 0)
  const [offlineAdsToday, setOfflineAdsToday] = useLocalStorage("offline_ads_today", 0)
  const [offlineEndTime, setOfflineEndTime] = useLocalStorage("offline_end_time", 0)
  const [showAdModal, setShowAdModal] = useState(false)
  const [adType, setAdType] = useState<"auto" | "multiplier" | "instant" | "offline">("auto")
  const [language, setLanguage] = useLocalStorage("walverha_language", "tr")
  const [darkMode, setDarkMode] = useLocalStorage("walverha_theme", false)
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [infoType, setInfoType] = useState("")
  const [offlineStacks, setOfflineStacks] = useLocalStorage("offline_stacks", 0) // 0-4 arası

  const isMultiplierActive = multiplierEndTime > Date.now()
  const isOfflineActive = offlineEndTime > Date.now()

  const getCurrentMultiplier = () => {
    if (!isMultiplierActive) return 1
    if (multiplierLevel < MULTIPLIER_LEVELS.length) {
      return MULTIPLIER_LEVELS[multiplierLevel].multiplier
    }
    // After level 6, multiply by 1.2 each time
    const extraLevels = multiplierLevel - MULTIPLIER_LEVELS.length + 1
    return Math.floor(25 * Math.pow(1.2, extraLevels))
  }

  const currentMultiplier = getCurrentMultiplier()

  useEffect(() => {
    const interval = setInterval(() => {
      if (multiplierEndTime > 0 && Date.now() >= multiplierEndTime) {
        setMultiplierLevel(0)
        setMultiplierEndTime(0)
      }
      if (offlineEndTime > 0 && Date.now() >= offlineEndTime) {
        setOfflineEndTime(0)
        // Eğer stack varsa, bir sonrakini başlat
        if (offlineStacks > 0) {
          setOfflineStacks((prev) => prev - 1)
          if (offlineStacks > 1) {
            setOfflineEndTime(Date.now() + OFFLINE_AD_DURATION)
          }
        }
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [multiplierEndTime, offlineEndTime, offlineStacks])

  const handleClick = () => {
    const newClickCount = clickCount + 1
    setClickCount(newClickCount)

    const earnAmount = BASE_CLICK_EARNING * currentMultiplier
    const whaAmount = earnAmount / WHA_TO_USD_RATE // Artık doğru oran

    setUser((prev) => ({
      ...prev,
      whaBalance: prev.whaBalance + whaAmount,
      usdBalance: prev.usdBalance + earnAmount,
      totalClicks: prev.totalClicks + 1,
    }))

    // Auto ad every 1300 clicks
    if (newClickCount % AUTO_AD_CLICK_INTERVAL === 0) {
      setAdType("auto")
      setShowAdModal(true)
    }
  }

  const watchMultiplierAd = () => {
    setAdType("multiplier")
    setShowAdModal(true)
  }

  const watchInstantAd = () => {
    if (instantAdsToday >= MAX_INSTANT_ADS_PER_DAY) return
    setAdType("instant")
    setShowAdModal(true)
  }

  const watchOfflineAd = () => {
    if (offlineAdsToday >= MAX_OFFLINE_ADS_PER_DAY || offlineStacks >= 4) return
    setAdType("offline")
    setShowAdModal(true)
  }

  const handleAdWatched = () => {
    setShowAdModal(false)

    switch (adType) {
      case "auto":
        const autoBonus = 5 * currentMultiplier
        const autoWhaBonus = autoBonus / WHA_TO_USD_RATE
        setUser((prev) => ({
          ...prev,
          whaBalance: prev.whaBalance + autoWhaBonus,
          usdBalance: prev.usdBalance + autoBonus,
        }))
        break

      case "multiplier":
        const newLevel = multiplierLevel + 1
        setMultiplierLevel(newLevel)
        // Sadece ilk reklam izlendiğinde süreyi başlat
        if (multiplierLevel === 0) {
          setMultiplierEndTime(Date.now() + MULTIPLIER_DURATION)
        }
        break

      case "instant":
        const instantBonus = NORMAL_DAILY_OFFLINE * 0.35 * currentMultiplier
        const instantWHA = instantBonus / WHA_TO_USD_RATE
        setUser((prev) => ({
          ...prev,
          whaBalance: prev.whaBalance + instantWHA,
          usdBalance: prev.usdBalance + instantBonus,
        }))
        setInstantAdsToday((prev) => prev + 1)
        break

      case "offline":
        if (offlineStacks < 4) {
          setOfflineStacks((prev) => prev + 1)
          setOfflineAdsToday((prev) => prev + 1)

          // Eğer offline aktif değilse, ilk stack'i hemen başlat
          if (!isOfflineActive) {
            setOfflineEndTime(Date.now() + OFFLINE_AD_DURATION)
          }
        }
        break
    }
  }

  const getMultiplierTimeRemaining = () => {
    if (!isMultiplierActive) return "Pasif"
    const remaining = multiplierEndTime - Date.now()
    const minutes = Math.floor(remaining / (1000 * 60))
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const getOfflineTimeRemaining = () => {
    if (!isOfflineActive) return "Pasif"
    const remaining = offlineEndTime - Date.now()
    const hours = Math.floor(remaining / (1000 * 60 * 60))
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60))
    return `${hours}s ${minutes}d`
  }

  const showInfo = (type: string) => {
    setInfoType(type)
    setShowInfoModal(true)
  }

  const getInfoContent = () => {
    switch (infoType) {
      case "multiplier":
        return "Reklam izleyerek tıklama kazancınızı artırabilirsiniz. Her reklam 10 dakika süreyle çarpanınızı yükseltir. 6. reklamdan sonra çarpan %20 oranında artar."
      case "instant":
        return "Her reklam izleyişinizde, 24 saatlik çevrimdışı kazancınızın %35'ini anında alırsınız. Günlük 10 reklam sınırı vardır. Aktif çarpanlarınız bu kazanca dahildir."
      case "offline":
        return "Her reklam 6 saat boyunca çevrimdışı kazanç sağlar. Günde maksimum 4 reklam izleyebilirsiniz. Çevrimdışı kazanç, normal tıklama kazancının %35'i kadardır."
      default:
        return ""
    }
  }

  return (
    <div
      className={`p-4 pb-20 min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-purple-50 to-purple-100"}`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10">
            <Image
              src="/images/walverha-logo.png"
              alt="Walverha Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-purple-900">Walverha Network</h1>
            <p className="text-purple-600">Walverha Coin Kazanın</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-purple-600" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-white border border-purple-200 rounded px-2 py-1 text-sm"
            >
              <option value="tr">Türkçe</option>
              <option value="en">English</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4 text-purple-600" />
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            <Moon className="h-4 w-4 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Main Click Area */}
      <div className="flex justify-center mb-6">
        <div className="text-center">
          <div
            onClick={handleClick}
            className="w-48 h-48 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white shadow-2xl transform transition-all active:scale-95 cursor-pointer flex items-center justify-center mb-4 animate-pulse relative overflow-hidden"
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <Image
                src="/images/walverha-logo.png"
                alt="Walverha Logo"
                width={120}
                height={120}
                className="rounded-full"
              />
            </div>
            <div className="text-center relative z-10">
              <div className="relative w-16 h-16 mx-auto mb-2">
                <Image
                  src="/images/walverha-logo.png"
                  alt="Walverha Logo"
                  width={64}
                  height={64}
                  className="rounded-full"
                />
              </div>
              <p className="text-lg font-bold">TIKLA</p>
              <p className="text-sm opacity-90">+{(BASE_CLICK_EARNING * currentMultiplier).toFixed(6)} USD</p>
              <p className="text-xs opacity-75">Aktif Çarpan: {currentMultiplier}x</p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-purple-900 mb-2">{user.whaBalance.toFixed(6)} WHA</p>
            <p className="text-lg text-green-600">≈ ${user.usdBalance.toFixed(6)} USD</p>
            <p className="text-xs text-gray-500">1 WHA = ${WHA_TO_USD_RATE}</p>
          </div>
        </div>
      </div>

      {/* Multiplier Ad Section */}
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-purple-900">Reklam İzle ve Çarpan Kazan</h3>
              <Button variant="ghost" size="sm" onClick={() => showInfo("multiplier")}>
                <HelpCircle className="h-4 w-4" />
              </Button>
            </div>
            <Badge variant="secondary">{getMultiplierTimeRemaining()}</Badge>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {MULTIPLIER_LEVELS.map((level, index) => (
              <Badge
                key={level.level}
                variant={multiplierLevel > index ? "default" : "outline"}
                className="justify-center p-2"
              >
                {level.multiplier}x
              </Badge>
            ))}
          </div>
          <Button onClick={watchMultiplierAd} className="w-full bg-yellow-500 hover:bg-yellow-600">
            <Zap className="h-4 w-4 mr-2" />
            Çarpan Kazan ({currentMultiplier}x →{" "}
            {getCurrentMultiplier() === 1 ? "2x" : `${Math.floor(currentMultiplier * 1.2)}x`})
          </Button>
        </CardContent>
      </Card>

      {/* Offline Earning Ad Section */}
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-purple-900">Çevrimdışı Kazanç Reklamları</h3>
              <Button variant="ghost" size="sm" onClick={() => showInfo("offline")}>
                <HelpCircle className="h-4 w-4" />
              </Button>
            </div>
            <Badge variant="secondary">
              {offlineAdsToday}/{MAX_OFFLINE_ADS_PER_DAY}
            </Badge>
          </div>
          <div className="mb-3">
            <p className="text-sm text-gray-600">Offline Stok: {offlineStacks}/4</p>
            <p className="text-sm text-gray-600">Kalan Çevrimdışı Süre: {getOfflineTimeRemaining()}</p>
          </div>
          <Button
            onClick={watchOfflineAd}
            disabled={offlineAdsToday >= MAX_OFFLINE_ADS_PER_DAY || offlineStacks >= 4}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300"
          >
            <Clock className="h-4 w-4 mr-2" />6 Saat Offline Kazanç {offlineStacks >= 4 ? "(Stok Dolu)" : ""}
          </Button>
        </CardContent>
      </Card>

      {/* Instant Earning Ad Section */}
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-purple-900">Anında Coin Kazan</h3>
              <Button variant="ghost" size="sm" onClick={() => showInfo("instant")}>
                <HelpCircle className="h-4 w-4" />
              </Button>
            </div>
            <Badge variant="secondary">
              {instantAdsToday}/{MAX_INSTANT_ADS_PER_DAY}
            </Badge>
          </div>
          <Button
            onClick={watchInstantAd}
            disabled={instantAdsToday >= MAX_INSTANT_ADS_PER_DAY}
            className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300"
          >
            <Star className="h-4 w-4 mr-2" />
            Anında Kazanç (Günlük %35)
          </Button>
        </CardContent>
      </Card>

      {/* Ad Modal */}
      {showAdModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="m-4 w-full max-w-md">
            <CardContent className="p-6 text-center">
              {adType === "auto" && (
                <>
                  <Gift className="h-12 w-12 mx-auto mb-4 text-purple-500" />
                  <h3 className="text-lg font-bold mb-2">Otomatik Reklam!</h3>
                  <p className="text-gray-600 mb-4">
                    {AUTO_AD_CLICK_INTERVAL} tıklama tamamlandı! Reklam izleyerek bonus kazanın.
                  </p>
                </>
              )}
              {adType === "multiplier" && (
                <>
                  <Zap className="h-12 w-12 mx-auto mb-4 text-yellow-500" />
                  <h3 className="text-lg font-bold mb-2">Çarpan Artır!</h3>
                  <p className="text-gray-600 mb-4">10 dakika boyunca çarpanınızı artırın!</p>
                </>
              )}
              {adType === "instant" && (
                <>
                  <Star className="h-12 w-12 mx-auto mb-4 text-green-500" />
                  <h3 className="text-lg font-bold mb-2">Anında Kazanç!</h3>
                  <p className="text-gray-600 mb-4">Günlük offline kazancınızın %35'ini hemen alın!</p>
                </>
              )}
              {adType === "offline" && (
                <>
                  <Clock className="h-12 w-12 mx-auto mb-4 text-blue-500" />
                  <h3 className="text-lg font-bold mb-2">6 Saatlik Offline!</h3>
                  <p className="text-gray-600 mb-4">6 saat boyunca çevrimdışı kazanç elde edin!</p>
                </>
              )}
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowAdModal(false)} className="flex-1">
                  Atla
                </Button>
                <Button onClick={handleAdWatched} className="flex-1 bg-purple-600 hover:bg-purple-700">
                  İzle
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Info Modal */}
      {showInfoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="m-4 w-full max-w-md">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-4">Bilgi</h3>
              <p className="text-gray-600 mb-4">{getInfoContent()}</p>
              <Button onClick={() => setShowInfoModal(false)} className="w-full">
                Tamam
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
