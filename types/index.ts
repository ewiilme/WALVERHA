export interface User {
  id: string
  username: string
  email: string
  whaBalance: number
  usdBalance: number
  totalClicks: number
  inviteCode: string
  invitedUsers: number
  profileImage?: string
  language: "tr" | "en"
  theme: "light" | "dark"
  kycStatus: "pending" | "approved" | "rejected" | "not_started"
}

export interface AdMultiplier {
  level: number
  multiplier: number
  isActive: boolean
  endTime: number
}

export interface OfflineEarning {
  isActive: boolean
  endTime: number
  multiplier: number
}

export interface Transaction {
  id: string
  type: "earn" | "withdraw" | "transfer" | "bonus" | "purchase"
  amount: number
  currency: "WHA" | "USD"
  date: Date
  status: "completed" | "pending" | "failed"
  description: string
}

export interface ShopItem {
  id: string
  name: string
  description: string
  price: number
  currency: "USD"
  duration: number
  multiplier: number
  type: "offline" | "ad_blocker" | "extra_multiplier"
  profitPercentage?: number
}

export interface NewsItem {
  id: string
  title: string
  content: string
  summary: string
  date: Date
  likes: number
  comments: Comment[]
  isVersionUpdate?: boolean
  version?: string
}

export interface Comment {
  id: string
  userId: string
  userName: string
  content: string
  date: Date
}

export interface InviteBonus {
  range: string
  bonus: string
  description: string
  minInvites: number
  maxInvites: number
  bonusAmount: number
}
