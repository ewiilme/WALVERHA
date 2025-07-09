"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Settings, User, Shield, Info, FileText, Globe, Moon, Sun, LogOut, Copy, Check, Camera } from "lucide-react"
import { mockUser } from "@/lib/mockData"
import { useLocalStorage } from "@/hooks/useLocalStorage"

export function SettingsScreen() {
  const [user, setUser] = useLocalStorage("walverha_user", mockUser)

  // Safety - prevent undefined issues coming from corrupted localStorage or missing fields
  const safeUser = {
    username: user?.username ?? "User",
    id: user?.id ?? "unknown-id",
    email: user?.email ?? "unknown@mail.com",
    ...user, // keep the rest (overrides defaults if they exist)
  }

  // First character used for the avatar fallback
  const avatarInitial = safeUser.username.charAt(0).toUpperCase()

  const [copied, setCopied] = useState(false)
  const [language, setLanguage] = useLocalStorage("walverha_language", "tr")
  const [darkMode, setDarkMode] = useLocalStorage("walverha_theme", false)

  const copyUserId = () => {
    navigator.clipboard.writeText(safeUser.id)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleKYC = () => {
    alert("KYC Doğrulama Çok Yakında Aktif Olacaktır!")
  }

  const handleLogout = () => {
    localStorage.clear()
    window.location.reload()
  }

  return (
    <div
      className={`p-4 pb-20 min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-purple-50 to-purple-100"}`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-purple-600 p-2 rounded-full">
          <Settings className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-purple-900">Ayarlar</h1>
      </div>

      {/* Profile Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg text-purple-900 flex items-center gap-2">
            <User className="h-5 w-5" />
            Profil
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="w-20 h-20">
                <AvatarImage src="/placeholder.svg?height=80&width=80" />
                <AvatarFallback className="bg-purple-600 text-white text-xl">{avatarInitial}</AvatarFallback>
              </Avatar>
              <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0">
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg">{safeUser.username}</h3>
              <p className="text-gray-600">{safeUser.email}</p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Benzersiz ID</label>
            <div className="flex gap-2">
              <div className="flex-1 p-2 bg-gray-100 rounded border text-sm font-mono">{safeUser.id}</div>
              <Button onClick={copyUserId} variant="outline" size="sm">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <Button onClick={handleKYC} className="w-full bg-purple-600 hover:bg-purple-700">
            <Shield className="h-4 w-4 mr-2" />
            KYC Doğrulama
          </Button>
          <Badge variant="secondary" className="w-full justify-center">
            KYC Doğrulama Çok Yakında Aktif Olacaktır!
          </Badge>
        </CardContent>
      </Card>

      {/* About Walverha */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg text-purple-900 flex items-center gap-2">
            <Info className="h-5 w-5" />
            Walverha Network Hakkında
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-gray-600">
              Walverha Network, kullanıcılarına basit tıklamalar ve etkileşimlerle kripto para kazanma fırsatı sunan
              yenilikçi bir platformdur. Amacımız, kripto dünyasını herkes için erişilebilir kılmak ve pasif gelir elde
              etme yollarını genişletmektir.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2">What is Walverha Coin?</h4>
            <p className="text-sm text-gray-600 mb-3">
              Walverha Coin is a next-generation cryptocurrency designed not only for transactions but to solve a rising
              global issue: verifying and securing AI-generated content. Built on a Web3 foundation, Walverha aims to
              bring trust, transparency, and traceability to the age of artificial intelligence.
            </p>
            <p className="text-sm text-gray-600">
              It empowers users and platforms to prove the authenticity of digital content — whether written, visual, or
              audio — and prevents the spread of misinformation and deepfakes through blockchain-backed verification.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2">What Does It Do?</h4>
            <div className="space-y-3 text-sm text-gray-600">
              <div>
                <p className="font-medium text-green-600">✅ 1. AI Content Verification System</p>
                <p>
                  Walverha's core feature is its ability to verify the origin and process of AI-generated content using
                  blockchain:
                </p>
                <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                  <li>Confirms who created the content, when, and how it was generated.</li>
                  <li>Helps users and platforms distinguish between authentic content and AI-driven manipulation.</li>
                  <li>Especially useful in news media, education, and creative industries.</li>
                </ul>
              </div>

              <div>
                <p className="font-medium text-blue-600">🔒 2. Secure Content Registry</p>
                <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                  <li>
                    Creators can register their AI-generated works on the Walverha network, creating a tamper-proof
                    certificate of authenticity.
                  </li>
                  <li>Prevents unauthorized use, plagiarism, or manipulation of digital works.</li>
                  <li>Functions as a trust seal for verified content.</li>
                  <li>Protects creators' intellectual property rights in the AI era.</li>
                </ul>
              </div>

              <div>
                <p className="font-medium text-purple-600">⚙️ 3. Web3 Integration Layer</p>
                <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                  <li>Walverha Coin is designed to be easily integrated into other apps and platforms via APIs.</li>
                  <li>
                    News sites, AI writing tools, education platforms, and content marketplaces can plug in Walverha
                    verification.
                  </li>
                  <li>
                    Verified content receives a "Trusted by Walverha" badge, boosting credibility and trust with users.
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-medium text-yellow-600">🪙 4. Token Utility & Ecosystem</p>
                <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                  <li>Users pay with Walverha Coin to verify content.</li>
                  <li>Creators use it to register and protect their works on the blockchain.</li>
                  <li>Validators who maintain and confirm data on the network earn Walverha Coin as rewards.</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* App Settings */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg text-purple-900">Uygulama Ayarları</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-purple-600" />
              <span>Dil</span>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-white border border-gray-300 rounded px-3 py-1"
            >
              <option value="tr">Türkçe</option>
              <option value="en">English</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {darkMode ? <Moon className="h-5 w-5 text-purple-600" /> : <Sun className="h-5 w-5 text-purple-600" />}
              <span>Tema</span>
            </div>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </div>
        </CardContent>
      </Card>

      {/* Information */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg text-purple-900 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Bilgi
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="ghost" className="w-full justify-start">
            Genel Kurallar ve Nasıl Kullanılır?
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Hizmet Şartları ve Gizlilik Politikası
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Sıkça Sorulan Sorular
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Destek & İletişim
          </Button>
        </CardContent>
      </Card>

      {/* Logout */}
      <Button onClick={handleLogout} variant="destructive" className="w-full">
        <LogOut className="h-4 w-4 mr-2" />
        Çıkış Yap
      </Button>
    </div>
  )
}
