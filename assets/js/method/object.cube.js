METHOD.object.cube = {
    createPosition(param){
        const arr = [], size = param.row * param.row
        let x = [], y = [], z = []
        const start = Math.floor(param.row / 2)
        const init = {x: -start, y: start, z: start}
        
        for(let i = 0; i < (param.row % 2 === 0 ? param.row + 1 : param.row); i++){
            x[i] = init.x++
            y[i] = init.y--
            z[i] = init.z--
        }

        if(param.row % 2 === 0) {
            x.splice(start, 1)
            y.splice(start, 1)
            z.splice(start, 1)
            x = x.map(e => e - Math.sign(e) * 1 / 2)
            y = y.map(e => e - Math.sign(e) * 1 / 2)
            z = z.map(e => e - Math.sign(e) * 1 / 2)
        }

        for(let i = 0; i < param.row ** 3; i++) {
            const posX = x[i % param.row]
            const posY = y[Math.floor(i / size)]
            const posZ = z[Math.floor((i % size) / param.row)]
            arr[i] = {
                x: posX * param.size + posX * param.gap, 
                y: posY * param.size + posY * param.gap, 
                z: posZ * param.size + posZ * param.gap
            }
        }
        return arr
    }
}