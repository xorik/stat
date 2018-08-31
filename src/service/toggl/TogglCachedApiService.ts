import TogglApiService, {TimeEntry} from '@/service/toggl/TogglApiService'
import moment, {Moment} from 'moment'
import {AxiosError} from 'axios'

type EntriesCallback = (data: TimeEntry[]) => void

const DELAY_ON_ERROR = 10
const MIN_DELAY = 1
const MAX_DELAY = 60

class TogglCachedApiService extends TogglApiService {
  protected lastUpdate: Moment

  constructor(token: string) {
    super(token)
    this.lastUpdate = moment().subtract(1, 'w')
  }

  public start(callback: EntriesCallback): void {
    this.delayAndWait(callback, 0)
  }

  protected delayAndWait(callback: EntriesCallback, delay: number): void {
    setTimeout((): void => {
      super.getLastLog()
        .then((data: TimeEntry[]) => {
          callback(data)
          this.checkLastUpdate(data)
          this.delayAndWait(callback, this.calcDelay())
        })
        .catch((reason: AxiosError): void => {
          this.delayAndWait(callback, DELAY_ON_ERROR)
        })
    }, delay * 60 * 1000)
  }

  protected checkLastUpdate(entries: TimeEntry[]): void {

    // Check for ongoing time entry
    for (const entry of entries) {
      if (entry.duration < 0) {
        this.lastUpdate = moment()
        return
      }
    }

    for (const entry of entries) {
      const current: Moment = moment(entry.start).add(entry.duration, 's')

      if (current.isAfter(this.lastUpdate)) {
        this.lastUpdate = current
      }
    }
  }

  protected calcDelay(): number {
    const x: number = moment().diff(this.lastUpdate, 'm', true)

    const y: number = 61.46981 - 61.33514 / 2 ** (x / 244.4621)

    return Math.max(MIN_DELAY, Math.min(y, MAX_DELAY))
  }
}

export default TogglCachedApiService
