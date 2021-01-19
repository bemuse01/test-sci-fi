CLASS.object.globe.build = class{
    static scene = new THREE.Scene()
    static camera = null
    static element = null 

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
}