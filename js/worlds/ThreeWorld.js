import Stage from '../systems/Stage.js'
import * as THREE from 'three'
import Environment from '../objects/village/Environment.js'
import { mainService } from '../mainMachine.js'

export default class ThreeWorld
{
  constructor()
  {     
    console.log("in the constructor")
    this.stage = new Stage()
    this.stage.camera.position.set(0,15,50)
    this.stage.camera.far = 2000
    this.scene = this.stage.scene
    this.time = this.stage.time
    // this.scene.add 
    this.scene.background = new THREE.Color(0x003049)
    this.renderer = this.stage.renderer

    this.hemilight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.75 );
    this.scene.add( this.hemilight );

    this.light = new THREE.DirectionalLight( 0xffffff, 1 );
    this.light.position.set( 1, 1, 1 ).normalize();
    this.scene.add( this.light );


    // const geometry = new THREE.PlaneGeometry( 10, 10, 10, 10 );
    // const material = new THREE.MeshBasicMaterial( {color: 0x333333, side: THREE.DoubleSide, wireframe: true} );
    // this.plane = new THREE.Mesh( geometry, material );
    // this.plane.rotateX(- Math.PI / 2)
    // this.plane.translateZ(-1)
    // this.scene.add( this.plane );

    this.objectsToUpdate = []
  }

  async init() 
  {
    this.raycaster = new THREE.Raycaster()
    this.workingMatrix = new THREE.Matrix4()
    this.workingVector = new THREE.Vector3() 

    this.environment = new Environment()
    await this.environment.init()
    this.scene.add(this.environment.model)
    

    mainService.send({type: 'LOADED'})
  }

  update()
  {

    for(const object of this.objectsToUpdate)
    {
        if(object.update) {object.update()}
    }    
  }

  dispose() {
    this.stage.disableVR()
    
    
    this.hemilight.removeFromParent()
    this.light.removeFromParent()
    this.environment.model.removeFromParent()
    
    // this.light.removeFromParent()
    // console.log("aaa")
    // this.hemiblight.removeFromParent()
    // console.log("aaaa")
    // this.plane.removeFromParent()
    
  }
}