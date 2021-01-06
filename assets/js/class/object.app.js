CLASS.object.app = class{
    constructor(canvas, app){
        this.#init(canvas, app)
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

    render(app){
        app.camera.lookAt(app.scene.position)
        app.renderer.render(app.scene, app.camera)
    }

    resize(app){
        app.camera.aspect = PARAM.util.width / PARAM.util.height
        app.camera.updateProjectionMatrix()
    
        app.renderer.setSize(PARAM.util.width, PARAM.util.height)
    }
}