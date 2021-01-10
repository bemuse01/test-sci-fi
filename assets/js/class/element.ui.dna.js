CLASS.element.ui.dna = class{
    constructor(time = {}){
        // this.animate = {
        //     openLine: {
        //         translate: true,
        //         scale: true
        //     }
        // }
        this.#create(time)
    }


    // element
    #create(time){
        this.#createOpenLine(time.openLine)
    }

    #createOpenLine(time){
        this.openLine = []
        for(let i = 0; i < 4; i++){
            const style = i % 2 === 0 ? {
                left: '0',
                transformOrigin: 'left',
                // transition: `${time.transition}s`
            } : {
                right: '0',
                transformOrigin: 'right',
                // transition: `${time.transition}s`
            }
            this.openLine.push({
                id: i,
                style: style
            })
        }
    }


    // tween
    #createTween(){

    }

    #createTweenOpenLine(){
        
    }
}