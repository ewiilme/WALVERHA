"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Share2, Copy, Check, Trophy } from "lucide-react"
import { mockUser, mockInvitedUsers, mockLeaderboard } from "@/lib/mockData"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { INVITE_BONUS_STRUCTURE } from "@/lib/constants"

export function InviteScreen() {
  const [user] = useLocalStorage("walverha_user", mockUser)
  const [copied, setCopied] = useState(false)

  const copyInviteCode = () => {
    navigator.clipboard.writeText(user.inviteCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareInviteCode = () => {
    if (navigator.share) {
      navigator.share({
        title: "Walverha'ya Katıl!",
        text: `Walverha ile WHA coin kazanmaya başla! Davet kodum: ${user.inviteCode}`,
        url: `https://walverha.com/invite/${user.inviteCode}`,
      })
    }
  }

  return (
    <div className="p-4 pb-20 bg-gradient-to-br from-purple-50 to-purple-100 min-h-screen">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="bg-purple-600 p-3 rounded-full w-16 h-16 mx-auto mb-4">
          <Users className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-purple-900 mb-2">Davet Et, Davet Ettikçe Kazan!</h1>
        <p className="text-purple-600">Davet Et, Gelecekteki Avantajlardan Yararlan!</p>
      </div>

      {/* Invite Code Card */}
      <Card className="mb-6 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <CardContent className="p-6">
          <div className="text-center">
            <p className="text-sm opacity-90 mb-2">Davet Kodunuz</p>
            <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-4">
              <p className="text-2xl font-bold font-mono">{user.inviteCode}</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={copyInviteCode} className="flex-1 bg-white text-purple-600 hover:bg-gray-100" size="sm">
                {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                {copied ? "Kopyalandı!" : "Davet Kodunu Paylaş"}
              </Button>
              <Button onClick={shareInviteCode} className="flex-1 bg-white text-purple-600 hover:bg-gray-100" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Paylaş
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bonus Structure */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg text-purple-900">Davet Bonusu Yapısı</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {INVITE_BONUS_STRUCTURE.map((bonus, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">{bonus.range}</span>
                <Badge className="bg-green-100 text-green-800">{bonus.bonus}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-purple-900">{user.invitedUsers}</p>
            <p className="text-sm text-purple-600">Toplam Davetli</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">$15</p>
            <p className="text-sm text-purple-600">Kazanılan Bonus</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="invited" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="invited">Davet Edilenlerim</TabsTrigger>
          <TabsTrigger value="leaderboard">En Çok Davet Edenler</TabsTrigger>
        </TabsList>

        <TabsContent value="invited">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-purple-900">Davet Edilenlerim</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockInvitedUsers.map((invitedUser) => (
                  <div key={invitedUser.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{invitedUser.username}</p>
                      <p className="text-xs text-gray-500">
                        Katılım: {new Date(invitedUser.joinDate).toLocaleDateString("tr-TR")}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm text-green-600">+${invitedUser.bonus}</p>
                      <Badge variant={invitedUser.status === "active" ? "default" : "secondary"} className="text-xs">
                        {invitedUser.status === "active" ? "Aktif" : "Pasif"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leaderboard">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-purple-900 flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                En Çok Davet Edenler
              </CardTitle>
              <Badge variant="secondary" className="w-fit">
                Bu davet listesi yarışması çok yakında aktif!
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockLeaderboard.map((leader) => (
                  <div
                    key={leader.rank}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      leader.username === "WalverhaKing" ? "bg-purple-100 border-2 border-purple-300" : "bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          leader.rank === 1
                            ? "bg-yellow-500 text-white"
                            : leader.rank === 2
                              ? "bg-gray-400 text-white"
                              : leader.rank === 3
                                ? "bg-orange-500 text-white"
                                : "bg-purple-200 text-purple-800"
                        }`}
                      >
                        {leader.rank}
                      </div>
                      <p className="font-medium text-sm">{leader.username}</p>
                      {leader.username === "WalverhaKing" && <Badge variant="outline">Sen</Badge>}
                    </div>
                    <p className="font-bold text-purple-900">{leader.invites} davetli</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
