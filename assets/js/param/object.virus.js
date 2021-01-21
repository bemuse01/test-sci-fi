PARAM.object.virus = class{
    static bloom = 2.5
    constructor(param = {}){
        this.radius = param.radius || 30
        this.seg = param.seg || 64
        this.color = param.color || 0x649bff
        this.opacity = param.opacity || 1.0
        this.smooth = param.smooth || 10
        this.rd = param.rd || 0.001
        this.rotate = param.rotate || 0.002
        this.layers = param.layers || PROCESS
    }
}