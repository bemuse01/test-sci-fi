CLASS.object.app = class{
    constructor(canvas, app){
        this.#init(canvas, app)
        this.#postprocess(app)
        this.app = app
    }

    #init(canvas, app){
        app.scene = new THREE.Scene()
    
        app.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true, canvas: canvas})
        app.renderer.setSize(PARAM.util.width, PARAM.util.height)
        app.renderer.setPixelRatio(PARAM.util.ratio)
        app.renderer.setClearColor(0x000000)
        app.renderer.setClearAlpha(0.0)

        app.camera = new THREE.PerspectiveCamera(app.fov, PARAM.util.width / PARAM.util.height, app.near, app.far)
        app.camera.position.z = app.cameraPos
        app.scene.add(app.camera)
    }

    #postprocess(app){
        // app.target.process = new THREE.WebGLRenderTarget(PARAM.util.width, PARAM.util.height)

        // const renderScene = new THREE.RenderPass(app.scene, app.camera)
        const renderScene = new THREE.RenderPass(new THREE.Scene(), new THREE.PerspectiveCamera())

        const copyShader = new THREE.ShaderPass(THREE.CopyShader)
        copyShader.renderToScreen = true

        const filmPass = new THREE.FilmPass(0, 0, 0, false)

        const bloomPass = new THREE.BloomPass(app.bloom)

        this.effectFXAA = new THREE.ShaderPass(THREE.FXAAShader)

        // app.composer = new THREE.EffectComposer(app.renderer, app.target.process)
        app.composer = new THREE.EffectComposer(app.renderer)
        app.composer.addPass(renderScene)
        app.composer.addPass(bloomPass)
        app.composer.addPass(filmPass)
        app.composer.addPass(this.effectFXAA)
    }

    render(){
        this.app.renderer.setScissorTest(false)
        this.app.renderer.clear()
        this.app.renderer.setScissorTest(true)

        for(let i in CLASS.object){
            if(i === 'app') continue
            const {scene, camera, element, composer} = CLASS.object[i].build

            const {left, top, width, height} = element.getBoundingClientRect()

            camera.aspect = width / height
            camera.updateProjectionMatrix()

            this.app.renderer.setViewport(left, top, width, height)
            this.app.renderer.setScissor(left, top, width, height)

            if(composer !== null || composer !== undefined) {
                this.app.renderer.autoClear = false
                this.app.renderer.clear()

                camera.layers.set(PROCESS)
                composer.render()

                this.app.renderer.clearDepth()
                camera.layers.set(NORMAL)
                this.app.renderer.render(scene, camera)
            }else{
                camera.layers.set(NORMAL)
                this.app.renderer.render(scene, camera)
            }
        }
    }

    resize(){
        this.app.renderer.setSize(PARAM.util.width, PARAM.util.height)
    }

    getApp(){
        return this.app
    }
}