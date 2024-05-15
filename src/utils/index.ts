// 获取当前时间前后一周时间
export const lastWeek = () => {
  const currDate = new Date()
  const list = []
  return list
}

export const currentDate = () => {
  const d = new Date()
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const date = d.getDate()
  return `${year}-${month > 10 ? month : `0${month}`}-${date > 10 ? date : `0${date}`}`
}
