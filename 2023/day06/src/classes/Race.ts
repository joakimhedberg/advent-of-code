export default class Race {
  public time: number
  public distance: number
  public recordPushingTimes: number[] = []
  constructor(time: number, distance: number) {
    this.time = time
    this.distance = distance
  }

  public getDistancePerPush(pushTime: number): number {
    const timeLeft = this.time - pushTime
    return (timeLeft * pushTime)
  }
}