CLASS.element.ui.dna = class{
    constructor(time = {}){
        // this.animate = {
        //     openLine: {
        //         translate: true,
        //         scale: true
        //     }
        // }
        this.#create(time)
        this.#createTween(time)
    }


    // element
    #create(time){
        this.#createOpenLine(time.openLine)
    }
    // open line
    #createOpenLine(time){
        this.openLine = []
        for(let i = 0; i < 4; i++){
            const style = i % 2 === 0 ? {
                left: '0',
                transformOrigin: 'left',
                transform: 'translate(0, 0)'
                // transition: `${time.transition}s`
            } : {
                right: '0',
                transformOrigin: 'right',
                transform: 'translate(0, 0)'
                // transition: `${time.transition}s`
            }
            this.openLine.push({
                id: i,
                style: style
            })
        }
    }


    // tween
    #createTween(time){
        const param = new PARAM.element.ui.dna()

        this.#createTweenOpenLine(time.openLine, param.openLine)
    }
    // open line
    #createTweenOpenLine(time, param){
        this.openLine.forEach((e, i) => {
            const start = {
                tsl: {dist: 0},
                scale: {scale: 1}
            }
            const end = {
                tsl: {dist: Math.floor(i / 2) === 0 ? param.dist : -param.dist},
                scale: {scale: 0}
            }

            const translate = new TWEEN.Tween(start.tsl)
            .to(end.tsl, time.transition.tsl)
            .easing(time.easing.tsl)
            .onUpdate(() => this.#updateOpenLineTranslate(e, start.tsl))
            .delay(time.start)
            // .start()

            const scale = new TWEEN.Tween(start.scale)
            .to(end.scale, time.transition.scale)
            .easing(time.easing.scale)
            .onUpdate(() => this.#updateOpenLineScale(e, start.scale, end.tsl))
            // .start()

            translate.chain(scale)
            translate.start()
        })
    }
    #updateOpenLineTranslate(e, start){
        e.style.transform = `translate(0, ${start.dist}vh) scaleX(1)`
    }
    #updateOpenLineScale(e, start, end){
        e.style.transform = `translate(0, ${end.dist}vh) scaleX(${start.scale})`
    }
}