import * as THREE from 'three'
import * as dat from 'lil-gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js';

import { CustomVRButton } from './CustomVRButton.js'
import VRcontrollers from './VRcontrollers.js'

import { createGlbLoader } from './Loader.js'

/** Options */
import PhysWorld from './/PhysWorld.js'
// import PostProcess from '../systems/PostProcess.js'

let instance = null

export default class Stage
{
  constructor(canvas, config = {controller:'orbit', debug: false})
  {
    if(instance) 
    {
      return instance
    }
    instance = this

    // Options
    this.config = config
    

    // Setup
    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
      pixelRatio: Math.min(window.devicePixelRatio, 2),
    }
    window.addEventListener('resize', () => this.resize)


    this.time = {
      start: Date.now(),
      current: Date.now(),
      delta: 16,
      elapsed: 0,
    }

    this.debug = {
      active: config.debug,
    }
    if (config.debug) { this.debug.ui = new dat.GUI()}

    this.glbloader = createGlbLoader()
    this.canvas = canvas
    this.scene = new THREE.Scene()


    this.camera = new THREE.PerspectiveCamera(
      35, 
      this.sizes.width / this.sizes.height,
      0.1,
      1000
    )

    this.setControls(this.config.controller)

    // this.controls = new OrbitControls(this.camera, this.canvas)
    // this.controls.enableDamping = true


    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      physicallyCorrectLights: true,
      outputEncoding: THREE.sRGBEncoding,
      toneMapping: THREE.CineonToneMapping,
      toneMappingExposure: 1.75,
    })
    this.renderer.shadowMap.enabled = true  // needed? maybe set in world
    this.renderer.shadowMap.type =THREE.PCFSoftShadowMap // needed? maybe set in world
    this.renderer.setClearColor('#211d20')
    this.renderer.setSize(this.sizes.width, this.sizes.height)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    // this.postProcessor = new PostProcess()

    /** initially setting animation loop to null, later call start() in main.js */
    this.renderer.setAnimationLoop( null )
  }

  resize()
  {
    this.sizes.width = window.innerWidth
    this.sizes.height = window.innerHeight
    this.sizes.pixelRatio = Math.min(window.devicePixelRatio, 2)

    this.renderer.setSize(this.sizes.width, this.sizes.height)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    
    // this.postProcessor.resize()
    
    this.camera.aspect = this.sizes.width / this.sizes.height
    this.camera.updateProjectionMatrix()
  }

  setControls(type)
  {
    console.log(type)
    if (type === 'orbit')
    {
      this.controls = new OrbitControls(this.camera, this.canvas)
      this.controls.enableDamping = true
    }
    if ( type === 'fly' )
    {
      this.controls = new FlyControls( this.camera, this.canvas );

      // this.controls.movementSpeed = 1000;
      // this.controls.domElement = this.canvas;
      // this.controls.rollSpeed = Math.PI / 24;
      // this.controls.autoForward = false;
      this.controls.dragToLook = true;
    }
    console.log(this.controls)
  }

  enableVR( gripModels, controllerHandlers ) {
    this.renderer.xr.enabled = true;
    this.VRbtn = new CustomVRButton(this.renderer);
    this.controls =  new VRcontrollers( gripModels, controllerHandlers )

    // this.dolly = new THREE.Object3D();
    // this.dolly.position.z = 0;
    // this.dolly.add( this.stage.camera );
    // this.dolly.position.set(1,1,5)
    // this.scene.add( this.dolly );
  }

  disableVR() {
    this.renderer.xr.enabled = false;
    document.getElementById('VRbtn')?.remove()
  }

  enablePhysics() 
  {
    this.physWorld = new PhysWorld()
  }

  init() 
  {
    // load global assets and resources
    // this.scene.background = color
  }

  

  update()
  {
    const currentTime = Date.now()
    this.time.delta = currentTime - this.time.current
    this.time.current = currentTime
    this.time.elapsed = this.current - this.time.start

    
    this.controls?.update(this.time.delta)
    
    this.physWorld?.step(
      1/60,
      this.time.delta,
      3
    )
    this.world?.update()

    // not needed with post processing
    this.renderer.render(this.scene, this.camera)  
    // this.postProcessor.update()  // needed with postprocessing
  }

  start()
  {
    this.renderer.setAnimationLoop( () => 
    {
      this.update()
    })
  }

  stop()
  {
    this.renderer.setAnimationLoop( null )
  }

  destroy()
  {
    this.sizes.off('resize')

    //traverse the scene
    this.scene.traverse((child) =>
    {
      if(child instanceof THREE.Mesh)
      {
        child.geometry.dispose()
      }

      for (const key in child.material)
      {
        const value = child.material[key]
        if(value && typeof value.dispose === 'function')
        {
          value.dispose()
        }
      }
    })

    this.camera.controls.dispose()
    this.renderer.dispose()
    if(this.debug.active)
    {
      this.debug.ui.destroy()
    }
  }
}