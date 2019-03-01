import moment from 'moment'

export interface Stat {
  plan: number,
  done: number,
}

export interface WeeklyStat {
  days: Stat[],
  plannedByNow: number,
}

class TimeCalc {
  public static getProgress(planed: number[], done: number[], workingHours: number[]): WeeklyStat {
    const days: Stat[] = []
    let plannedByNow = 0

    const now = moment()

    const dayStart = moment().utc().startOf('isoWeek')
    const dayEnd = moment(dayStart).add(1, 'd')

    for (let i = 0; i < 7; i++) {
      const todayStat: Stat = {
        plan: planed[i],
        done: done[i],
      }

      if (now.isAfter(dayEnd)) {
        // Day is ended
        plannedByNow += planed[i]
      } else if (now.isBefore(dayStart)) {
        // Day isn't started
      } else {
        // Today
        const workStart = moment(dayStart).local().hour(workingHours[0])
        const workEnd = moment(dayStart).local().hour(workingHours[1])

        if (now.isBefore(workStart)) {
          // Working time is not started yet or planned day off
        } else if (now.isAfter(workEnd)) {
          // Working time is end
          plannedByNow += planed[i]
        } else {
          // Working hours is now
          const percent = now.diff(workStart) / workEnd.diff(workStart)
          plannedByNow += planed[i] * percent
        }
      }

      days.push(todayStat)

      // Goto next day
      dayStart.add(1, 'd')
      dayEnd.add(1, 'd')
    }

    return {
      days,
      plannedByNow,
    }
  }
}

export default TimeCalc
