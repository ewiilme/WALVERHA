export const BASE_CLICK_EARNING = 0.00001 // USD per click
export const OFFLINE_EARNING_RATIO = 0.35 // 65% less than click earning
export const WHA_TO_USD_RATE = 8.53 // 1 WHA = 8.53 USD
export const DAILY_CLICK_TARGET = 5000
export const AUTO_AD_CLICK_INTERVAL = 1300
export const MULTIPLIER_DURATION = 10 * 60 * 1000 // 10 minutes
export const OFFLINE_AD_DURATION = 6 * 60 * 60 * 1000 // 6 hours
export const MAX_INSTANT_ADS_PER_DAY = 10
export const MAX_OFFLINE_ADS_PER_DAY = 4
export const MIN_WITHDRAW_USD = 100
export const MIN_WITHDRAW_INVITES = 15

export const MULTIPLIER_LEVELS = [
  { level: 1, multiplier: 2 },
  { level: 2, multiplier: 5 },
  { level: 3, multiplier: 10 },
  { level: 4, multiplier: 15 },
  { level: 5, multiplier: 20 },
  { level: 6, multiplier: 25 },
]

export const INVITE_BONUS_STRUCTURE = [
  { range: "1-4 davetli", bonus: "5 USD", minInvites: 1, maxInvites: 4, bonusAmount: 5 },
  { range: "5-9 davetli", bonus: "2 USD", minInvites: 5, maxInvites: 9, bonusAmount: 2 },
  { range: "10-15 davetli", bonus: "1 USD", minInvites: 10, maxInvites: 15, bonusAmount: 1 },
  { range: "15+ davetli", bonus: "0.5 USDT", minInvites: 15, maxInvites: 999, bonusAmount: 0.5 },
]

export const NORMAL_DAILY_OFFLINE = 0.0175 // USD
export const NORMAL_MONTHLY_OFFLINE = 0.525 // USD
