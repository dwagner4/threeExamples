import Stage from '../systems/Stage.js'
import * as THREE from 'three'
import GeoCube from '../objects/geoShapes/GeoCube.js'
import { mainService } from '../mainMachine.js'

import BallTray from '../objects/geoShapes/BallTray.js'
import FallingBalls from '../objects/geoShapes/FallingBalls.js'

export default class SplashWorld
{
  constructor()
  {     
    console.log("in the constructor")
    this.stage = new Stage()
    this.stage.camera.instance.position.set(0,3,8)
    this.scene = this.stage.scene
    this.time = this.stage.time
    // this.scene.add 
    this.scene.background = new THREE.Color(0x0060a0)
    this.renderer = this.stage.renderer

    this.lastBall = 0

    // this.hemilight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 1 );
    // this.scene.add( this.hemilight );

    this.pointlight = new THREE.PointLight( 0xffaaaa, 5, 100 );
    this.pointlight.position.set( 2, 2, 2 );
    this.scene.add( this.pointlight );

    this.light = new THREE.DirectionalLight( 0xffffff );
    this.light.position.set( 1, 1, 1 ).normalize();
    this.scene.add( this.light );

    // this.theBall = new THREE.Mesh( 
    //   new THREE.SphereGeometry(1, 20, 20), 
    //   new THREE.MeshBasicMaterial({
    //     color: '#ff0000',
    //     metalness: 0.3,
    //     roughness: 0.4,
    //   }) 
    // )
    // console.log(this.theBall)
    // this.scene.add(this.theBall)


    // const geometry = new THREE.PlaneGeometry( 10, 10, 10, 10 );
    // const material = new THREE.MeshPhongMaterial( {color: 0x333333, side: THREE.DoubleSide} );
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

    this.fallingballs = new FallingBalls(20)
    this.fallingballs.init()

    this.balltray = new BallTray()
    await this.balltray.init()
    // this.balltray.model.rotateX(- Math.PI / 2)
    this.scene.add(this.balltray.model)
    this.stage.physWorld.addBody(this.balltray.body)

    mainService.send({type: 'LOADED'})
  }

  update()
  {

    // const ballWait = this.time.elapsed - this.lastBall
    // if (ballWait > 0.5) 
    // {
    //   const aBall = new FallingBalls()
    //   this.stage.add(aBall.model)
    // }

    for(const object of this.objectsToUpdate)
    {
        if(object.update) {object.update()}
    }    
  }

  dispose() {
    this.stage.disableVR()

    // this.cube.model.removeFromParent()
    this.balltray.model.removeFromParent()
    // this.plane.removeFromParent()
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