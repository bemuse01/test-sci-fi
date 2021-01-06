PARAM.object = {
    app: {
        renderer: null,
        scene: null,
        camera: null,
        composer: null,
        bloom: 2
    },
    line: {
        count: 128,
        point: 128,
        color: 0xffffff,
        opacity: 0,
        chance: 0.985
    },
    dna: {
        count: 80,
        gap: 0.45,
        dist: 7,
        deg: 3,
        size: 0.6,
        opacity: 1.0,
        color: {
            bone: 0xffffff,
            nucleic: 0x73eaff
        },
        rand: {
            bone: 1.4,
            nucleic: {
                x: 1.0,
                y: 1.0,
                z: 1.0
            }
        },
        point: 30,
        div: 12,
        map: 'assets/src/point.png',
        layers: PROCESS
    }
}