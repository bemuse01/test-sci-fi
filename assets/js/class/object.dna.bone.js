CLASS.object.dna.bone = class{
    constructor(group, param, direction){
        this.#create(param, direction)
        this.#add(group)
    }

    #add(group){
        group.add(this.mesh)
    }

    #create(param, direction){
        this.#createMesh(param, direction)
    }

    #createMesh(param, direction){
        const geometry = this.#createGeometry(param, direction)
        const material = this.#createMaterial(param)
        this.mesh = new THREE.Points(geometry, material)
        this.mesh.rotation.x = 90 * PARAM.util.radian
        this.mesh.layers.set(param.layers)
    }

    #createGeometry(param, direction){
        const geometry = new THREE.BufferGeometry()

        this.attr = {
            position: null
        }

        METHOD.object.createDnaBone(param, direction, this.attr)

        geometry.setAttribute('position', new THREE.BufferAttribute(this.attr.position, 3))
        // geometry.setAttribute('opacity', new THREE.BufferAttribute(this.attr.opacity, 1))

        return geometry
    }

    #createMaterial(param){
        const material = new THREE.PointsMaterial({
            color: param.color,
            transparent: true,
            opacity: param.opacity,
            size: param.size
        })
        return material
    }
}