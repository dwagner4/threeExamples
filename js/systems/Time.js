

export default class Time 
{
  constructor() 
  {
    
    // SetUp
    this.start = Date.now()
    this.current = this.start
    this.elapsedTime = 0
    this.delta = 16
  }

  tick()
  {
    const currentTime = Date.now()
    this.delta = currentTime - this.current
    this.current = currentTime
    this.elapsed = this.current - this.start
  }
}