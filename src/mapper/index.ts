import type { Member, Place } from '@/entity'

export class TableDataMapper {
  // 通过memberList和memberIDs获取Members
  getMembers(memberList: Member[], memberIDs: number[]): Member[] {
    const members: Member[] = memberList.filter((member) => {
      return memberIDs.includes(member.id)
    })
    return members
  }
  // 通过placeList和placeIDs获取Places
  getPlaces(placeList: Place[], placeIDs: number[]): Place[] {
    const places: Place[] = placeList.filter((place) => {
      return placeIDs.includes(place.id)
    })
    return places
  }
  // 获取Place.name列
  getPlaceNameColumn1(places: Place[]): string[] {
    return places.map((place) => place.name)
  }
  getPlaceNameColumn2(placeList: Place[], placeIDs: number[]): string[] {
    return this.getPlaces(placeList, placeIDs).map((place) => place.name)
  }
  // 获取Member.name列
  getMemberNameColumn1(members: Member[]): string[] {
    return members.map((member) => member.name)
  }
  getMemberNameColumn2(memberList: Member[], memberIDs: number[]): string[] {
    return this.getPlaces(memberList, memberIDs).map((member) => member.name)
  }
}

export class DateTimeMapper {
  // 转化日期格式为yyyy-MM-dd HH:mm:ss
  formatDateString(dateStr: string): string {
    // 尝试将字符串解析为Date对象
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) {
      // 如果解析失败，返回一个错误或空字符串
      return 'Invalid date'
    }
    // 格式化日期
    const year = date.getFullYear().toString().padStart(4, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const seconds = date.getSeconds().toString().padStart(2, '0')

    // 返回格式化后的字符串
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  }
  // 字符串日期转日期格式
  strToDate = (str: string) => {
    return str.replace(/年|月/g, '-').replace(/日/g, '')
  }
  // 转化日期格式为YY-MM
  formatDateToYYMM = (date: Date): string => {
    const year = date.getFullYear().toString() // 获取年份的后两位
    const month = (date.getMonth() + 1).toString().padStart(2, '0') // 获取月份并补零
    return `${year}-${month}`
  }
}
