import axios, {AxiosInstance, AxiosResponse} from 'axios'

const API_URL = 'https://toggl.com/api/v8/'

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
