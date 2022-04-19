import * as THREE from 'three'
import Stage from '../../systems/Stage.js'
import * as CANNON from 'cannon-es'

import balltrayUrl from '../../../assets/models/balltray/balltray.glb?url'


export default class BallTray 
{
  constructor()
  {
    this.stage = new Stage()
    this.model = null
    this.body = null
  }

  async init()
  {
    // const [balltrayData] = await Promise.all([
    //   this.stage.glbloader.loadAsync(balltrayUrl),
    // ])
    // this.model = balltrayData.scene.children[0];
    const geometry = new THREE.BoxGeometry( 6, 0.5, 6 );
    const material = new THREE.MeshStandardMaterial( {color: 0x3388bb, roughness: 0.5,  metalness: 0.5} );
    this.model = new THREE.Mesh( geometry, material );
    this.model.receiveShadow = true
    // this.plane.rotateX(- Math.PI / 2)
    // this.plane.translateZ(-1)
    // this.scene.add( this.plane );

    const floorShape = new CANNON.Box(new CANNON.Vec3(3, 3, 0.25),)
    this.body = new CANNON.Body()
    this.body.mass = 0
    this.body.quaternion.setFromAxisAngle( 
        new CANNON.Vec3(-1,0,0),
        Math.PI * 0.5
    )
    this.body.addShape(floorShape)
  }

  update() 
  {
    
  }
}