export const currentDate = () => {
  const d = new Date()
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const date = d.getDate()
  return `${year}-${month > 10 ? month : `0${month}`}-${date > 10 ? date : `0${date}`}`
}

const getDateAndWeek = (timestamp: number) => {
  const weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  const d = new Date(timestamp)
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const day = d.getDate()
  const week = d.getDay()
  const dateStr = `${year}-${month >= 10 ? month : `0${month}`}-${day >= 10 ? day : `0${day}`}`
  let weekStr = weeks[week]
  if (dateStr === currentDate()) {
    weekStr = '今天'
  }
  return {
    week: weekStr,
    date: dateStr
  }
}
export const formatDate = (timestamp: number) => {
  const d = new Date(timestamp)
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const day = d.getDate()
  return `${year}-${month >= 10 ? month : `0${month}`}-${day >= 10 ? day : `0${day}`}`
}
// 返回数组前后2天日期[{week: '星期日', date: '2024-05-12'}]
export const lastWeek = (date: string) => {
  const d = new Date(date)
  const arr: Array<{week: string, date: string}> = []
  for (let i = 0; i <= 2; i++) {
    arr.push(getDateAndWeek(d.getTime() - 24 * 3600 * 1000 * (2-i)))
  }
  for (let i = 1; i <= 2; i++) {
    arr.push(getDateAndWeek(d.getTime() + 24 * 3600 * 1000 * i))
  }
  return arr;
}
