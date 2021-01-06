CLASS.object.dna = class{
    constructor(app, param){
        this.#create(param)
        this.#render(app)
    }

    #render(app){
        this.group = new THREE.Group()
        this.group.add(this.mesh.bone)
        this.group.add(this.mesh.nucleic)
        
        app.scene.add(this.group)
    }

    #create(param){
        this.#createMesh(param)
    }

    #createMesh(param){
        const geometry = this.#createGeometry(param)
        const material = this.#createMaterial(param)
        this.mesh = {
            bone: new THREE.Points(geometry.bone, material.bone),
            nucleic: new THREE.Points(geometry.nucleic, material.nucleic)
        }
        
        for(let i in this.mesh){
            this.mesh[i].rotation.x = 90 * PARAM.util.radian
            this.mesh[i].layers.set(param.layers)
        }
    }

    #createGeometry(param){
        const geometry = {
            bone: new THREE.Geometry(),
            nucleic: new THREE.Geometry()
        }

        this.#createBoneGeometry(geometry.bone, param)
        this.#createNucleicGeometry(geometry, param)

        return geometry        
    }

    #createBoneGeometry(geometry, param){
        METHOD.object.createDnaBone(geometry, param, 'bottom-normal')
        METHOD.object.createDnaBone(geometry, param, 'bottom-reverse')
        METHOD.object.createDnaBone(geometry, param, 'top-normal')
        METHOD.object.createDnaBone(geometry, param, 'top-reverse')
    }

    #createNucleicGeometry(geometry, param){
        METHOD.object.createDnaNucleic(geometry.bone, geometry.nucleic, param, 'bottom')
        METHOD.object.createDnaNucleic(geometry.bone, geometry.nucleic, param, 'top')
    }

    #createMaterial(param){
        const map = new THREE.TextureLoader().load(param.map)
        const material = {
            bone: new THREE.PointsMaterial({
                color: param.color.bone,
                transparent: true,
                opacity: param.opacity,
                size: param.size,
                // map: map,
                blending: THREE.AdditiveBlending
            }),
            nucleic: new THREE.PointsMaterial({
                color: param.color.nucleic,
                transparent: true,
                opacity: param.opacity,
                size: param.size,
                // map: map,
                blending: THREE.AdditiveBlending
            })
        }
        return material
    }

    rotationY(vel){
        this.group.rotation.y += vel
    }
}