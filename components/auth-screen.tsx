"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Globe, Moon, Sun, Eye, EyeOff } from "lucide-react"
import Image from "next/image"

interface AuthScreenProps {
  onLogin: () => void
}

export function AuthScreen({ onLogin }: AuthScreenProps) {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [language, setLanguage] = useState("tr")
  const [darkMode, setDarkMode] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onLogin()
    }, 1000)
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      alert("Şifre sıfırlama bağlantısı e-posta adresinize gönderildi!")
      setShowForgotPassword(false)
    }, 1000)
  }

  if (showForgotPassword) {
    return (
      <div
        className={`min-h-screen relative ${darkMode ? "bg-gray-900" : "bg-gradient-to-br from-purple-900 via-purple-700 to-purple-500"} flex items-center justify-center p-4`}
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="text-white text-[20rem] font-bold">WHA</div>
        </div>

        <div className="absolute top-4 right-4 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-white" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-white/20 text-white border border-white/30 rounded px-2 py-1 text-sm"
            >
              <option value="tr">Türkçe</option>
              <option value="en">English</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4 text-white" />
            <Switch checked={darkMode} onCheckedChange={setDarkMode} className="data-[state=checked]:bg-purple-600" />
            <Moon className="h-4 w-4 text-white" />
          </div>
        </div>

        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-purple-800">Şifremi Unuttum</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reset-email">E-posta Adresiniz</Label>
                <div className="relative">
                  <Input id="reset-email" type="email" placeholder="ornek@email.com" className="pl-10" required />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => setShowForgotPassword(false)}
                >
                  Geri Dön
                </Button>
                <Button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700" disabled={loading}>
                  {loading ? "Gönderiliyor..." : "Gönder"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen relative ${darkMode ? "bg-gray-900" : "bg-gradient-to-br from-purple-900 via-purple-700 to-purple-500"} flex items-center justify-center p-4`}
    >
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <div className="text-white text-[20rem] font-bold">WHA</div>
      </div>

      <div className="absolute top-4 right-4 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-white" />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-white/20 text-white border border-white/30 rounded px-2 py-1 text-sm"
          >
            <option value="tr">Türkçe</option>
            <option value="en">English</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <Sun className="h-4 w-4 text-white" />
          <Switch checked={darkMode} onCheckedChange={setDarkMode} className="data-[state=checked]:bg-purple-600" />
          <Moon className="h-4 w-4 text-white" />
        </div>
      </div>

      <Card className="w-full max-w-md relative z-10">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative w-16 h-16">
              <Image
                src="/images/walverha-logo.png"
                alt="Walverha Logo"
                width={64}
                height={64}
                className="rounded-full"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-purple-900">Walverha Network</h1>
              <p className="text-sm text-purple-600">WHA Coin Kazanma Platformu</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Giriş Yap</TabsTrigger>
              <TabsTrigger value="register">Kayıt Ol</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Kullanıcı Adı</Label>
                  <Input id="username" type="text" placeholder="Kullanıcı adınız" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Şifre</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" checked={rememberMe} onCheckedChange={setRememberMe} />
                    <Label htmlFor="remember" className="text-sm">
                      Beni Hatırla
                    </Label>
                  </div>
                  <Button
                    type="button"
                    variant="link"
                    className="p-0 h-auto text-sm text-purple-600"
                    onClick={() => setShowForgotPassword(true)}
                  >
                    Şifremi Unuttum
                  </Button>
                </div>

                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={loading}>
                  {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-username">Kullanıcı Adı</Label>
                  <Input id="register-username" type="text" placeholder="Kullanıcı adınız" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email">E-posta Adresi</Label>
                  <Input id="register-email" type="email" placeholder="ornek@email.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Şifre</Label>
                  <div className="relative">
                    <Input
                      id="register-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pr-10"
                      minLength={6}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Şifre Tekrarı</Label>
                  <div className="relative">
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pr-10"
                      minLength={6}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="invite-code">Davet Kodu (Opsiyonel)</Label>
                  <Input id="invite-code" type="text" placeholder="WHA-USER-123" />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" checked={acceptTerms} onCheckedChange={setAcceptTerms} required />
                  <Label htmlFor="terms" className="text-sm">
                    <Button variant="link" className="p-0 h-auto text-sm text-purple-600">
                      Kullanım Koşulları
                    </Button>
                    {" ve "}
                    <Button variant="link" className="p-0 h-auto text-sm text-purple-600">
                      Gizlilik Politikası
                    </Button>
                    'nı kabul ediyorum
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  disabled={loading || !acceptTerms}
                >
                  {loading ? "Hesap oluşturuluyor..." : "Hesap Oluştur"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Veya</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <Button variant="outline" className="w-full bg-transparent">
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
