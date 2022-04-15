import Stage from '../systems/Stage.js'
import * as THREE from 'three'
import GeoCube from '../objects/geoShapes/GeoCube.js'
import { mainService } from '../mainMachine.js'

export default class SplashWorld
{
  constructor()
  {     
    console.log("in the constructor")
    this.stage = new Stage()
    this.stage.camera.instance.position.set(0,1.6,5)
    this.scene = this.stage.scene
    this.time = this.stage.time
    // this.scene.add 
    this.scene.background = new THREE.Color(0x003049)
    this.renderer = this.stage.renderer

    // this.hemilight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 1 );
    // this.scene.add( this.hemilight );

    this.pointlight = new THREE.PointLight( 0xff0000, 5, 100 );
    this.pointlight.position.set( 5, 5, 5 );
    this.scene.add( this.pointlight );

    // this.light = new THREE.DirectionalLight( 0xffffff );
    // this.light.position.set( 1, 1, 1 ).normalize();
    // this.scene.add( this.light );


    const geometry = new THREE.PlaneGeometry( 10, 10, 10, 10 );
    const material = new THREE.MeshPhongMaterial( {color: 0x333333, side: THREE.DoubleSide} );
    this.plane = new THREE.Mesh( geometry, material );
    this.plane.rotateX(- Math.PI / 2)
    this.plane.translateZ(-1)
    this.scene.add( this.plane );

    this.objectsToUpdate = []
  }

  async init() 
  {
    this.raycaster = new THREE.Raycaster()
    this.workingMatrix = new THREE.Matrix4()
    this.workingVector = new THREE.Vector3() 

    this.cube = new GeoCube(1, 0xbb8844)
    this.scene.add(this.cube.model)
    this.objectsToUpdate.push(this.cube)

    mainService.send({type: 'LOADED'})
  }

  update()
  {

    this.cube.model.rotation.x += this.time.delta * 0.001
    this.cube.model.rotation.y += this.time.delta * 0.00075

    for(const object of this.objectsToUpdate)
    {
        if(object.update) {object.update()}
    }    
  }

  dispose() {
    this.stage.disableVR()

    this.cube.model.removeFromParent()
    this.plane.removeFromParent()
    // this.hemilight.removeFromParent()
    this.pointlight.removeFromParent()
    // this.light.removeFromParent()

    // this.light.removeFromParent()
    // console.log("aaa")
    // this.hemiblight.removeFromParent()
    // console.log("aaaa")
    // this.plane.removeFromParent()

  }
}