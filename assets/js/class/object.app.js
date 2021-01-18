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
        // app.camera.lookAt(app.scene.position)
        // app.renderer.render(app.scene, app.camera)
        
        // this.app.renderer.autoClear = false
        // this.app.renderer.clear()

        // this.app.camera.layers.set(PROCESS)
        // this.app.composer.render()
        
        // this.app.renderer.clearDepth()
        // this.app.camera.layers.set(NORMAL)
        // this.app.renderer.render(this.app.scene, this.app.camera)

        // renders.forEach(e => {
        //     this.app.renderer.autoClear = false
        //     this.app.renderer.clear()

        //     e.camera.layers.set(PROCESS)
        //     this.app.composer.passes[0].scene = e.scene
        //     this.app.composer.passes[0].camera = e.camera
        //     this.app.composer.render()
            
        //     this.app.renderer.clearDepth()
        //     e.camera.layers.set(NORMAL)
        //     this.app.renderer.render(e.scene, e.camera)
        // })
        // console.log(CLASS.object)

        this.app.renderer.setScissorTest(false)
        this.app.renderer.clear()
        this.app.renderer.setScissorTest(true)

        for(let i in CLASS.object){
            if(i === 'app') continue
            const {scene, camera, element} = CLASS.object[i].build

            const {left, right, top, bottom, width, height} = element.getBoundingClientRect()
            // const width = rect.right - rect.left
            // const height = rect.bottom - rect.top
            // const left = rect.left
            // const bottom = this.app.renderer.domElement.clientHeight - rect.bottom

            camera.aspect = width / height
            camera.updateProjectionMatrix()

            this.app.renderer.setViewport(left, top, width, height)
            this.app.renderer.setScissor(left, top, width, height)

            this.app.renderer.autoClear = false
            this.app.renderer.clear()

            camera.layers.set(PROCESS)
            this.app.composer.passes[0].scene = scene
            this.app.composer.passes[0].camera = camera
            this.app.composer.setSize(width, height)
            this.effectFXAA.uniforms['resolution'].value.set(1 / width, 1 / height)
            this.app.composer.render()
            
            this.app.renderer.clearDepth()
            camera.layers.set(NORMAL)
            this.app.renderer.render(scene, camera)
        }
    }

    resize(){
        // this.app.camera.aspect = PARAM.util.width / PARAM.util.height
        // this.app.camera.updateProjectionMatrix()
    
        this.app.renderer.setSize(PARAM.util.width, PARAM.util.height)
        // this.app.composer.setSize(PARAM.util.width, PARAM.util.height)

    }

    getApp(){
        return this.app
    }
}