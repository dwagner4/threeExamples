import Stage from '../systems/Stage.js'
import * as THREE from 'three'
import VRcontrollers from '../systems/VRcontrollers.js'
import { controllerHandlers } from './bubbleWorldVRhandlers.js'
import { VRService } from '../systems/VRMachine.js'
import { mainService } from '../mainMachine.js'

import Knight from '../objects/humans/Knight.js'

export default class VRWorld
{
  constructor()
  {     
    console.log("in the constructor")
    this.stage = new Stage()
    this.stage.camera.position.set(0,1.6,5)
    this.scene = this.stage.scene
    this.time = this.stage.time
    // this.scene.add 
    this.scene.background = new THREE.Color(0x003049)
    this.renderer = this.stage.renderer

    this.hemilight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 1 );
    this.scene.add( this.hemilight );

    this.light = new THREE.DirectionalLight( 0xffffff );
    this.light.position.set( 1, 1, 1 ).normalize();
    this.scene.add( this.light );


    const geometry = new THREE.PlaneGeometry( 10, 10, 10, 10 );
    const material = new THREE.MeshBasicMaterial( {color: 0x333333, side: THREE.DoubleSide } );
    this.plane = new THREE.Mesh( geometry, material );
    this.plane.rotateX(- Math.PI / 2)
    this.plane.translateZ(-1)
    this.scene.add( this.plane );

    this.objectsToUpdate = []
  }

  async init() 
  {

    this.knight = new Knight()
    await this.knight.init()
    console.log(this.knight)
    this.knight.model.scale.set(0.01,0.01,0.01)
    // this.knight.model.position.set(0,0,0)
    this.knight.model.translateZ(1)
    this.scene.add(this.knight.model)
    // console.log(this.knight.mixer)

    this.dolly = new THREE.Object3D();
    // this.dolly.add( this.stage.camera );
    this.dolly.position.set(0,0,5)
    this.scene.add( this.dolly );

    if (true) {
      const gripModels = []
      this.stage.enableVR( gripModels, controllerHandlers )

      // Add custom grip models, light saber, etc...
      
      // this.controls =  new VRcontrollers( gripModels, controllerHandlers )
      VRService.subscribe((state) => {
        this.rightJoystick = state.context.rightAxes
        this.rightButtons = state.context.rightBtns        
      })

      // this.dolly = new THREE.Object3D();
      // this.dolly.add( this.stage.camera );
      // this.dolly.position.set(1,1,5)
      // this.scene.add( this.dolly );
      
      // this.dummyCam = new THREE.Object3D();
      // this.stage.camera.add( this.dummyCam );
    }

   
    this.raycaster = new THREE.Raycaster()
    this.workingMatrix = new THREE.Matrix4()
    this.workingVector = new THREE.Vector3() 

    mainService.send({type: 'LOADED'})
  }

  update()
  {
    if (this.rightJoystick?.length >= 2) {
      this.scene.background = new THREE.Color(0x000000)
      this.rightJoystick.xAxis > 0.5 ? this.scene.background = new THREE.Color(0xff0000) : this.scene.background = new THREE.Color(0x8888ff)
    } else {
      this.scene.background = new THREE.Color(0x003049)
    }
    if (this.rightButtons?.xr_standard_thumbstick === 1 ) {
      this.scene.background = new THREE.Color(0xddffdd)
    }
    this.controls?.update()

    for(const object of this.objectsToUpdate)
    {
        if(object.update) {object.update()}
    }    
  }

  dispose() {
    this.stage.disableVR()
    this.knight.model.removeFromParent()
    this.plane.removeFromParent()
    this.hemilight.removeFromParent()
    this.light.removeFromParent()
    // this.light.removeFromParent()
    // this.ambLight.removeFromParent()
  }
}