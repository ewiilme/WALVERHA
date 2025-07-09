"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Wallet, Download, Send, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { mockUser, mockTransactions } from "@/lib/mockData"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { MIN_WITHDRAW_USD, MIN_WITHDRAW_INVITES, WHA_TO_USD_RATE } from "@/lib/constants"

export function WalletScreen() {
  const [user] = useLocalStorage("walverha_user", mockUser)
  const [transactions] = useLocalStorage("walverha_transactions", mockTransactions)
  const [showWithdrawModal, setShowWithdrawModal] = useState(false)
  const [showTransferModal, setShowTransferModal] = useState(false)

  const canWithdraw = user.usdBalance >= MIN_WITHDRAW_USD && user.invitedUsers >= MIN_WITHDRAW_INVITES
  const canTransfer = user.totalClicks > 0 // Mock condition for successful withdrawal

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-4 pb-20 bg-gradient-to-br from-purple-50 to-purple-100 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-purple-600 p-2 rounded-full">
          <Wallet className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-purple-900">Cüzdanım</h1>
      </div>

      {/* Balance Display */}
      <Card className="mb-6 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <CardContent className="p-6">
          <div className="text-center">
            <p className="text-sm opacity-90 mb-2">Toplam WHA Bakiyesi</p>
            <p className="text-4xl font-bold mb-2">{user.whaBalance.toFixed(8)}</p>
            <p className="text-lg opacity-90">WHA</p>
            <div className="mt-4 pt-4 border-t border-white/20">
              <p className="text-sm opacity-90">USD Karşılığı</p>
              <p className="text-2xl font-bold">≈ ${user.usdBalance.toFixed(6)}</p>
              <p className="text-xs opacity-75">1 WHA = ${WHA_TO_USD_RATE}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Button
          onClick={() => setShowWithdrawModal(true)}
          disabled={!canWithdraw}
          className="h-16 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300"
        >
          <div className="text-center">
            <Download className="h-5 w-5 mx-auto mb-1" />
            <p className="text-sm">Çekim Yap</p>
          </div>
        </Button>

        <Button
          onClick={() => setShowTransferModal(true)}
          disabled={!canTransfer}
          variant="outline"
          className="h-16 border-purple-200 hover:bg-purple-50 disabled:bg-gray-100"
        >
          <div className="text-center">
            <Send className="h-5 w-5 mx-auto mb-1 text-purple-600" />
            <p className="text-sm text-purple-600">Transfer Yap</p>
          </div>
        </Button>
      </div>

      {/* Withdrawal Conditions */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg text-purple-900">İşlem Koşulları</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">Çekim için minimum bakiye:</span>
              <Badge variant={user.usdBalance >= MIN_WITHDRAW_USD ? "default" : "secondary"}>
                ${user.usdBalance.toFixed(2)} / ${MIN_WITHDRAW_USD}
              </Badge>
            </div>
            <Progress value={(user.usdBalance / MIN_WITHDRAW_USD) * 100} className="h-2" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">Çekim için minimum davetli:</span>
              <Badge variant={user.invitedUsers >= MIN_WITHDRAW_INVITES ? "default" : "secondary"}>
                {user.invitedUsers} / {MIN_WITHDRAW_INVITES} kişi
              </Badge>
            </div>
            <Progress value={(user.invitedUsers / MIN_WITHDRAW_INVITES) * 100} className="h-2" />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Transfer için koşul:</span>
            <Badge variant={canTransfer ? "default" : "secondary"}>
              {canTransfer ? "En az 1 başarılı çekim yapıldı" : "En az 1 çekim gerekli"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-purple-900">İşlem Geçmişi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(transaction.status)}
                  <div>
                    <p className="font-medium text-sm">{transaction.description}</p>
                    <p className="text-xs text-gray-500">{transaction.date.toLocaleDateString("tr-TR")}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">
                    {transaction.type === "withdraw" ? "-" : "+"}
                    {transaction.amount} {transaction.currency}
                  </p>
                  <Badge className={`text-xs ${getStatusColor(transaction.status)}`}>
                    {transaction.status === "completed"
                      ? "Tamamlandı"
                      : transaction.status === "pending"
                        ? "Beklemede"
                        : "Başarısız"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="m-4 w-full max-w-md">
            <CardHeader>
              <CardTitle>Çekim Yap</CardTitle>
            </CardHeader>
            <CardContent>
              {!canWithdraw ? (
                <div className="text-center py-4">
                  <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-500" />
                  <p className="text-red-600 mb-4">Çekim koşulları karşılanmıyor!</p>
                  <p className="text-sm text-gray-600 mb-4">
                    Minimum ${MIN_WITHDRAW_USD} bakiye ve {MIN_WITHDRAW_INVITES} davetli kullanıcı gerekli.
                  </p>
                  <Button onClick={() => setShowWithdrawModal(false)} className="w-full">
                    Tamam
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p>Çekim işlemi başlatılacak...</p>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setShowWithdrawModal(false)} className="flex-1">
                      İptal
                    </Button>
                    <Button onClick={() => setShowWithdrawModal(false)} className="flex-1">
                      Onayla
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Transfer Modal */}
      {showTransferModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="m-4 w-full max-w-md">
            <CardHeader>
              <CardTitle>Transfer Yap</CardTitle>
            </CardHeader>
            <CardContent>
              {!canTransfer ? (
                <div className="text-center py-4">
                  <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-500" />
                  <p className="text-red-600 mb-4">Transfer koşulları karşılanmıyor!</p>
                  <p className="text-sm text-gray-600 mb-4">Daha önce en az 1 başarılı çekim yapmalısınız.</p>
                  <Button onClick={() => setShowTransferModal(false)} className="w-full">
                    Tamam
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p>Transfer işlemi başlatılacak...</p>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setShowTransferModal(false)} className="flex-1">
                      İptal
                    </Button>
                    <Button onClick={() => setShowTransferModal(false)} className="flex-1">
                      Onayla
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
