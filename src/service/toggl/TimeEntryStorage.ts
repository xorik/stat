import {TimeEntry} from '@/service/toggl/TogglWebsocketService'

class TimeEntryStorage {
  protected entries: TimeEntry[] = []

  public getEntries(): TimeEntry[] {
    return this.entries
  }

  public addEntry(newEntry: TimeEntry): void {
    const index = this.entries.findIndex((entry: TimeEntry) => newEntry.id === entry.id)

    if (index >= 0) {
      this.entries[index] = newEntry
      return
    }

    this.entries.push(newEntry)
  }

  public addEntries(entries: TimeEntry[]): void {
    for (const entry of entries) {
      this.addEntry(entry)
    }
  }

  public removeEntry(delEntry: TimeEntry): void {
    const index = this.entries.findIndex((entry: TimeEntry) => delEntry.id === entry.id)

    if (index >= 0) {
      this.entries.splice(index, 1)
    }
  }
}

export default TimeEntryStorage
