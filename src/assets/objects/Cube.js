import * as THREE from 'three';

export default class Cube extends THREE.Mesh {
    constructor() {
        super(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({ color: '#00faa0', wireframe: false })
        );
    }
}