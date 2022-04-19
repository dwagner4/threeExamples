import * as THREE from 'three'
import Sizes from './Sizes.js'
import Time from './Time.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import { CustomVRButton } from './CustomVRButton.js'
import VRcontrollers from './VRcontrollers.js'
import Debug from './Debug.js'
import { createGlbLoader } from './GlbLoader.js'

/** Options */
import PhysWorld from './/PhysWorld.js'
// import PostProcess from '../systems/PostProcess.js'

let instance = null

export default class Stage
{
  constructor(canvas, controller = 'orbit')
  {
    if(instance) 
    {
      return instance
    }
    instance = this

    this.name = "Stage 0"
    // Options
    this.canvas = canvas
    this.scene = new THREE.Scene()

    // Setup
    this.sizes = new Sizes()
    this.time = new Time()
    this.debug = new Debug()
    this.glbloader = createGlbLoader()

    this.camera = new Camera(controller)
    this.renderer = new Renderer()
    // this.postProcessor = new PostProcess()


    //  Sizes resize event
    this.sizes.on('resize', () => 
    {
      this.resize()
    })

    /** initially setting animation loop to null, later call start() in main.js */
    this.renderer.instance.setAnimationLoop( null )
  }

  enableVR( gripModels, controllerHandlers ) {
    this.renderer.instance.xr.enabled = true;
    this.VRbtn = new CustomVRButton(this.renderer.instance);
    this.controls =  new VRcontrollers( gripModels, controllerHandlers )

    // this.dolly = new THREE.Object3D();
    // this.dolly.position.z = 0;
    // this.dolly.add( this.stage.camera.instance );
    // this.dolly.position.set(1,1,5)
    // this.scene.add( this.dolly );
  }

  disableVR() {
    this.renderer.instance.xr.enabled = false;
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

  resize()
  {
    this.renderer.resize()
    // this.postProcessor.resize()
    this.camera.resize()
  }

  update()
  {
    this.time.tick()
    this.camera.update()
    
    this.physWorld?.step(
      1/60,
      this.time.delta,
      3
    )
    this.world?.update()
    

    this.renderer.update()  // not needed with post processing
    // this.postProcessor.update()  // needed with postprocessing
  }

  start()
  {
    this.renderer.instance.setAnimationLoop( () => 
    {
      this.update()
    })
  }

  stop()
  {
    this.renderer.instance.setAnimationLoop( null )
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
    this.renderer.instance.dispose()
    if(this.debug.active)
    {
      this.debug.ui.destroy()
    }
  }
}