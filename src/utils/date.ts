import { DateData } from "@/types/date"

export function parseDateString(dateStr: string): DateData {
  const regex = /^(\d{4})-(\d{2})-(\d{2})$/
  const match = dateStr.match(regex)
  
  if (!match) {
    throw new Error(`无效的日期格式: "${dateStr}"，期望 YYYY-MM-DD 格式`)
  }
  
  const y = parseInt(match[1], 10)
  const m = parseInt(match[2], 10)
  const d = parseInt(match[3], 10)
  
  const date = new Date(y, m - 1, d)
  if (
    date.getFullYear() !== y ||
    date.getMonth() !== m - 1 ||
    date.getDate() !== d
  ) {
    throw new Error(`非法的日期: "${dateStr}"`)
  }
  
  return { y, m, d }
}

export function formatDateString(dateObj: DateData): string {
  const { y, m, d } = dateObj
  
  if (m < 1 || m > 12) {
    throw new Error(`月份必须在 1-12 之间，实际为: ${m}`)
  }
  
  const date = new Date(y, m - 1, d)
  if (
    date.getFullYear() !== y ||
    date.getMonth() !== m - 1 ||
    date.getDate() !== d
  ) {
    throw new Error(`非法的日期: ${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`)
  }
  
  const year = String(y).padStart(4, '0')
  const month = String(m).padStart(2, '0')
  const day = String(d).padStart(2, '0')
  
  return `${year}-${month}-${day}`
}

export function getCurrentDate(): DateData {
  const now = new Date()
  return {
    y: now.getFullYear(),
    m: now.getMonth() + 1,
    d: now.getDate()
  }
}

export function dateEqual(a: DateData, b: DateData) {
  return a.y === b.y && a.m === b.m && a.d === b.d
}

export function dateCopyWith(src: DateData, delta: Partial<DateData>) {
  return {
    y: delta.y ?? src.y,
    m: delta.m ?? src.m,
    d: delta.d ?? src.d
  }
}

export function dateAdd(
  dateObj: DateData,
  options: Partial<DateData>
): DateData {
  const date = new Date(dateObj.y, dateObj.m - 1, dateObj.d)
  
  if (options.y) {
    date.setFullYear(date.getFullYear() + options.y)
  }
  if (options.m) {
    date.setMonth(date.getMonth() + options.m)
  }
  if (options.d) {
    date.setDate(date.getDate() + options.d)
  }
  
  return {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate()
  }
}