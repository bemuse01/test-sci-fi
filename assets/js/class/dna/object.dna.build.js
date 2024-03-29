CLASS.object.dna.build = class{
    static scene = new THREE.Scene()
    static camera = null
    static element = null
    static composer = null
    static fxaa = null
    
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


    static initStatic(app = {}, param = {}){
        this.initScene()
        this.initComposer(app, param)
    }

    static initScene(){
        this.element = document.querySelector('.ui-dna-object')

        const {width, height} = this.element.getBoundingClientRect()

        const camera = new PARAM.object.app()
        this.camera = new THREE.PerspectiveCamera(camera.fov, width / height, camera.near, camera.far)
        this.camera.position.z = camera.cameraPos
    }

    static initComposer(app, param){
        const {width, height} = this.element.getBoundingClientRect()
        
        this.composer = new THREE.EffectComposer(app.renderer)
        this.composer.setSize(width, height)

        const renderScene = new THREE.RenderPass(this.scene, this.camera)

        const copyShader = new THREE.ShaderPass(THREE.CopyShader)
        copyShader.renderToScreen = true

        const filmPass = new THREE.FilmPass(0, 0, 0, false)

        const bloomPass = new THREE.BloomPass(param.bloom)

        this.fxaa = new THREE.ShaderPass(THREE.FXAAShader)
        this.fxaa.uniforms['resolution'].value.set(1 / width, 1 / height)

        this.composer.addPass(renderScene)
        this.composer.addPass(bloomPass)
        this.composer.addPass(filmPass)
        this.composer.addPass(this.fxaa)
    }


    // render
    #render(app){
        for(let i in this.group) this.build.add(this.group[i])
        
        CLASS.object.dna.build.scene.add(this.build)
        // app.scene.add(this.build)
    }


    // create
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


    // tween
    #createTween(param){
        for(let o in this.opacity){
            const easing = BezierEasing(...param.time.easing[o])
            const time = 1 / this.opacity[o].length
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


    // animate
    animate(){
        this.#rotationY(0.02)
        this.#updateOpacity()
    }
    #rotationY(vel){
        this.build.rotation.y += vel
    }


    // event
    static resize(){
        const {width, height} = this.element.getBoundingClientRect()

        this.camera.aspect = width / height
        this.camera.updateProjectionMatrix()
        
        this.fxaa.uniforms['resolution'].value.set(1 / width, 1 / height)
        this.composer.setSize(width, height)
    }
}