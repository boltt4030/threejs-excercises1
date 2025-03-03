import * as THREE from 'three'

export default class Plane extends THREE.Mesh {
    constructor() {
        super(
            new THREE.PlaneGeometry(30, 30),
            new THREE.MeshBasicMaterial({ color: 'grey', side: THREE.DoubleSide })
        );
    }
}