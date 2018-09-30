import moment from 'moment'

class TimeCalc {
  public static getProgress(planed: number[], done: number[], workingHours: number[]): IStat {
    const dailyStat: Array<number | null> = []
    let totalDone = 0.0
    let plannedByNow = 0.0

    const now = moment()

    const dayStart = moment().utc().startOf('isoWeek')
    const dayEnd = moment(dayStart).add(1, 'd')

    // Calculate worked hours and percentage by day
    for (let i = 0; i < 7; i++) {
      if (!done[i]) {
        done[i] = 0
      }
      totalDone += done[i]

      if (planed[i] === 0) {
        dailyStat[i] = (done[i] > 0) ? 1 : null
      } else if (now.isAfter(dayEnd)) {
        // Day is ended
        dailyStat[i] = done[i] / planed[i]
        plannedByNow += planed[i]
      } else if (now.isBefore(dayStart)) {
        // Day isn't started
        dailyStat[i] = null
      } else {
        // Today
        const workStart = moment(dayStart)
          .local()
          .hour(workingHours[0])
        const workEnd = moment(dayStart)
          .local()
          .hour(workingHours[1])

        // Working time is not started yet or planned day off
        if (now.isBefore(workStart) || planed[i] === 0) {
          dailyStat[i] = (done[i] > 0) ? 1 : null
        } else if (now.isAfter(workEnd)) {
          // Working time is end
          dailyStat[i] = planed[i] > 0 ? done[i] / planed[i] : null
          plannedByNow += planed[i]
        } else {
          // Working hours is now
          const percent = now.diff(workStart) / workEnd.diff(workStart)
          dailyStat[i] = done[i] / (planed[i] * percent)
          plannedByNow += planed[i] * percent
        }
      }

      // Goto next day
      dayStart.add(1, 'd')
      dayEnd.add(1, 'd')
    }

    const totalStat = plannedByNow > 0 ? totalDone / plannedByNow : 0
    const diff = totalDone - plannedByNow

    return {
      dailyStat,
      totalStat,
      diff,
    }
  }
}

export default TimeCalc
