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
        this.mesh.bone.rotation.x = 90 * PARAM.util.radian
        this.mesh.nucleic.rotation.x = 90 * PARAM.util.radian
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
        const material = {
            bone: new THREE.PointsMaterial({
                color: param.color.bone,
                transparent: true,
                opacity: param.opacity,
                size: param.size
            }),
            nucleic: new THREE.PointsMaterial({
                color: param.color.nucleic,
                transparent: true,
                opacity: param.opacity,
                size: param.size
            })
        }
        return material
    }

    rotationY(vel){
        this.group.rotation.y += vel
    }
}