PARAM.element.ui.dna = class{
    constructor(param = {}){
        this.openLine = param.openLine || {
            dist: 50
        }
        this.edge = param.edge || {
            delay: 0.15
        }
        this.searching = param.searching || {
            smooth: 1 / 100,
            velocity: 0.00035,
            range: {
                min: 0.2,
                max: 0.8
            }
        }
    }
}