export interface MaintenanceResponseData {
  id: number
  resolvedBy: number[]
  maintenanceLocation: number[]
  faultDescription: string
  typeOfMaintenance: string
  isRemote: string
  startTime: string
  endTime: string
  maintenanceProcess: string
  rootCause: string
  maintenanceResult: string
}

export interface MaintenanceFormType {
  resolvedBy: number[]
  maintenanceLocation: number[]
  faultDescription: string
  typeOfMaintenance: string
  isRemote: string
  startTime: string
  endTime: string
  maintenanceProcess: string
  rootCause: string
  maintenanceResult: string
}

export interface MaintenanceTableData {
  id: number
  resolvedBy: string[]
  maintenanceLocation: string[]
  faultDescription: string
  typeOfMaintenance: string
  isRemote: string
  startTime: string
  endTime: string
  maintenanceProcess: string
  rootCause: string
  maintenanceResult: string
}
