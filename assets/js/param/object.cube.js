PARAM.object.cube = class{
    constructor(param = {}){
        this.size = param.size || 5
        this.gap = param.gap || 15
        this.row = param.row || 4
        this.color = param.color || 0xffffff
        this.opacity = param.opacity || {
            box: 0.15,
            wireframe: 0.75
        }
        this.layers = param.layers || NORMAL
    }
}