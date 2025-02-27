import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// import Stats from 'https://cdnjs.cloudflare.com/ajax/libs/stats.js/17/Stats.js'
/* //for animate with gsap
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
*/

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
scene.add(axesHelper)
/* Objects */
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: '#ff0000', wireframe: false })
)
scene.add(cube)

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
window.addEventListener('dblclick', () =>
{
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
    if (!fullscreenElement)
    {
        if (canvas.requestFullscreen)
        {
            canvas.requestFullscreen()
        }
        else if (canvas.webkitRequestFullscreen)
        {
            canvas.webkitRequestFullscreen()
        }
    }
    else
    {
        if (document.exitFullscreen)
        {
            document.exitFullscreen()
        }
        else if (document.webkitExitFullscreen)
        {
            document.webkitExitFullscreen()
        }
    }
})

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