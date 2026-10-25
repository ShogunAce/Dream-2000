export type Priority = 'Entry' | 'Medium' | 'High'
export type MissionStatus = 'uncontacted' | 'waiting' | 'no' | 'yes'

export interface Mission {
  id: string
  order: number
  company: string
  priority: Priority
  ask: string
  message: string
  contactName: string
  contactTitle: string
  channel: string
  email: string
  linkedin: string
  xHandle: string
  notes: string
  status: MissionStatus
  xpEarned: number
  badgeId?: string
  sentAt?: string
  resolvedAt?: string
}

export interface Badge {
  id: string
  company: string
  ask: string
  earnedAt: string
}

export interface AppState {
  missions: Mission[]
  batchIds: string[]
  batchDate: string
  totalXp: number
  noCount: number
  badges: Badge[]
  profile: { callsign: string; missionStatement: string }
}
