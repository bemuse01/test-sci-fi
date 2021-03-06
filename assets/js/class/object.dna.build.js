CLASS.object.dna.build = class{
    constructor(app, param = {}){
        this.build = new THREE.Group()
        
        this.group = {
            bone: new THREE.Group(),
            nucleic: new THREE.Group()
        }

        this.opacity = this.#createOpacityArray(param)

        this.#create(param)
        this.#render(app)
        this.#createTween(param)
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

        direction.forEach(e => new CLASS.object.dna.bone(this.group.bone, param, e, this.opacity))
    }

    #createNucleic(param){
        const direction = ['bottom', 'top']

        direction.forEach(e => new CLASS.object.dna.nucleic(this.group.nucleic, param, e, this.opacity))
    }

    #createOpacityArray(param){
        const opacity = {
            bone: [],
            nucleic: []
        }
        for(let i = 0; i < param.count; i++) opacity.bone[i] = 0
        for(let i = 0; i < param.count / param.div; i++) for(let j = 0; j < param.point; j++){
            const index = j + i * param.point
            opacity.nucleic[index] = 0
        }
        return {bone: new Float32Array(opacity.bone), nucleic: new Float32Array(opacity.nucleic)}
    }

    #createTween(param){
        for(let o in this.opacity){
            const easing = BezierEasing(...param.time.easing[o])
            const time = 1 / this.opacity[o].length
            console.log(time, this.opacity[o].length)
            for(let i = 0; i < this.opacity[o].length; i++){
                const bezier = easing(i * time)
                const start = {opacity: 0}, end = {opacity: param.opacity}
                const tw = new TWEEN.Tween(start)
                .to(end, param.time.transition)
                .onUpdate(() => this.#updateTween(this.opacity[o], i, start))
                .delay(param.time.start[o] + param.time.duration[o] * bezier)
                .start()
            }
        }
    }

    #updateTween(e, i, start){
        e[i] = start.opacity
    }

    #updateOpacity(){
        for(let i in this.group){
            this.group[i].children.forEach(e => {
                e.geometry.attributes.opacity.needsUpdate = true
            })
        }
    }

    rotationY(vel){
        this.build.rotation.y += vel
        this.#updateOpacity()
    }
}