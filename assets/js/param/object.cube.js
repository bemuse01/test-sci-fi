PARAM.object.cube = class{
    constructor(param = {}){
        this.size = param.size || 3
        this.gap = param.gap || 6
        this.row = param.row || 3
        this.color = param.color || 0xffffff
        this.opacity = param.opacity || {
            box: 0.15,
            wireframe: 0.75
        }
        this.layers = param.layers || NORMAL
    }
}