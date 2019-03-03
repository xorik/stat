import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import TimeCalc, { WeeklyStat } from '@/service/TimeCalc'
import TogglStatCalculator from '@/service/toggl/TogglStatCalculator'
import SettingsService, { Settings } from '@/service/SettingsService'

@Module({name: 'AppModule'})
export default class AppModule extends VuexModule {
  public settings: Settings = SettingsService.get()

  public stat: WeeklyStat = {
    days: [],
    plannedByNow: 0,
  }

  @Mutation
  public setSettings(settings: Settings): void {
    this.settings = settings
  }

  @Mutation
  public updateStat(): void {
    const togglStat = TogglStatCalculator.calcStat()
    this.stat = TimeCalc.getProgress(this.settings.plan, togglStat, this.settings.workingHours)
  }

  @Action
  public updateSettings(settings: Settings): void {
    SettingsService.save(settings)
    this.context.commit('setSettings', settings)
    this.context.commit('updateStat')
  }
}
