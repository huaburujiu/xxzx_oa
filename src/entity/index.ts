export interface Member {
  department: string
  id: number
  name: string
}

export interface Place {
  id: number
  name: string
}

export interface ResponseData {
  id: number
  member: number[]
  place: number[]
  content: string
  vehicle: string
  s_date: string
  e_date: string
}

export interface TableData {
  id: string
  member: string[]
  place: string[]
  content: string
  vehicle: string
  s_date: string
  e_date: string
}

export interface FormType {
  member: number[]
  place: number[]
  content: string
  vehicle: string
  s_date: string
  e_date: string
}

export interface ListItem {
  value: number
  label: string
}

export interface MissionShowData {
  id: number
  member: string[]
  place: string[]
  content: string
  vehicle: string
  s_date: string
  e_date: string
}
