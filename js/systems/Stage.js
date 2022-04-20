import * as THREE from 'three'
import * as dat from 'lil-gui'
import Camera from './Camera.js'

import { CustomVRButton } from './CustomVRButton.js'
import VRcontrollers from './VRcontrollers.js'

import { createGlbLoader } from './Loader.js'

/** Options */
import PhysWorld from './/PhysWorld.js'
// import PostProcess from '../systems/PostProcess.js'

let instance = null

export default class Stage
{
  constructor(canvas, config = {controller:'orbit', debug: true})
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
      elapsedTime: 0,
      delta: 16,
      elapsed: 0,
    }
    if (config.debug) 
    { 
      this.debug = {
        active: window.location.hash === '#debug',
        ui: new dat.GUI()
      }
    }
    this.glbloader = createGlbLoader()
    this.canvas = canvas
    this.scene = new THREE.Scene()
    this.camera = new Camera(config.controller)


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
    
    this.camera.resize()
  }

  enableVR( gripModels, controllerHandlers ) {
    this.renderer.xr.enabled = true;
    this.VRbtn = new CustomVRButton(this.renderer);
    this.controls =  new VRcontrollers( gripModels, controllerHandlers )

    // this.dolly = new THREE.Object3D();
    // this.dolly.position.z = 0;
    // this.dolly.add( this.stage.camera.instance );
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

    this.camera.update()
    
    this.physWorld?.step(
      1/60,
      this.time.delta,
      3
    )
    this.world?.update()

    // not needed with post processing
    this.renderer.render(this.scene, this.camera.instance)  
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