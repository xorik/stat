export default function(mins: number): string {
  let negative = false
  if (mins < 0) {
    negative = true
    mins = -mins
  }

  const hours: number = Math.floor(mins / 60)
  mins -= hours * 60
  mins = Math.round(mins)
  const m: string = mins > 9 ? mins.toString() : `0${mins}`

  const sign = negative ? '-' : ''

  return `${sign}${hours}:${m}`
}
