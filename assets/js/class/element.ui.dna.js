CLASS.element.ui.dna = class{
    constructor(){
        this.param = new PARAM.element.ui.dna()
        this.time = TIME.dna.element
        this.play = {
            searching: false
        }
        this.#create()
        this.#createTween()
    }


    // element
    #create(){
        this.#createOpenLine()
        this.#createEdge()
        this.#createSearching()
        this.#createMatched()
    }
    // open line
    #createOpenLine(){
        this.openLine = []
        for(let i = 0; i < 4; i++){
            const VERTICAL = Math.floor(i / 2) === 0
            const HORIZON = i % 2 === 0
            const style = {
                top: VERTICAL ? 'initial' : '50%',
                bottom: VERTICAL ? '50%' : 'initial',
                transform: `translate(0, ${VERTICAL ? 50 : -50}%)`,
                left: HORIZON ? '0' : 'initial',
                right: HORIZON ? 'initial' : '0',
                transformOrigin: HORIZON ? 'left' : 'right',
            }
            this.openLine.push({
                id: i,
                style: style
            })
        }
    }
    // edge
    #createEdge(){
        this.edge = []
        const position = [
            {top: '0', left: '0', transform: 'scale(1, 1)'}, 
            {top: '0', right: '0', transform: 'scale(-1, 1)'}, 
            {bottom: '0', left: '0', transform: 'scale(1, -1)'}, 
            {bottom: '0', right: '0', transform: 'scale(-1, -1)'}
        ]
        
        position.forEach((e, i) => {
            this.edge.push({
                id: i,
                style: {
                    ...e,
                    animation: 'none'
                }
            })    
        })
    }
    // searching
    #createSearching(){
        this.searching = {
            wrap: {top: '50%'},
            bar: {transform: 'translate(-50%, -50%) scaleX(0)'},
            box: [],
            text: {opacity: '0'}
        }
        const position = [
            {top: '0', left: '0'},
            {top: '0', left: '50%', transform: 'translate(-50%, -600%)'},
            {top: '0', right: '0'},
            {top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '6px', height: '6px'},
            {bottom: '0', left: '0'},
            {bottom: '0', left: '50%', transform: 'translate(-50%, 600%)'},
            {bottom: '0', right: '0'}
        ]

        position.forEach((e, i) => {
            this.searching.box.push({
                id: i,
                style: {
                    ...e,
                    opacity: '0'
                }
            })
        })
    }
    // matched
    #createMatched(){
        this.matched = {
            wrap: {top: '0', left: '0'},
            circle: {transform: 'scale(0)'}
        }
    }


    // tween
    #createTween(){
        this.#createTweenOpenLine(this.time.openLine, this.param.openLine)
        this.#createTweenMatched(this.time.matched, this.param.mathched)
    }
    // open line
    #createTweenOpenLine(time, param){
        this.openLine.forEach((e, i) => {
            const VERTICAL = Math.floor(i / 2) === 0
            const start = {
                pos: {dist: param.dist, tsl: VERTICAL ? param.dist : -param.dist},
                scale: {scale: 1}
            }
            const end = {
                pos: {dist: 0, tsl: 0},
                scale: {scale: 0}
            }

            const translate = new TWEEN.Tween(start.pos)
            .to(end.pos, time.transition.pos)
            .easing(time.easing.pos)
            .onUpdate(() => this.#updateOpenLinePosition(e, VERTICAL, start.pos))
            // .start()

            const scale = new TWEEN.Tween(start.scale)
            .to(end.scale, time.transition.scale)
            .easing(time.easing.scale)
            .onUpdate(() => this.#updateOpenLineScale(e, start.scale))
            .onComplete(() => {if(i === this.openLine.length - 1) this.#onCompleteOpenLine()})
            // .start()

            translate.chain(scale)
            translate.start()
        })
    }
    #updateOpenLinePosition(e, VERTICAL, start){
        if(VERTICAL) e.style.bottom = `${start.dist}%`
        else e.style.top = `${start.dist}%`
        e.style.transform = `translate(0, ${start.tsl}%)`
    }
    #updateOpenLineScale(e, start){
        e.style.transform = `scaleX(${start.scale})`
    }
    // matched
    #createTweenMatched(time, param){
        const start = {
            show: {scale: 0},
            hide: {scale: 1}
        }
        const end = {
            show: {scale: 1},
            hide: {scale: 0}
        }

        const show = new TWEEN.Tween(start.show)
        .to(end.show, time.transition.show)
        .onStart(() => this.#startMatched(param))
        .onUpdate(() => this.#updateMatched(start.show))
        .easing(time.easing.show)
        .delay(time.start)

        const hide = new TWEEN.Tween(start.hide)
        .to(end.hide, time.transition.hide)
        .onUpdate(() => this.#updateMatched(start.hide))
        .onComplete(() => this.#completeMatched())
        .easing(time.easing.hide)
        .delay(time.start)

        show.chain(hide)
        hide.chain(show)
        show.start()
    }
    #startMatched(param){
        const x = (Math.random() * param.x.max + param.x.min) * 100
        const y = (Math.random() * param.y.max + param.y.min) * 100
        this.matched.wrap.top = `${y}%`
        this.matched.wrap.left = `${x}%`
    }
    #updateMatched(start){
        this.matched.circle.transform = `scale(${start.scale})`
    }
    #completeMatched(){

    }


    // animate
    animate(time){
        if(this.play.searching) this.#moveSearching(time, this.param.searching)
    }
    #onCompleteOpenLine(){
        this.#blinkEdge(this.param.edge)
        this.#showSearching()
        this.#playToMoveSearching()
    }
    // edge  
    #blinkEdge(param){
        this.edge.forEach(e => {
            const delay = Math.random() * param.delay + param.delay
            e.style.animation = `blink 0.08s ${delay}s 2 forwards`
        })
    }
    // searching
    #showSearching(){
        this.searching.bar.transform = 'translate(-50%, -50%) scaleX(1)'
        this.searching.text.opacity = '1'
        this.searching.box.forEach(e => {
            e.style.opacity = '1'
        })
    }
    #playToMoveSearching(){
        this.play.searching = true
    }
    #moveSearching(time, param){
        const x = noise.noise2D(param.smooth, time * param.velocity)
        const a = param.range.min, b = param.range.max, max = 1, min = -1
        const amount = METHOD.object.util.normalize(x, a, b, max, min) * 100
        this.searching.wrap.top = `${amount}%`
    }
}