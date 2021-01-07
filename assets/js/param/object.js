PARAM.object = {
    app: {
        renderer: null,
        scene: null,
        camera: null,
        composer: null,
        bloom: 2.25
    },
    line: {
        count: 128,
        point: 128,
        color: 0xffffff,
        opacity: 0,
        chance: 0.985
    },
    dna: {
        big: {
            time: {
                easing: {
                    bone: [0.250, 0.250, 0.750, 0.750],
                    nucleic: [0.250, 0.250, 0.750, 0.750]
                },
                start: {
                    bone: 500,
                    nucleic: 600
                },
                transition: 300,
                duration: {
                    bone: 1000,
                    nucleic: 1000
                }
            },
            count: 80,
            gap: 0.45,
            dist: 7,
            deg: 2,
            size: 3.0, // 0.6
            opacity: 1.0,
            color: {
                bone: 0xffffff,
                nucleic: 0x73eaff
            },
            rand: {
                bone: 1.4,
                nucleic: 1.0
            },
            point: 30,
            div: 12,
            layers: PROCESS
        },
        small: {
            time: {
                easing: {
                    bone: [0.250, 0.250, 0.750, 0.750],
                    nucleic: [0.250, 0.250, 0.750, 0.750]
                },
                start: {
                    bone: 500,
                    nucleic: 600
                },
                transition: 300,
                duration: {
                    bone: 1000,
                    nucleic: 1000
                }
            },
            count: 80,
            gap: 0.45,
            dist: 7,
            deg: 2,
            size: 1.1, // 0.2
            opacity: 1.0,
            color: {
                bone: 0xffffff,
                nucleic: 0x73eaff
            },
            rand: {
                bone: 4.0,
                nucleic: 3.0
            },
            point: 60,
            div: 12,
            layers: PROCESS
        }
    }
}