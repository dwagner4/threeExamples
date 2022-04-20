import Stage from '../systems/Stage.js'
import * as THREE from 'three'

import DancingGirl from '../objects/dancingGirl/DancingGirl.js'
import dirtColorUrl from '../../assets/textures/dirt/color.jpg?url'
import dirtNormalUrl from '../../assets/textures/dirt/normal.jpg?url'
import { mainService } from '../mainMachine.js'

export default class HomeWorld
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

    this.hemilight = new THREE.HemisphereLight( 0xffffff, 0x6688aa, 2.2 );
    this.scene.add( this.hemilight );

    this.light = new THREE.DirectionalLight( 0x888800, 0.25 );
    this.light.position.set( 1, 1, 1 ).normalize();
    this.scene.add( this.light );

    const geometry = new THREE.CircleGeometry( 1.5, 32 );

    const textureLoader = new THREE.TextureLoader()
    this.floorTextures = {}
    this.floorTextures.color = textureLoader.load(dirtColorUrl)
    this.floorTextures.color.encoding = THREE.sRGBEncoding
    this.floorTextures.color.repeat.set(1.5, 1.5)
    this.floorTextures.color.wrapS = THREE.RepeatWrapping
    this.floorTextures.color.wrapT = THREE.RepeatWrapping

    this.floorTextures.normal = textureLoader.load( dirtNormalUrl )
    this.floorTextures.normal.repeat.set(1.5, 1.5)
    this.floorTextures.normal.wrapS = THREE.RepeatWrapping
    this.floorTextures.normal.wrapT = THREE.RepeatWrapping

    // const material = new THREE.MeshBasicMaterial( {color: 0xff1600} );
    const material =  new THREE.MeshStandardMaterial({
      map: this.floorTextures.color,
      normalMap: this.floorTextures.normal,
      // wireframe: true
    })
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

    this.girl = new DancingGirl()
    await this.girl.init()
    console.log(this.girl)
    this.girl.model.scale.set(0.01,0.01,0.01)
    // this.girl.model.position.set(0,0,0)
    this.girl.model.translateZ(1)
    this.scene.add(this.girl.model)

    mainService.send({type: 'LOADED'})

    // this.cube = new GeoCube(1, 0xbb8844)
    // this.scene.add(this.cube.model)
    // this.objectsToUpdate.push(this.cube)


  }

  update()
  {

    // this.cube.model.rotation.x += this.time.delta * 0.001
    // this.cube.model.rotation.y += this.time.delta * 0.00075

    for(const object of this.objectsToUpdate)
    {
        if(object.update) {object.update()}
    }    
  }

  dispose() {
    this.stage.disableVR()

    this.girl.model.removeFromParent()
    this.plane.removeFromParent()
    this.hemilight.removeFromParent()
    this.light.removeFromParent()

    // this.light.removeFromParent()
    // console.log("aaa")
    // this.hemiblight.removeFromParent()
    // console.log("aaaa")
    // this.plane.removeFromParent()

  }
}