CLASS.object.cube = class{
    constructor(app, param = {}){
        this.#create(param)
        this.#render(app)
    }

    
    // render
    #render(app){
        app.scene.add(this.group)
    }


    // create
    #create(param){
        this.#createMesh(param)
    }
    #createMesh(param){
        this.group = new THREE.Group()

        const position = METHOD.object.cube.createPosition(param)

        position.forEach(e => {
            const local = new THREE.Group()
            
            const geometry = this.#createGeometry(param)
            const material = this.#createMaterial(param)
            const mesh = new THREE.Mesh(geometry, material)

            const wireframe = new THREE.BoxHelper(mesh, param.color)
            wireframe.material.transparent = true
            wireframe.material.opacity = param.opacity.wireframe

            mesh.layers.set(param.layers)
            wireframe.layers.set(param.layers)

            local.add(mesh)
            local.add(wireframe)

            local.position.set(e.x, e.y, e.z)

            this.group.add(local)
        })
        this.group.position.x = -60
    }
    #createGeometry(param){
        const geometry = new THREE.BoxGeometry(param.size, param.size, param.size)
        return geometry
    }
    #createMaterial(param){
        const material = new THREE.MeshBasicMaterial({
            color: param.color,
            transparent: true,
            opacity: param.opacity.box
        })
        return material
    }


    // animate
    animate(){
        this.#rotate(0.005)
    }
    #rotate(vel){
        this.group.rotation.x += vel
        this.group.rotation.y += vel
    }
}