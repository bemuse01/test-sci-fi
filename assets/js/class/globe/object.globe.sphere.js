CLASS.object.globe.sphere = class{
    constructor(group, param = {}){
        this.#create(param)
        this.#add(group)
    }

    #add(group){
        for(let i in this.mesh) group.add(this.mesh[i])
    }

    #create(param){
        this.#createMesh(param)
    }

    #createMesh(param){
        const geometry = this.#createGeometry(param)
        const {inner, outer} = this.#createMaterial(param)
        this.mesh = {
            inner: new THREE.Mesh(geometry, inner),
            outer: new THREE.Mesh(geometry, outer)
        }
        this.mesh.outer.scale.set(1.31, 1.31, 1.31)
        for(let i in this.mesh) this.mesh[i].layers.set(param.layers.sphere)
    }

    #createGeometry(param){
        const geometry = new THREE.SphereGeometry(param.radius, param.seg, param.seg)
        return geometry
    }

    #createMaterial(param){
        const material = {
            inner: new THREE.ShaderMaterial({
                vertexShader: SHADER.globe.inner.vertex,
                fragmentShader: SHADER.globe.inner.fragment,
                transparent: true,
                uniforms: {
                    color: {value: new THREE.Color(param.color)}
                },
                // blending: THREE.AdditiveBlending
            }),
            outer: new THREE.ShaderMaterial({
                vertexShader: SHADER.globe.outer.vertex,
                fragmentShader: SHADER.globe.outer.fragment,
                transparent: true,
                uniforms: {
                    color: {value: new THREE.Color(param.color)}
                },
                side: THREE.BackSide,
                blending: THREE.AdditiveBlending
            })
        }
        return material
    }
}