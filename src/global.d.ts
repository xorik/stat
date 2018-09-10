interface ISettings {
    workingHours: number[],
    plan: number[],
}

interface IStat {
    dailyStat: Array<number | null>
    totalStat: number,
    diff: number
}

declare module '@/../node_modules/nosleep.js/src/media' {
  let src: string

  export default src
}
