CLASS.object.ui.openLine = class{
    constructor(group, param){
        this.#create(param)
        this.#add(group)
        this.#createTween(param)
    }

    #add(group){
        group.add(this.mesh)
    }

    #create(param){
        this.#createMesh(param)
    }

    #createMesh(param){
        const geometry = this.#createGeometry(param)
        const material = this.#createMaterial(param)
        this.mesh = new THREE.Line(geometry, material)
        this.mesh.layers.set(param.layers)
    }

    #createGeometry(param){
        const position = []

        for(let i = 0; i <= param.point; i++){
            const gap = param.size / param.point
            position[i] = new THREE.Vector3(gap * i - param.size / 2, 0, 0)
            // position[i * 3] = gap * i - param.size / 2
            // position[i * 3 + 1] = 0
            // position[i * 3 + 2] = 0
        }
        console.log(position)
        const geometry = new THREE.BufferGeometry().setFromPoints(position)

        // geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(position, 3)))

        return geometry
    }

    #createMaterial(param){
        const material = new THREE.LineBasicMaterial({
            color: param.color,
            transparent: true,
            opacity: param.opacity
        })
        return material
    }

    #createTween(param){
        const start = {move: 0}, end = {move: param.move}
        const tw = new TWEEN.Tween(start)
        .to(end, param.time.transition)
        .easing(param.easing)
        .onUpdate(() => this.#updateTween(start))
        .delay(param.time.start)
        .start()
    }

    #updateTween(start){
        this.mesh.position.y = start.move
    }
}