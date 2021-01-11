TIME.dna = {
    object: {
        start: {
            bone: 500,
            nucleic: 500
        },
        transition: 300,
        duration: {
            bone: 600,
            nucleic: 600
        },
        easing: {
            bone: [0.250, 0.250, 0.750, 0.750],
            nucleic: [0.250, 0.250, 0.750, 0.750]
        }
    },
    element: {
        openLine: {
            start: 500,
            transition: {
                tsl: 1200,
                scale: 600
            },
            easing: {
                tsl: TWEEN.Easing.Cubic.Out,
                scale: TWEEN.Easing.Circular.Out
            }
        }
    }
}