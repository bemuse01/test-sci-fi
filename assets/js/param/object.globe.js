PARAM.object.globe = class{
    static bloom = 5.0
    constructor(param = {}){
        this.radius = param.radius || 45
        this.spread = param.spread || {
            max: 4, 
            min: 2
        }
        this.points = param.points || 10
        this.size = param.size || 0.35
        // this.color = param.color || 0x438eff
        // this.color = param.color || 0x0072ff
        // this.color = param.color || 0x64e0ff
        // this.color = param.color || 0x64adff
        this.color = param.color || 0x649bff
        this.opacity = param.opacity || 1.0
        this.map = param.map || 'assets/src/point.png'
        this.rotate = param.rotate || 0.004
        this.seg = param.seg || 64
        this.layers = param.layers || {
            points: NORMAL,
            sphere: NORMAL
        }
    }
}