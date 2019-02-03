export default function(mins: number): string {
  let negative = false
  if (mins < 0) {
    negative = true
    mins = -mins
  }

  mins = Math.round(mins)
  const hours: number = Math.floor(mins / 60)
  mins -= hours * 60
  const m: string = mins > 9 ? mins.toString() : `0${mins}`

  const sign = negative ? '-' : ''

  return `${sign}${hours}:${m}`
}
