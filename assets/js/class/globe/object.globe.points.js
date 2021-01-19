CLASS.object.globe.points = class{
    constructor(group, param = {}){
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
        const geometry = new THREE.Geometry()
        DATA.grid.forEach(_ => {
            const {lat, lon} = _
        
            for(let i = 0; i < param.points; i++){
                const sprX = Math.random() * param.spread.max - param.spread.min
                const sprY = Math.random() * param.spread.max - param.spread.min
                const pos = METHOD.object.util.toSphereCoordinates(lat + sprX, lon + sprY, param.radius)
                geometry.vertices.push(new THREE.Vector3(-pos.x, -pos.y, -pos.z))
            }
        })
        return geometry
    }

    #createMaterial(param){
        const map = new THREE.TextureLoader().load(param.map)

        const material = new THREE.PointsMaterial({
            color: param.color,
            transparent: true,
            opacity: param.opacity,
            size: param.size,
            map: map,
            blending: THREE.AdditiveBlending
        })
        return material
    }
}