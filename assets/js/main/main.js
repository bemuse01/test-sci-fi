// three
const createObjectDnaUi = (app) => {
    COMP.object.ui.dna = new CLASS.object.ui.dna(app)
}
const createObjectDna = (app) => {
    COMP.object.dna = {big: [], small: []}

    const big = new PARAM.object.dna.build()
    const small = new PARAM.object.dna.build({size: 1.1, rand: {bone: 4.0, nucleic: 3.0}, point: 60})

    for(let i = 0; i < 2; i++) COMP.object.dna.big.push(new CLASS.object.dna.build(app, big))
    for(let i = 0; i < 3; i++) COMP.object.dna.small.push(new CLASS.object.dna.build(app, small))
}
const buildDna = (app) => {

    createObjectDna(app)
    createObjectDnaUi(app)
}
const createObject = () => {
    const app = COMP.object.app.getApp()

    buildDna(app)
}
const animateObject = () => {
    COMP.object.dna.big.forEach(e => e.rotationY(0.02))
    COMP.object.dna.small.forEach(e => e.rotationY(0.02))
}
const renderThree = () => {
    COMP.object.app.render()
    animateObject()
}
const initThree = () => {
    const canvas = document.querySelector('#canvas')

    const param = new PARAM.object.app()

    COMP.object.app = new CLASS.object.app(canvas, param)

    createObject()
}


// event
const onWindowResize = () => {
    PARAM.util.width = window.innerWidth
    PARAM.util.height = window.innerHeight

    COMP.object.app.resize()
}


// render
const render = () => {
    renderThree()
    TWEEN.update()
}
const animate = () => {
    render()
    requestAnimationFrame(animate)
}


// init
const init = () => {
    const t = 1 / 80
    const f = BezierEasing(0.645, 0.045, 0.355, 1.000)
    const duration = 500
    for(let i = 0; i < 80; i++){
        const easing = f(i * t)
        console.log(easing * duration)
    }

    initThree()
    animate()
    window.addEventListener('resize', onWindowResize, false)    
}
init()