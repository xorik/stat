interface ISettings {
    workingHours: number[],
    plan: number[],
}

interface IStat {
    dailyStat: Array<number | null>
    totalStat: number,
    diff: number
}

declare module 'fullscreen' {
  interface FullscreenObject {
    request: () => void
  }

  type Fullscreen = (el: Node) => FullscreenObject

  let fullscreen: Fullscreen

  export default fullscreen
}

declare module '@/../node_modules/nosleep.js/src/media' {
  let src: string

  export default src
}
