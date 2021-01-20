PARAM.object.dna = class{
    static bloom = 1.25
    constructor(param = {}){
        this.time = param.time || {
            easing: {
                bone: [0.645, 0.045, 0.355, 1.000],
                nucleic: [0.250, 0.250, 0.750, 0.750]
            },
            start: {
                bone: 950,
                nucleic: 950
            },
            transition: 300,
            duration: {
                bone: 500,
                nucleic: 500
            }
        }
        this.count = param.count || 80
        this.gap = param.gap || 0.6
        this.dist = param.dist || 9
        this.deg = param.deg || 2
        this.size = param.size || 2.8
        this.opacity = param.opacity || 1.0
        this.color = param.color || {
            bone: 0xffffff,
            nucleic: 0x73eaff
        }
        this.rand = param.rand || {
            bone: 2.1,
            nucleic: 1.5
        }
        this.point = param.point || 30
        this.div = param.div || 12
        this.layers = param.layers || PROCESS
    }
}