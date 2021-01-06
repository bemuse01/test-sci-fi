METHOD.object = {
    normalize(x, range, max, min){
        return 2 * range * ((x - min) / (max - min)) - range
    },
    getVisibleHeight(camera, depth){
        const cameraOffset = camera.position.z
        if(depth < cameraOffset) depth -= cameraOffset
        else depth += cameraOffset
        const vFov = camera.fov * PARAM.util.radian
        return 2 * Math.tan(vFov / 2) * Math.abs(depth)
    },
    getVisibleWidth(camera, depth){
        const height = this.getVisibleHeight(camera, depth)
        return height * camera.aspect
    },
    createDnaBone(geometry, param, direction){
        let tb = 1, dir = 1, degree = 0

        switch(direction){
            case 'bottom-normal':
                tb = 1
                dir = 1
                break
            case 'bottom-reverse':
                tb = 1
                dir = -1
                degree = 180
                break
            case 'top-normal':
                tb = -1
                dir = 1
                break
            case 'top-reverse':
                tb = -1
                dir = -1
                degree = 180
                break
        }

        for(let i = 0; i < param.count; i++){
            // const rand = {
            //     x: Math.random() * (1 - param.rand) + param.rand,
            //     y: Math.random() * (1 - param.rand) + param.rand,
            //     z: Math.random() * (1 - param.rand) + param.rand
            // }
            const rand = {
                x: Math.random() * param.rand.bone - param.rand.bone / 2,
                y: Math.random() * param.rand.bone - param.rand.bone / 2,
                z: Math.random() * param.rand.bone - param.rand.bone / 2,
            }
            const x = Math.cos(i * tb * param.deg * PARAM.util.radian) * param.dist * dir + rand.x
            const y = Math.sin((i * tb * param.deg + (degree * tb)) * PARAM.util.radian) * param.dist + rand.y
            const z = i * param.gap * tb + rand.z
            geometry.vertices.push(new THREE.Vector3(x, y, z))
        }
    },
    createDnaNucleic(bone, geometry, param, direction){
        let tb = 1, start = 0, idx = 0
        
        if(direction === 'top') {
            tb = -1
            start = param.count * 2
            idx = 1
        }

        for(let i = idx; i < param.count / param.div; i++){
            const deg = (i * param.div) * tb * param.deg

            const boneX = {
                norm: Math.cos(deg * PARAM.util.radian) * param.dist,
                rev: Math.cos(deg * PARAM.util.radian) * param.dist * -1
            }
            const boneY = {
                norm: Math.sin(deg * PARAM.util.radian) * param.dist,
                rev: Math.sin((deg + (180 * tb)) * PARAM.util.radian) * param.dist
            }
            const boneZ = (i * param.div) * param.gap * tb
            
            // const norm = bone.vertices[i * param.div + start]
            // const rev = bone.vertices[i * param.div + param.count + start]
            
            // const boneX = {norm: norm.x, rev: rev.x}
            // const boneY = {norm: norm.y, rev: rev.y}
            // const boneZ = (i * param.div) * param.gap * tb

            const m = (boneY.rev - boneY.norm) / (boneX.rev - boneX.norm)
            const xgap = Math.abs(boneX.rev - boneX.norm)

            for(let j = 0; j < param.point; j++){
                const rand = {
                    // x: Math.random() * (1 - param.rand) + param.rand,
                    // y: Math.random() * (1 - param.rand) + param.rand,
                    // z: Math.random() * (1 - param.rand) + param.rand
                    x: Math.random() * param.rand.nucleic.x - param.rand.nucleic.x / 2,
                    y: Math.random() * param.rand.nucleic.y - param.rand.nucleic.y / 2,
                    z: Math.random() * param.rand.nucleic.z - param.rand.nucleic.z / 2
                }
                const pos = (xgap / param.point) * j - (xgap / 2)
                const x = pos + rand.x
                const y = m * pos + rand.y
                const z = boneZ + rand.z
                console.log(xgap, param.point)
                geometry.vertices.push(new THREE.Vector3(x, y, z))
            }
        }
    }
}