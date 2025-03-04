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
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js'

/* Textures */
const loadingManager = new THREE.LoadingManager()
/*
loadingManager.onStart = () => {
    console.log('started')
}
loadingManager.onLoad = () => {
    console.log('finished')
}
loadingManager.onProgress = () => {
    console.log('loading progress')
}
loadingManager.onError = () => {
    console.log('loading error')
}
*/
const textureLoader = new THREE.TextureLoader(loadingManager)
const colorTexture = textureLoader.load('/textures/minecraft.png')
colorTexture.colorSpace = THREE.SRGBColorSpace
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
alphaTexture.colorSpace = THREE.SRGBColorSpace
const heightTexture = textureLoader.load('/textures/door/height.jpg')
heightTexture.colorSpace = THREE.SRGBColorSpace
const normalTexture = textureLoader.load('/textures/door/normal.jpg')
normalTexture.colorSpace = THREE.SRGBColorSpace
const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
ambientOcclusionTexture.colorSpace = THREE.SRGBColorSpace
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
metalnessTexture.colorSpace = THREE.SRGBColorSpace
const roughnessTexture = textureLoader.load('/textures/door/roughnesss.jpg')
roughnessTexture.colorSpace = THREE.SRGBColorSpace

// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 3
// colorTexture.wrapS = THREE.MirroredRepeatWrapping
// colorTexture.wrapT = THREE.MirroredRepeatWrapping

// colorTexture.offset.x = 0.5
// colorTexture.offset.y = 0.5

// colorTexture.rotation = Math.PI / 4
// colorTexture.center.x = 0.5
// colorTexture.center.y = 0.5

colorTexture.generateMipmaps = false
colorTexture.minFilter = THREE.NearestFilter
colorTexture.magFilter = THREE.NearestFilter

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
doorColorTexture.colorSpace = THREE.SRGBColorSpace
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
doorAlphaTexture.colorSpace = THREE.SRGBColorSpace
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
doorAmbientOcclusionTexture.colorSpace = THREE.SRGBColorSpace
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
doorHeightTexture.colorSpace = THREE.SRGBColorSpace
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
doorNormalTexture.colorSpace = THREE.SRGBColorSpace
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
doorMetalnessTexture.colorSpace = THREE.SRGBColorSpace
const doorRoughnessTexture = textureLoader.load('/textures/door/roughnesss.jpg')
doorRoughnessTexture.colorSpace = THREE.SRGBColorSpace
const matcapTexture = textureLoader.load('/textures/matcaps/8.png')
matcapTexture.colorSpace = THREE.SRGBColorSpace
const gradientTexture = textureLoader.load('/textures/gradients/5.jpg')
gradientTexture.colorSpace = THREE.SRGBColorSpace

/*
* DEBUG UI
*/
const gui = new GUI({
    width: 400,
    title: 'Debug UI',
    closeFolders: true
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
// const geometry = new THREE.BoxGeometry(1, 1, 1)

// MeshBasicMaterial
// const material = new THREE.MeshBasicMaterial()
// material.map = doorColorTexture
// material.color = new THREE.Color('#ff9000')
// material.wireframe = true
// material.transparent = true
// material.opacity = 0.5
// material.alphaMap = doorAlphaTexture
// material.side = THREE.DoubleSide

// // MeshNormalMaterial
// const material = new THREE.MeshNormalMaterial()
// material.flatShading = true

// // MeshMatcapMaterial
// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture

// // MeshDepthMaterial
// const material = new THREE.MeshDepthMaterial()

// // MeshLambertMaterial
// const material = new THREE.MeshLambertMaterial()

// // MeshPhongMaterial
// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100
// material.specular = new THREE.Color('#1188ff')

// MeshToonMaterial
// const material = new THREE.MeshToonMaterial()
// gradientTexture.minFilter = THREE.NearestFilter
// gradientTexture.magFilter = THREE.NearestFilter
// gradientTexture.generateMipmaps = false
// material.gradientMap = gradientTexture

// MeshStandardMaterial
/*
const material = new THREE.MeshStandardMaterial()
material.metalness = 1
material.roughness = 1
material.map = doorColorTexture
material.aoMap = doorAmbientOcclusionTexture
material.aoMapIntensity = 1
material.displacementMap = doorHeightTexture
material.displacementScale = 0.05
material.metalnessMap = doorMetalnessTexture
material.roughnessMap = doorRoughnessTexture
material.normalMap = doorNormalTexture
material.normalScale.set(0.1, 0.5)
material.transparent = true
material.alphaMap = doorAlphaTexture


gui.add(material, 'metalness').min(0).max(1).step(0.001)
gui.add(material, 'roughness').min(0).max(1).step(0.001)
*/

// MeshPhysicalMaterial
const material = new THREE.MeshPhysicalMaterial()
material.metalness = 1
material.roughness = 1
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.05
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.1, 0.5)
// material.transparent = true
// material.alphaMap = doorAlphaTexture


gui.add(material, 'metalness').min(0).max(1).step(0.001)
gui.add(material, 'roughness').min(0).max(1).step(0.001)

// Clearcoat
/*
material.clearcoat = 1
material.clearcoatRoughness = 0

gui.add(material, 'clearcoat').min(0).max(1).step(0.0001)
gui.add(material, 'clearcoatRoughness').min(0).max(1).step(0.0001)
*/

// Sheen
/*
material.sheen = 1
material.sheenRoughness = 0.25
material.sheenColor.set(1, 1, 1)

gui.add(material, 'sheen').min(0).max(1).step(0.0001)
gui.add(material, 'sheenRoughness').min(0).max(1).step(0.0001)
gui.addColor(material, 'sheenColor')
*/
// Iridescence
/*
material.iridescence = 1
material.iridescenceIOR = 1
material.iridescenceThicknessRange = [100, 800]

gui.add(material, 'iridescence').min(0).max(1).step(0.0001)
gui.add(material, 'iridescenceIOR').min(1).max(2.333).step(0.0001)
gui.add(material.iridescenceThicknessRange, '0').min(1).max(1000).step(1)
gui.add(material.iridescenceThicknessRange, '1').min(1).max(1000).step(1)
*/

// Transmission
material.transmission = 1
material.ior = 1.5
material.thickness = 1

gui.add(material, 'transmission').min(0).max(1).step(0.0001)
gui.add(material, 'ior').min(1).max(10).step(0.0001)
gui.add(material, 'thickness').min(0).max(1).step(0.0001)


const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    material
)
sphere.position.x = -1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 64, 128),
    material
)
torus.position.x = 1.5

scene.add(sphere, plane, torus)

/** 
 * Lights 
*/
// const ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
// scene.add(ambientLight)

// const pointLight = new THREE.PointLight('#ffffff', 30)
// pointLight.position.set(2, 3, 4)
// scene.add(pointLight)

/**
 * Environment Map
*/
const rgbeLoader = new RGBELoader()
rgbeLoader.load('/textures/environmentMap/lilienstein_4k.hdr', (environmentMap) => {
    environmentMap.mapping = THREE.EquirectangularReflectionMapping

    scene.background = environmentMap
    scene.environment = environmentMap
    // texture.mapping = THREE.EquirectangularReflectionMapping

    // scene.background = texture
    // scene.environment = texture

    // scene.environment.mapping = THREE.EquirectangularReflectionMapping

})

const count = 50
const positionsArray = new Float32Array(count * 3 * 3)
for (let i = 0; i < count * 3 * 3; i++) {
    positionsArray[i] = (Math.random() -0.5) * 4
}

const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
// geometry.setAttribute('position', positionsAttribute)
// const material = new THREE.MeshBasicMaterial({
//     // color: debugObject.color,
//     map: colorTexture,
//     wireframe: false
// })
// const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)

/* Tweaks Debug UI */
/*
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

debugObject.subdivision = 1

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
*/

/* Plane */
// const plane =  new Plane()
// plane.rotation.set(Math.PI * 0.5, 0, 0)
// plane.position.set(0, -0.51, 0)
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

/* Fullscreen */
/*
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
*/

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
const clock = new THREE.Clock()


/* Animation tick */
const tick = () =>
{
    // Current Time
    /*const currentTime = Date.now()
    const deltaTime = currentTime - time
    time = currentTime */

    // Using Clock
    const elapsedTime = clock.getElapsedTime()
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

    sphere.rotation.y = 0.1 * elapsedTime
    // plane.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime
    
    sphere.rotation.x = - 0.15 * elapsedTime
    // plane.rotation.x = - 0.15 * elapsedTime
    torus.rotation.x = - 0.15 * elapsedTime
    
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