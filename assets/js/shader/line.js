SHADER.line = {
    vertex: `
        attribute float opacity;
        varying vec3 vPosition;
        varying float vOpacity;
        void main() {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            vPosition = position;
            vOpacity = opacity;
        }
    `,
    fragment: `
        varying vec3 vPosition;
        varying float vOpacity;
        uniform vec3 color;
        void main() {
            gl_FragColor = vec4(color, vOpacity);
        }
    `
}