CLASS.object.ui.dna = class{
    constructor(app){
        this.build = new THREE.Group()

        this.group = {
            openLine: new THREE.Group()
        }

        this.param = {
            openLine: {
                size: 32,
                move: 42
            }
        }

        this.#create()
        this.#render(app)
    }

    #render(app){
        for(let i in this.group) this.build.add(this.group[i])
        
        app.scene.add(this.build)
    }

    #create(){
        this.#createOpenLine()
    }

    #createOpenLine(){
        const name = 'openLine'
        for(let i = 0; i < 2; i++) {
            this.param[name].move *= i === 0 ? 1 : -1
            new CLASS.object.ui[name](this.group[name], new PARAM.object.ui[name](this.param[name]))
        }
    }
}