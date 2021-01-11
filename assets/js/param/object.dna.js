PARAM.object.dna.build = class{
    constructor(param = {}){
        this.time = param.time || {
            start: {
                bone: 950,
                nucleic: 950
            },
            transition: 300,
            duration: {
                bone: 500,
                nucleic: 500
            },
            easing: {
                bone: [0.250, 0.250, 0.750, 0.750],
                nucleic: [0.250, 0.250, 0.750, 0.750]
            }
        }
        this.count = param.count || 80
        this.gap = param.gap || 0.45
        this.dist = param.dist || 7
        this.deg = param.deg || 2
        this.size = param.size || 3.0
        this.opacity = param.opacity || 1.0
        this.color = param.color || {
            bone: 0xffffff,
            nucleic: 0x73eaff
        }
        this.rand = param.rand || {
            bone: 1.4,
            nucleic: 1.0
        }
        this.point = param.point || 30
        this.div = param.div || 12
        this.layers = param.layers || PROCESS
    }
}