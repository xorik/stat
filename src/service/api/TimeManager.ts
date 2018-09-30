export type StatusUpdateCallback = (active: boolean) => void

export interface TimeProvider {
  onStatusUpdate: (callback: StatusUpdateCallback) => void
  getDailyTime: () => Promise<number[]>
}

interface ProviderInfo {
  provider: TimeProvider,
  active: boolean,
  dailyStat: number[]
}

class TimeManager {
  protected providers: ProviderInfo[] = []

  public addProvider(provider: TimeProvider): void {

    const info = {
      provider,
      active: false,
      dailyStat: Array(7).fill(0),
    }

    this.providers.push(info)
    this.updateProvider(info)
    provider.onStatusUpdate(((active: boolean): void => {
      this.onStatusUpdate(provider, active)
    }))
  }

  public getStat(): Promise<number[]> {
    const stat = new Array(7).fill(0)

    return this.updateActive()
      .then((): number[] => {

        // Sum time for each provider
        for (const p of this.providers) {
          for (let i = 0; i < 7; i++) {
            stat[i] += p.dailyStat[i]
          }
        }

        return stat
      })
  }

  protected onStatusUpdate(provider: TimeProvider, active: boolean): void {
    const info = this.providers.find((x: ProviderInfo) => x.provider === provider)

    if (info !== undefined) {
      info.active = active
    }
  }

  protected updateActive(): Promise<void> {
    const updatePromises: Array<Promise<void>> = []

    // Update active providers
    for (const info of this.providers) {
      if (info.active) {
        updatePromises.push(this.updateProvider(info))
      }
    }

    // Nothing to update
    if (updatePromises.length === 0) {
      return Promise.resolve()
    }

    return Promise.all(updatePromises)
      .then(() => {
        // void
      })
  }

  protected updateProvider(info: ProviderInfo): Promise<void> {
    return info.provider.getDailyTime()
      .then((stat: number[]): void => {
        info.dailyStat = stat
      })
  }
}

export default TimeManager
