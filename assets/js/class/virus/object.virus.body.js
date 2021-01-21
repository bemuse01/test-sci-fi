CLASS.object.virus.body = class{
    constructor(group, param){
        this.#create(param)
        this.#add(group)
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
        this.mesh = new THREE.Points(geometry, material)
        this.mesh.layers.set(param.layers)

        
    }

    #createGeometry(param){
        // const geometry = new THREE.SphereGeometry(param.radius, param.seg, param.seg)
        const sample = new THREE.SphereGeometry(param.radius, param.seg, param.seg)
        const geometry = new THREE.Geometry()
        
        sample.vertices.forEach((e, i) => {
            const r = noise.noise3D(e.x / param.smooth, e.y / param.smooth, e.z / param.smooth, i)
            const n = METHOD.object.util.normalize(r, 0.75, 1.25, 1, -1)
            e.x *= n
            e.y *= n
            e.z *= n
        })

        sample.vertices.forEach(e => {
            for(let i = 0; i < 2; i++){
                const x = e.x + Math.random() * 2 - 1
                const y = e.y + Math.random() * 2 - 1
                const z = e.z + Math.random() * 2 - 1
                geometry.vertices.push(new THREE.Vector3(x, y, z))
            }
        })

        return geometry
    }

    #createMaterial(param){
        // const material = new THREE.MeshBasicMaterial({
        //     color: param.color,
        //     transparent: true,
        //     opacity: param.opacity,
        //     wireframe: true
        // })
        const material = new THREE.PointsMaterial({
            color: param.color,
            transparent: true,
            opacity: param.opacity,
            size: 0.2
        })
        return material
    }
}