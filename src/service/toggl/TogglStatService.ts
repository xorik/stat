import moment, {Moment} from 'moment'
import store from '@/store'
import TogglCachedApiService from '@/service/toggl/TogglCachedApiService'
import {TimeEntry} from '@/service/toggl/TogglApiService'

class TogglStatService {
  protected api: TogglCachedApiService

  constructor(token: string) {
    this.api = new TogglCachedApiService(token)
  }

  public start(): void {
    this.api.start((entries: TimeEntry[]) => {
      const stat: number[] = this.calcStat(entries)
      store.commit('updateTogglStat', stat)
    })
  }

  protected calcStat(entries: TimeEntry[]): number[] {
    const weekStart: Moment = moment().utc().startOf('isoWeek')
    const weekEnd: Moment = moment(weekStart).add(7, 'd')

    const statByDay: number[] = Array(7).fill(0)

    for (const entry of entries) {
      const start: Moment = moment(entry.start)
      if (start.isBefore(weekStart) || start.isAfter(weekEnd)) {
        continue
      }

      // Current duration
      if (entry.duration < 0) {
        entry.duration = moment().diff(moment(entry.start), 's')
      }

      const index: number = start.isoWeekday() - 1

      statByDay[index] += entry.duration / 60.0
    }

    return statByDay
  }
}

export default TogglStatService
