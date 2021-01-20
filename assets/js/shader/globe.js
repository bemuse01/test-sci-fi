SHADER.globe = {
    inner: {
        vertex: `
        varying vec3 vNormal;
        void main(){
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
        `,
        fragment: `
            varying vec3 vNormal;
            uniform vec3 color;
            void main(){
                float intensity = 1.1 - dot(vNormal, vec3(0.0, 0.0, 1.0));
                vec3 sphere = vec3(color) * pow( intensity, 2.0);
                gl_FragColor = vec4(sphere, 1.0);
            }
        `
    },
    outer: {
        vertex: `
            varying vec3 vNormal;
            varying vec2 vUv;
            void main() {
                gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
                vNormal = normalize( normalMatrix * normal );
                vUv = uv;
            }
        `,
        fragment: `
            uniform sampler2D texture;
            uniform vec3 color;
            varying vec3 vNormal;
            varying vec2 vUv;
            void main() {
                // float intensity = pow( 0.7 - dot( vNormal, vec3( 0.0, 0.0, 1.0 ) ), 4.0 ); 
                float intensity = pow( 0.7 - dot( vNormal, vec3( 0.0, 0.0, 1.0 ) ), 6.0 ); 
                gl_FragColor = vec4( color, 1.0 ) * intensity;
        
                // vec3 diffuse = texture2D( texture, vUv ).xyz;
                // float intensity = 1.05 - dot( vNormal, vec3( 0.0, 0.0, 1.0 ) );
                // vec3 atmosphere = vec3( 1.0, 1.0, 1.0 ) * pow( intensity, 3.0 );
                // gl_FragColor = vec4( atmosphere, 1.0 );
            }
        `
    }
}