import moment, { Moment } from 'moment'
import { TimeEntry } from '@/service/toggl/TogglWebsocketService'
import TimeStorage from '@/service/toggl/TimeEntryStorage'

export default class TogglStatCalculator {
  public static calcStat(): number[] {
    const weekStart: Moment = moment().utc().startOf('isoWeek')
    const weekEnd: Moment = moment(weekStart).add(7, 'd')

    const statByDay: number[] = Array(7).fill(0)

    for (const entry of TimeStorage.getEntries()) {
      const start: Moment = moment(entry.start)
      if (start.isBefore(weekStart) || start.isAfter(weekEnd)) {
        continue
      }

      let duration = entry.duration

      // Current duration
      if (duration < 0) {
        duration = moment().diff(moment(entry.start), 's')
      }

      const index: number = start.isoWeekday() - 1

      statByDay[index] += duration / 60.0
    }

    return statByDay
  }
}
