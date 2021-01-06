// three
const createObjectDNA = () => {
    COMP.object.dna = {big: []}
    for(let i = 0; i < 2; i++){
        COMP.object.dna.big.push(new CLASS.object.dna(PARAM.object.app, PARAM.object.dna))
    }
}
const createObjectLine = () => {
   COMP.object.line = new CLASS.object.line(PARAM.object.app, PARAM.object.line) 
}
const createObject = () => {
    // createObjectLine()
    createObjectDNA()
}
const animateObject = () => {
    // COMP.object.line.update(PARAM.object.line)
    COMP.object.dna.big.forEach(e => e.rotationY(0.02))
}
const renderThree = () => {
    COMP.object.app.render(PARAM.object.app)
    animateObject()
}
const initThree = () => {
    const canvas = document.querySelector('#canvas')
    COMP.object.app = new CLASS.object.app(canvas, PARAM.object.app)

    createObject()
}



// event
const onWindowResize = () => {
    PARAM.util.width = window.innerWidth
    PARAM.util.height = window.innerHeight

    COMP.object.app.resize(PARAM.object.app)
    // COMP.object.line.resize(PARAM.object.app, PARAM.object.line)
}


// render
const render = () => {
    renderThree()
}
const animate = () => {
    render()
    requestAnimationFrame(animate)
}


// init
const init = () => {
    initThree()
    animate()
    window.addEventListener('resize', onWindowResize, false)    
}
init()