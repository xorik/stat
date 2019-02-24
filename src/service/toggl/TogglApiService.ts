import axios, {AxiosInstance, AxiosResponse} from 'axios'
import {TimeEntry} from '@/service/toggl/TogglWebsocketService'

const API_URL = 'https://toggl.com/api/v8/'

interface CurrentApiResponse {
  data: TimeEntry|null
}

class TogglApiService {
  protected api: AxiosInstance

  constructor(token: string) {
    const auth = {
      username: token,
      password: 'api_token',
    }

    this.api = axios.create({
      auth,
      baseURL: API_URL,
    })
  }

  public async getLastLog(): Promise<TimeEntry[]> {
    const response: AxiosResponse<TimeEntry[]> = await this.api.get('time_entries')

    return response.data
  }

  public async getCurrent(): Promise<TimeEntry|null> {
    const response: AxiosResponse<CurrentApiResponse> = await this.api.get('time_entries/current')

    return response.data.data
  }
}

export default TogglApiService
