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

            this.createObject()
        },
        renderThree(){
            COMP.object.app.render()
            this.animateObject()
        },
        // create object
        createObject(){
            const app = COMP.object.app.getApp()

            this.createObjectDna(app)
        },
        createObjectDna(app){
            COMP.object.dna = {big: [], small: []}

            const big = new PARAM.object.dna.build({time: TIME.dna.object})
            const small = new PARAM.object.dna.build({time: TIME.dna.object, size: 1.1, rand: {bone: 4.0, nucleic: 3.0}, point: 60})

            for(let i = 0; i < 2; i++) COMP.object.dna.big.push(new CLASS.object.dna.build(app, big))
            for(let i = 0; i < 3; i++) COMP.object.dna.small.push(new CLASS.object.dna.build(app, small))
        },
        // animate object
        animateObject(){
            COMP.object.dna.big.forEach(e => e.rotationY(0.02))
            COMP.object.dna.small.forEach(e => e.rotationY(0.02))
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