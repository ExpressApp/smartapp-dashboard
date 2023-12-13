export interface DashboardItem {
  id: string
  appId?: string
  user_huid?: string
  name: string
  avatar: string | null
  description?: string
  isAlreadyAdded: boolean
}

export interface SectionProps {
  name: string
  type: string
  items: DashboardItem[]
}