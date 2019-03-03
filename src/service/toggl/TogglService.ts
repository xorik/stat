import TogglWebsocketService, { TimeEntry, TogglAction, TogglEvent } from '@/service/toggl/TogglWebsocketService'
import TogglApiService from '@/service/toggl/TogglApiService'
import TimeStorage, { TimeEntryStorage } from '@/service/toggl/TimeEntryStorage'
import { app } from '@/store'

class TogglService {
  protected wsService: TogglWebsocketService
  protected apiService: TogglApiService
  protected storage: TimeEntryStorage

  constructor(protected token: string) {
    this.apiService = new TogglApiService(token)
    this.storage = TimeStorage
    this.wsService = new TogglWebsocketService(token, (event: TogglEvent): void => {
      this.wsCallback(event)
    })
  }

  public start(): void {
    this.wsService.start()

    this.apiService.getLastLog().then((entries: TimeEntry[]) => {
      this.storage.addEntries(entries)
      app.updateStat()
    })

    this.apiService.getCurrent().then((entry: TimeEntry | null) => {
      if (entry !== null) {
        app.updateStat()
      }
    })

    setInterval(app.updateStat, 10000)
  }

  protected wsCallback({action, data}: TogglEvent): void {
    if (action === TogglAction.Insert) {
      this.storage.addEntry(data)
    } else if (action === TogglAction.Update) {
      this.storage.addEntry(data)
    } else {
      this.storage.removeEntry(data)
    }
    app.updateStat()
  }
}

export default TogglService
