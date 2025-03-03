import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import Cube from './assets/objects/Cube';
import Plane from './assets/objects/Plane';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// import Stats from 'https://cdnjs.cloudflare.com/ajax/libs/stats.js/17/Stats.js'
/* //for animate with gsap
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
*/

import gsap from 'gsap'
import { GUI } from 'lil-gui'

/* Texture Loader */
const image = new Image()
image.onload = () => {
    console.log('image loaded')
}
image.src = 'textures/door/door-color.jpg'

/*
* DEBUG
*/
const gui = new GUI({
    width: 400,
    title: 'Debug UI',
    closeFolders: false
})
// gui.close()
// gui.hide()

window.addEventListener('keydown', (event) => {
    if(event.key == 'h'){
        gui.show(gui._hidden)
    }

})

const debugObject = {}
/* 
//for mouse cursor
*/
const cursor = {
    x: 0,
    y: 0
}
window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = -( event.clientY / sizes.height - 0.5)
})

// Canvas
const canvas = document.querySelector('canvas.webgl')
// Scene
const scene = new THREE.Scene()

// Axes Helper
const axesHelper = new THREE.AxesHelper(3)
// scene.add(axesHelper)

/* Objects */
// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1, 2, 2, 2),
//     new THREE.MeshBasicMaterial({
//         color: '#ff0000',
//         wireframe: true 
//     })
// )
// scene.add(cube)

debugObject.color = '#9abbfe'
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)

// const geometry = new THREE.BufferGeometry()

const count = 50
const positionsArray = new Float32Array(count * 3 * 3)
for (let i = 0; i < count * 3 * 3; i++) {
    positionsArray[i] = (Math.random() -0.5) * 4
}

const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
// geometry.setAttribute('position', positionsAttribute)
const material = new THREE.MeshBasicMaterial({
    color: debugObject.color,
    wireframe: true
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const cubeTweaks = gui.addFolder('Awesome Cubes')

cubeTweaks
    .add(mesh.position, 'y')
    .min(-3)
    .max(3)
    .step(0.01)
    .name('Elevation')

cubeTweaks
    .add(mesh, 'visible')

cubeTweaks
    .add(material, 'wireframe')

cubeTweaks
    .addColor(debugObject, 'color')
    .onChange((value) => {
        material.color.set(debugObject.color)
    })

debugObject.spin = () => {
    gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 })
}
cubeTweaks
    .add(debugObject, 'spin')

debugObject.subdivision = 2

cubeTweaks
    .add(debugObject, 'subdivision')
    .min(1)
    .max(20)
    .step(1)
    .onFinishChange((value) => {
        mesh.geometry.dispose()
        mesh.geometry = new THREE.BoxGeometry(
            1, 1, 1,
            debugObject.subdivision, debugObject.subdivision, debugObject.subdivision
        )
    })

/* Plane */
const plane =  new Plane()
plane.rotation.set(Math.PI * 0.5, 0, 0)
plane.position.set(0, -0.51, 0)
// scene.add(plane)

/** Group Object */
/*
const group = new THREE.Group()
scene.add(group)
// set group transform
group.position.set(0, 0, 0)
group.rotation.set(0, 0, 0)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: '#ff0000', wireframe: true })
)
group.add(cube1)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: '#0ff000' })
)
cube2.position.set(2, 0, 0)
// group.add(cube2)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: '#fff000' })
)
cube3.position.set(- 2, 0, 0)
// group.add(cube3)
*/

// canvas Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Resize
window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Fullscreen
// window.addEventListener('dblclick', () =>
// {
//     const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
//     if (!fullscreenElement)
//     {
//         if (canvas.requestFullscreen)
//         {
//             canvas.requestFullscreen()
//         }
//         else if (canvas.webkitRequestFullscreen)
//         {
//             canvas.webkitRequestFullscreen()
//         }
//     }
//     else
//     {
//         if (document.exitFullscreen)
//         {
//             document.exitFullscreen()
//         }
//         else if (document.webkitExitFullscreen)
//         {
//             document.webkitExitFullscreen()
//         }
//     }
// })

// Camera
// Parameteres Perspective(FOV, aspect, near, far)
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)

// const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, - 1, 0.1, 100)
// Position XYZ
camera.position.set(0, 0, 3)
scene.add(camera)

/*
* Controls Camera exercise
*/
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))



// gsap.to(group.position, { duration: 2, delay: 1, x: 2})
//gsap scroll trigger
/*
gsap.registerPlugin(ScrollTrigger)

gsap.to(group.position, {
    scrollTrigger: {
        trigger: '.box',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        pin: true
    },
    x: - 2 * Math.PI,
    ease: 'none',

    // onUpdate: () => {
    //     camera.lookAt(group.position)
    // },
})
*/

// using time as frame rateTime
// let time = Date.now()

// Clock
// const clock = new THREE.Clock()


/* Animation tick */
const tick = () =>
{
    // Current Time
    /*const currentTime = Date.now()
    const deltaTime = currentTime - time
    time = currentTime */

    // Using Clock
    // const elapsedTime = clock.getElapsedTime()
    // const deltaTime = clock.getDelta()
    
    // Update objects
    // loop object back/forward
    // group.rotation.set(0, Math.sin(Date.now() * 0.001), 0)

    // Update camera
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
    // camera.position.y = cursor.y * 5
    // camera.lookAt(cube.position)
    // camera.position.x = Math.cos(elapsedTime)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()


/* others Controls Camera */
/*
document.body.appendChild(renderer.domElement)
const controls = new OrbitControls(camera, renderer.domElement)

controls.listenToKeyEvents(document.body)

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
}
window.addEventListener('resize', onWindowResize, false)

const stats = new Stats()
document.body.appendChild(stats.dom)

function animate() {
    requestAnimationFrame(animate)

    // controls.update()

    render()

    stats.update()
}

animate()

function render() {
    renderer.render(scene, camera)
} */
// renderer.render(scene, camera)