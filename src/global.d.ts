interface ISettings {
    workingHours: number[],
    plan: number[],
}

interface IStat {
    dailyStat: Array<number | null>
    totalStat: number,
    diff: number
}
