PARAM.object.ui.openLine = class{
    constructor(param = {}){
        this.size = param.size || 10
        this.point = param.point || 32
        this.color = param.color || 0x5dcdff
        this.opacity = param.opacity || 1.0
        this.time = param.time || {
            start: 400,
            transition: 900
        }
        this.move = param.move || 10
    }
}