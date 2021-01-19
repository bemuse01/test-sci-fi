PARAM.object.globe = class{
    static bloom = 3.0
    constructor(param = {}){
        this.radius = param.radius || 48
        this.spread = param.spread || {
            max: 4, 
            min: 2
        }
        this.points = param.points || 10
        this.size = param.size || 0.2
        // this.color = param.color || 0x438eff
        this.color = param.color || 0x5092ff
        this.opacity = param.opacity || 1.0
        this.map = param.map || 'assets/src/point.png'
        this.rotate = param.rotate || 0.002
        this.layers = param.layers || PROCESS
    }
}