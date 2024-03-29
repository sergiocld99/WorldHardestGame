export default class Match {
    deaths: number
    level: number
    levelCount: number

    constructor(deaths = 0, level = 1){
        this.deaths = deaths
        this.level = level
        this.levelCount = 1
    }
}