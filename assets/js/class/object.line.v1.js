CLASS.object.line = class{
    constructor(app, param){
        this.#create(app, param)
        this.#render(app)
    }

    #render(app){
        app.scene.add(this.group)
    }

    #create(app, param){
        this.#createMesh(app, param)
    }

    #createMesh(app, param){
        const vw = METHOD.object.getVisibleWidth(app.camera, 0)
        const hgap = vw / param.count

        const group = new THREE.Group()

        this.opacity = []

        for(let i = 0; i < param.count + 1; i++){
            const geometry = this.#createGeometry(app, param)
            const material = this.#createMaterial(param)
            const mesh = new THREE.Line(geometry, material)
            mesh.position.set(-vw / 2 + i * hgap, 0, 0)
            mesh.animate = false
            mesh.idx = 0
            group.add(mesh)
        }

        this.group = group
    }

    #createGeometry(app, param){
        const vh = METHOD.object.getVisibleHeight(app.camera, 0)
        const vgap = vh / param.point

        const geometry = new THREE.BufferGeometry()
        const positionsList = []
        const opacityList = []
        
        for(let i = 0; i < param.point + 1; i++){
            positionsList[i * 3] = 0
            positionsList[i * 3 + 1] = -vh / 2 + i * vgap
            positionsList[i * 3 + 2] = 0

            opacityList[i] = param.opacity
        }

        const positions = new Float32Array(positionsList)
        const opacity = new Float32Array(opacityList)
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        geometry.setAttribute('opacity', new THREE.BufferAttribute(opacity, 1))
        
        this.opacity.push(opacity)
        
        return geometry
    }

    #createMaterial(param){
        // const material = new THREE.LineBasicMaterial({
        //     color: param.color,
        //     transparent: true,
        //     opacity: param.opacity
        // })
        const material = new THREE.ShaderMaterial({
            vertexShader: SHADER.line.vertex,
            fragmentShader: SHADER.line.fragment,
            transparent: true,
            uniforms: {
                color: {
                    value: new THREE.Color(param.color)
                }
            }
        })
        return material
    }

    resize(app, param){
        console.log('work')
        // this.#resizePoints(app, param)
        this.#resizeGap(app, param)
    }

    #resizePoints(app, param){
        const vh = METHOD.object.getVisibleHeight(app.camera, 0)
        const vgap = vh / param.point

        for(let i = 0; i < this.positions.length / 3; i++){
            this.positions[i * 3 + 1] = -vh / 2 + i * vgap
        }
    }

    #resizeGap(app, param){
        const vw = METHOD.object.getVisibleWidth(app.camera, 0)
        const hgap = vw / param.count

        this.group.children.forEach((e, i) => {
            e.position.set(-vw / 2 + i * hgap, 0, 0)
        })
    }

    update(param){
        this.#animate(param)
        this.#updateOpacity(param)
    }

    #animate(param){
        this.group.children.forEach(e => {
            if(param.chance < Math.random() && e.animate === false) e.animate = true
        })
    }

    #updateOpacity(param){
        this.opacity.forEach((e, i) => {
            if(this.group.children[i].animate === true){
                for(let j = 0; j < e.length; j++) e[j] = param.opacity
                e[this.group.children[i].idx++] = 1.0

                if(this.group.children[i].idx >= e.length){
                    this.group.children[i].idx = 0
                    this.group.children[i].animate = false
                    for(let j = 0; j < e.length; j++) e[j] = param.opacity
                }

                this.group.children[i].geometry.attributes.opacity.needsUpdate = true
            }
        })
    }
}