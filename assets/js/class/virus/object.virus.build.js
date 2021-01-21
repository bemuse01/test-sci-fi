CLASS.object.virus.build = class{
    static scene = new THREE.Scene()
    static camera = null
    static element = null
    static composer = null

    constructor(param = {}){
        this.#init(param)
        this.#create()
        this.#render()
    }


    // init static
    static initStatic(app, param){
        this.initScene()
        this.initComposer(app, param)
    }
    static initScene(){
        this.element = document.querySelector('.ui-virus-object')

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

        const filmPass = new THREE.FilmPass(0, 0, 0, false)

        const bloomPass = new THREE.BloomPass(param.bloom)

        this.composer.addPass(renderScene)
        this.composer.addPass(bloomPass)
        this.composer.addPass(filmPass)
    }


    // init
    #init(param){
        this.group = {
            body: new THREE.Group(),
            light: new THREE.Group()
        }

        this.build = new THREE.Group()
        
        this.param = param
    }


    // render
    #render(){
        for(let i in this.group) this.build.add(this.group[i])

        CLASS.object.virus.build.scene.add(this.build)
    }


    // create
    #create(){
        this.#createBody()
    }
    // body
    #createBody(){
        new CLASS.object.virus.body(this.group.body, this.param)
    }


    // animate
    animate(){
        this.#rotateY()
        // this.#animateVirus()
    }
    #rotateY(){
        this.group.body.rotation.y += this.param.rotate * 2
    }
    #animateVirus(){
        const time = window.performance.now()
        this.group.body.children.forEach(_ => {
            _.geometry.vertices.forEach((e, i) => {
                const r = noise.noise4D(e.x / this.param.smooth, e.y / this.param.smooth, e.z / this.param.smooth, time * this.param.rd)
                const n = METHOD.object.util.normalize(r, 0.9, 1.1, 1, -1)
                e.x = _.origin[i].x * n
                e.y = _.origin[i].y * n
                e.z = _.origin[i].z * n
            })
            // console.log(_.origin[0].x === _.geometry.vertices[0].x)
            _.geometry.verticesNeedUpdate = true
        })
    }


    // event
    static resize(){
        const {width, height} = this.element.getBoundingClientRect()

        this.camera.aspect = width / height
        this.camera.updateProjectionMatrix()

        this.composer.setSize(width, height)
    }
}