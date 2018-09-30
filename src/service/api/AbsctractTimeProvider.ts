import {StatusUpdateCallback, TimeProvider} from '@/service/api/TimeManager'

abstract class AbsctractTimeProvider implements TimeProvider {
  protected updateCallback: StatusUpdateCallback | null = null

  public onStatusUpdate(callback: StatusUpdateCallback): void {
    this.updateCallback = callback
  }

  public abstract getDailyTime(): Promise<number[]>

  protected setActive(active: boolean): void {
    if (this.updateCallback !== null) {
      this.updateCallback(active)
    }
  }
}

export default AbsctractTimeProvider
