CLASS.object.app = class{
    constructor(canvas, app){
        this.#init(canvas, app)
        this.#postprocess(app)
    }

    #init(canvas, app){
        app.scene = new THREE.Scene()
    
        app.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true, canvas: canvas})
        app.renderer.setSize(PARAM.util.width, PARAM.util.height)
        app.renderer.setPixelRatio(PARAM.util.ratio)
        app.renderer.setClearColor(0x000000)
        app.renderer.setClearAlpha(0.0)

        app.camera = new THREE.PerspectiveCamera(60, PARAM.util.width / PARAM.util.height, 0.1, 10000)
        app.camera.position.z = 100
        app.scene.add(app.camera)
    }

    #postprocess(app){
        // app.target.process = new THREE.WebGLRenderTarget(PARAM.util.width, PARAM.util.height)

        const renderScene = new THREE.RenderPass(app.scene, app.camera)

        const copyShader = new THREE.ShaderPass(THREE.CopyShader)
        copyShader.renderToScreen = true

        const filmPass = new THREE.FilmPass(0, 0, 0, false)

        const bloomPass = new THREE.BloomPass(app.bloom)

        this.effectFXAA = new THREE.ShaderPass(THREE.FXAAShader)
        this.effectFXAA.uniforms['resolution'].value.set(1 / PARAM.util.width, 1 / PARAM.util.height)

        // app.composer = new THREE.EffectComposer(app.renderer, app.target.process)
        app.composer = new THREE.EffectComposer(app.renderer)
        app.composer.setSize(PARAM.util.width, PARAM.util.height)
        app.composer.addPass(renderScene)
        app.composer.addPass(bloomPass)
        app.composer.addPass(filmPass)
        app.composer.addPass(this.effectFXAA)
    }

    render(app){
        // app.camera.lookAt(app.scene.position)
        // app.renderer.render(app.scene, app.camera)
        
        app.renderer.autoClear = false
        app.renderer.clear()

        app.camera.layers.set(PROCESS)
        app.composer.render()
        
        app.renderer.clearDepth()
        app.camera.layers.set(NORMAL)
        app.renderer.render(app.scene, app.camera)
    }

    resize(app){
        app.camera.aspect = PARAM.util.width / PARAM.util.height
        app.camera.updateProjectionMatrix()
    
        app.renderer.setSize(PARAM.util.width, PARAM.util.height)

        this.effectFXAA.uniforms['resolution'].value.set(1 / PARAM.util.width, 1 / PARAM.util.height)
    }
}