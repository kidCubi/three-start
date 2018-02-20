import * as THREE from 'three'
import OrbitControls from 'orbit-controls-es6'

import vert from './shaders/shader.vert'
import frag from './shaders/shader.frag'

class App {
    constructor() {
        this.init = this.init.bind(this);
        this.animate = this.animate.bind(this);
        this.scene = null;
        this.camera = null;
        this.controls = null;
        this.mainRaf = null;
        this.flagResize = false;
    }

    init() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
        this.camera.position.z = 1000;
        this.controls = new OrbitControls(this.camera);
        const geometry = new THREE.BoxGeometry(200, 200, 200);
        const material = new THREE.RawShaderMaterial({
            vertexShader: vert,
            fragmentShader: frag
        });
        this.mesh = new THREE.Mesh(geometry, material);
        this.scene.add(this.mesh);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        
        window.addEventListener('resize', () => { this.flagResize = true });
        this.animate();
    }

    animate() {
        this.mainRaf = requestAnimationFrame(this.animate);
        this.mesh.rotation.x += 0.04;
        this.mesh.rotation.y += 0.02;
        this.renderer.render(this.scene, this.camera);
        if(this.flagResize) {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.flagResize = !this.flagResize;
        }
    }

}

new App().init();