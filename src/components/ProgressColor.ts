export const RED = '#ee5f5b'
export const YELLOW = '#c6bf00'
export const ORANGE = '#fd7e14'
export const GREEN = '#62c462'

export default function(value: number): string {
  const blend = (color1: string, color2: string, ratio: number): string => {
    const hex = (x: number): string => {
      const s = x.toString(16)
      return s.length === 1 ? '0' + s : s
    }

    const r = Math.ceil(
      parseInt(color1.substring(1, 3), 16) * ratio +
        parseInt(color2.substring(1, 3), 16) * (1 - ratio),
    )
    const g = Math.ceil(
      parseInt(color1.substring(3, 5), 16) * ratio +
        parseInt(color2.substring(3, 5), 16) * (1 - ratio),
    )
    const b = Math.ceil(
      parseInt(color1.substring(5, 7), 16) * ratio +
        parseInt(color2.substring(5, 7), 16) * (1 - ratio),
    )

    return `#${hex(r)}${hex(g)}${hex(b)}`
  }

  if (value < 0.6) {
    return RED
  }

  if (value >= 1) {
    return GREEN
  }

  if (value < 0.8) {
    return blend(ORANGE, RED, (value - 0.6) / 0.2)
  }

  if (value < 0.9) {
    return blend(YELLOW, ORANGE, (value - 0.8) / 0.1)
  }

  return blend(GREEN, YELLOW, (value - 0.9) / 0.1)
}
