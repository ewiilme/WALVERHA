import type { User, Transaction, ShopItem, NewsItem } from "@/types"

// Yeni kullanıcı için sıfır bakiye
export const mockUser: User = {
  id: "1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
  username: "WalverhaKing",
  email: "user@example.com",
  whaBalance: 0, // Sıfırdan başlıyor
  usdBalance: 0, // Sıfırdan başlıyor
  totalClicks: 0, // Sıfırdan başlıyor
  inviteCode: "WHA-USER-123",
  invitedUsers: 0, // Sıfırdan başlıyor
  language: "tr",
  theme: "light",
  kycStatus: "not_started",
}

export const mockTransactions: Transaction[] = []

export const mockShopItems: ShopItem[] = [
  {
    id: "1",
    name: "Walverha Pasif Paket - 5 Günlük",
    description: "5 gün boyunca 2x offline kazanç",
    price: 0.065,
    currency: "USD",
    duration: 5,
    multiplier: 2,
    type: "offline",
    profitPercentage: 35,
  },
  {
    id: "2",
    name: "Walverha Pasif Paket - 10 Günlük",
    description: "10 gün boyunca 3x offline kazanç",
    price: 0.375,
    currency: "USD",
    duration: 10,
    multiplier: 3,
    type: "offline",
    profitPercentage: 40,
  },
  {
    id: "3",
    name: "Walverha Pasif Paket - 20 Günlük",
    description: "20 gün boyunca 5x offline kazanç",
    price: 1.17,
    currency: "USD",
    duration: 20,
    multiplier: 5,
    type: "offline",
    profitPercentage: 50,
  },
  {
    id: "4",
    name: "Walverha Pasif Paket - 30 Günlük",
    description: "30 gün boyunca 10x offline kazanç",
    price: 3.39,
    currency: "USD",
    duration: 30,
    multiplier: 10,
    type: "offline",
    profitPercentage: 55,
  },
  {
    id: "5",
    name: "Premium Pasif Paket - 7 Günlük",
    description: "7 gün boyunca 15x offline kazanç",
    price: 1.15,
    currency: "USD",
    duration: 7,
    multiplier: 15,
    type: "offline",
    profitPercentage: 60,
  },
  {
    id: "6",
    name: "VIP Pasif Paket - 14 Günlük",
    description: "14 gün boyunca 20x offline kazanç",
    price: 3.06,
    currency: "USD",
    duration: 14,
    multiplier: 20,
    type: "offline",
    profitPercentage: 60,
  },
  {
    id: "7",
    name: "Otomatik Reklam Engelleyici",
    description: "1 aylık tüm otomatik reklamları engeller",
    price: 0.99,
    currency: "USD",
    duration: 30,
    multiplier: 1,
    type: "ad_blocker",
  },
  {
    id: "8",
    name: "Ekstra Reklam Çarpanı",
    description: "1 haftalık tüm reklam çarpanlarını 2x yapar",
    price: 3.99,
    currency: "USD",
    duration: 7,
    multiplier: 2,
    type: "extra_multiplier",
  },
]

export const mockNews: NewsItem[] = [
  {
    id: "1",
    title: "Walverha v1.1 Güncellendi!",
    content:
      "Bu hafta: Bug fix, sistem güncellemeleri ve güvenlik sorunları düzeltildi. Yeni offline kazanç sistemi aktif edildi ve performans iyileştirmeleri yapıldı.",
    summary: "Bug fix, sistem güncellemeleri ve güvenlik sorunları düzeltildi.",
    date: new Date("2024-01-08"),
    likes: 45,
    comments: [
      {
        id: "1",
        userId: "1",
        userName: "Ahmet K.",
        content: "Harika güncelleme! Offline kazanç çok iyi çalışıyor.",
        date: new Date("2024-01-08"),
      },
    ],
    isVersionUpdate: true,
    version: "v1.1",
  },
  {
    id: "2",
    title: "Yeni Mağaza Paketleri!",
    content:
      "Mağazaya yeni offline kazanç paketleri eklendi. Daha yüksek kazanç için paketleri inceleyin. Kar oranları %35'ten %60'a kadar değişiyor.",
    summary: "Mağazaya yeni offline kazanç paketleri eklendi.",
    date: new Date("2024-01-05"),
    likes: 32,
    comments: [],
  },
]

export const mockInvitedUsers = []

export const mockLeaderboard = [
  { rank: 1, username: "TopInviter", invites: 45 },
  { rank: 2, username: "CryptoKing", invites: 38 },
  { rank: 3, username: "WHAMaster", invites: 32 },
  { rank: 4, username: "WalverhaKing", invites: 0 },
]
