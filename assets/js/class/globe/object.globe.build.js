CLASS.object.globe.build = class{
    static scene = new THREE.Scene()
    static camera = null
    static element = null 
    static composer = null

    constructor(param = {}){
        this.#init(param)
        this.#create()
        this.#render()
    }
    
    static initScene(){
        this.element = document.querySelector('.ui-globe-object')

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

        this.composer.addPass(renderScene)
        this.composer.addPass(bloomPass)
        this.composer.addPass(filmPass)
    }


    // init
    #init(param){
        this.group = {
            points: new THREE.Group()
        }

        this.build = new THREE.Group()

        this.param = param
    }


    // render 
    #render(){
        for(let i in this.group) this.build.add(this.group[i])

        CLASS.object.globe.build.scene.add(this.build)
    }


    // create
    #create(){
        this.#createPoints()
    }
    // points
    #createPoints(){
        new CLASS.object.globe.points(this.group.points, this.param)
    }


    // animate
    animate(){
        this.#rotateY(this.param.rotate)
    }
    #rotateY(vel){
        this.build.rotation.y += vel
    }

    
    // event
    static resize(){
        const {width, height} = this.element.getBoundingClientRect()

        this.camera.aspect = width / height
        this.camera.updateProjectionMatrix()

        this.composer.setSize(width, height)
    }
}