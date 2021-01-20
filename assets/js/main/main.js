new Vue({
    el: '#wrap',
    data(){
        return{
            element: {
                dna: new CLASS.element.ui.dna()
            }
        }
    },
    mounted(){
        this.init()
    },
    methods: {
        // init
        init(){
            this.initThree()
            this.animate()
            window.addEventListener('resize', this.onWindowResize, false)    
        },


        // three
        initThree(){
            const canvas = document.querySelector('#canvas')
            const param = new PARAM.object.app()

            COMP.object.app = new CLASS.object.app(canvas, param)

            this.initObjectScene(COMP.object.app.getApp())
            this.createObject()
        },
        renderThree(){
            this.animateObject()
            COMP.object.app.render(COMP.object.render)
        },
        // init object scene
        initObjectScene(app){
            for(let i in CLASS.object){
                if(i === 'app') continue
                CLASS.object[i].build.initScene()
                CLASS.object[i].build.initComposer(app, PARAM.object[i])
            }
        },
        // create object
        createObject(){
            const app = COMP.object.app.getApp()

            this.createObjectDna(app)
            this.createObjectGlobe()
            // this.createObjectCube(app)
        },
        // dna
        createObjectDna(app){
            COMP.object.dna = {big: [], small: []}

            const big = new PARAM.object.dna({time: TIME.dna.object})
            const small = new PARAM.object.dna({time: TIME.dna.object, size: 1.125, rand: {bone: 5.0, nucleic: 4.0}, point: 60})

            for(let i = 0; i < 2; i++) COMP.object.dna.big.push(new CLASS.object.dna.build(app, big))
            for(let i = 0; i < 3; i++) COMP.object.dna.small.push(new CLASS.object.dna.build(app, small))
        },
        // globe
        createObjectGlobe(){
            const param = new PARAM.object.globe()

            COMP.object.globe = new CLASS.object.globe.build(param)
        },
        // cube
        createObjectCube(app){
            const param = new PARAM.object.cube()

            COMP.object.cube = new CLASS.object.cube.build(app, param)
        },
        // animate object
        animateObject(){
            COMP.object.dna.big.forEach(e => e.animate())
            COMP.object.dna.small.forEach(e => e.animate())
            COMP.object.globe.animate()
            // COMP.object.cube.animate()
        },


        // element
        animateElement(){
            const time = window.performance.now()

            this.element.dna.animate(time)
        },


        // event
        onWindowResize(){
            PARAM.util.width = window.innerWidth
            PARAM.util.height = window.innerHeight
            
            COMP.object.app.resize()
            for(let i in CLASS.object) if(i !== 'app'){
                CLASS.object[i].build.resize()
            }
        },


        // render
        render(){
            this.renderThree()
            TWEEN.update()
            this.animateElement()
        },
        animate(){
            this.render()
            requestAnimationFrame(this.animate)
        }
    }
})