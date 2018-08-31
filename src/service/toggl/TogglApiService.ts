import axios, {AxiosInstance, AxiosPromise, AxiosResponse} from 'axios'
import {Moment} from 'moment'

const API_URL = '/toggl_api/'

export interface TimeEntry {
  id: number,
  start: string,
  duration: number
}

class TogglApiService {
  protected api: AxiosInstance

  constructor(token: string) {
    const auth = {
      username: token,
      password: 'api_token',
    }

    this.api = axios.create({
      baseURL: API_URL,
      auth,
    })
  }

  public getLastLog(): Promise<TimeEntry[]> {
    return this.api.get('time_entries')
      .then((response: AxiosResponse<TimeEntry[]>): TimeEntry[] => {
        return response.data
      })
  }
}

export default TogglApiService
