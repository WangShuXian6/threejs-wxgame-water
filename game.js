import './js/libs/weapp-adapter'
import * as THREE from 'js/libs/three.js'
require('js/libs/Reflector')
require('js/libs/Refractor')
require('js/libs/Water2')
//require('js/libs/OrbitControls')

let controls
var scene, camera, clock, renderer, water;

var torusKnot;

var params = {
    color: '#ffffff',
    scale: 1,
    flowX: 1,
    flowY: 1
};

init();
animate();

function init() {

    // scene

    scene = new THREE.Scene();

    // camera

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.set( - 15, 7, 15 );
    camera.lookAt( scene.position );

    // clock

    //clock = new THREE.Clock();

    // mesh

//			var torusKnotGeometry = new THREE.TorusKnotBufferGeometry( 3, 1, 256, 32 );
//			var torusKnotMaterial = new THREE.MeshNormalMaterial();
//
//			torusKnot = new THREE.Mesh( torusKnotGeometry, torusKnotMaterial );
//			torusKnot.position.y = 4;
//			torusKnot.scale.set( 0.5, 0.5, 0.5 );
//			scene.add( torusKnot );

    // ground

//			var groundGeometry = new THREE.PlaneBufferGeometry( 20, 20 );
//			var groundMaterial = new THREE.MeshStandardMaterial( { roughness: 0.8, metalness: 0.4 } );
//			var ground = new THREE.Mesh( groundGeometry, groundMaterial );
//			ground.rotation.x = Math.PI * - 0.5;
//			scene.add( ground );
//
//			var textureLoader = new THREE.TextureLoader();
//			textureLoader.load( 'textures/hardwood2_diffuse.jpg', function( map ) {
//				map.wrapS = THREE.RepeatWrapping;
//				map.wrapT = THREE.RepeatWrapping;
//				map.anisotropy = 16;
//				map.repeat.set( 4, 4 );
//				groundMaterial.map = map;
//				groundMaterial.needsUpdate = true;
//			} );

    // water

    var waterGeometry = new THREE.PlaneBufferGeometry( 20, 20 );

    water = new THREE.Water( waterGeometry, {
        color: params.color,
        scale: params.scale,
        flowDirection: new THREE.Vector2( params.flowX, params.flowY ),
        textureWidth: 1024,
        textureHeight: 1024
    } );

    water.position.x = 1;
    water.position.y = 1;
    water.position.z = 1;
    //water.rotation.x = Math.PI * - 0.5;
    //water.rotation.x = Math.PI /2;

    scene.add( water );

    // skybox

    var cubeTextureLoader = new THREE.CubeTextureLoader();
    //cubeTextureLoader.setPath( 'http://black.xinliu.org/obj/skybox/' );

    var cubeTexture = cubeTextureLoader.load( [
        'http://black.xinliu.org/obj/skybox/px.jpg', 'http://black.xinliu.org/obj/skybox/nx.jpg',
        'http://black.xinliu.org/obj/skybox/py.jpg', 'http://black.xinliu.org/obj/skybox/ny.jpg',
        'http://black.xinliu.org/obj/skybox/pz.jpg', 'http://black.xinliu.org/obj/skybox/nz.jpg',
    ] );

    var cubeShader = THREE.ShaderLib[ 'cube' ];
    cubeShader.uniforms[ 'tCube' ].value = cubeTexture;

    var skyBoxMaterial = new THREE.ShaderMaterial( {
        fragmentShader: cubeShader.fragmentShader,
        vertexShader: cubeShader.vertexShader,
        uniforms: cubeShader.uniforms,
        side: THREE.BackSide
    } );

    var skyBox = new THREE.Mesh( new THREE.BoxBufferGeometry( 1000, 1000, 1000 ), skyBoxMaterial );
    scene.add( skyBox );

    // light

    var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
    scene.add( ambientLight );

    var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.6 );
    directionalLight.position.set( - 1, 1, 1 );
    scene.add( directionalLight );

    // renderer

    renderer = new THREE.WebGLRenderer( { antialias: true,canvas: canvas } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio( window.devicePixelRatio );
    //document.body.appendChild( renderer.domElement );

    // dat.gui

    // var gui = new dat.GUI();
    //
    // gui.addColor( params, 'color' ).onChange( function( value ) {
    //
    //     water.material.uniforms.color.value.set( value );
    //
    // } );
    // gui.add( params, 'scale', 1, 10 ).onChange( function( value ) {
    //
    //     water.material.uniforms.config.value.w = value;
    //
    // } );
    // gui.add( params, 'flowX', - 1, 1 ).step( 0.01 ).onChange( function( value ) {
    //
    //     water.material.uniforms.flowDirection.value.x = value;
    //     water.material.uniforms.flowDirection.value.normalize();
    //
    // } );
    // gui.add( params, 'flowY', - 1, 1 ).step( 0.01 ).onChange( function( value ) {
    //
    //     water.material.uniforms.flowDirection.value.y = value;
    //     water.material.uniforms.flowDirection.value.normalize();
    //
    // } );
    //
    // gui.open();

    //

    //controls = new THREE.OrbitControls( camera, renderer );

    //

    //window.addEventListener( 'resize', onResize, false );

}

// function onResize() {
//
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize( window.innerWidth, window.innerHeight );
//
// }

function animate() {

    requestAnimationFrame( animate );

    render();

}

function render() {

//			var delta = clock.getDelta();
//
//			torusKnot.rotation.x += delta;
//			torusKnot.rotation.y += delta * 0.5;

    renderer.render( scene, camera );

}