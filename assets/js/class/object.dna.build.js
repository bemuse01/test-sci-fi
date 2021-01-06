CLASS.object.dna.build = class{
    constructor(app, param){
        this.build = new THREE.Group()
        this.group = {
            bone: new THREE.Group(),
            nucleic: new THREE.Group()
        }

        this.opacity = null

        this.#create(param)
        this.#render(app)
    }

    #render(app){
        for(let i in this.group) this.build.add(this.group[i])
        
        app.scene.add(this.build)
    }

    #create(param){
        this.#createBone(param)
        this.#createNucleic(param)
    }

    #createBone(param){
        const direction  = ['bottom-normal', 'bottom-reverse', 'top-normal', 'top-reverse']

        direction.forEach(e => new CLASS.object.dna.bone(this.group.bone, param, e))
    }

    #createNucleic(param){
        const direction = ['bottom', 'top']

        direction.forEach(e => new CLASS.object.dna.nucleic(this.group.nucleic, param, e))
    }

    rotationY(vel){
        this.build.rotation.y += vel
    }
}