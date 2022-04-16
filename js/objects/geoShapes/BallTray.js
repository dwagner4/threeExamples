import * as THREE from 'three'
import Stage from '../../systems/Stage.js'
import CANNON from 'cannon'

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
    const [balltrayData] = await Promise.all([
      this.stage.glbloader.loadAsync(balltrayUrl),
    ])
    this.model = balltrayData.scene.children[0];

    const floorShape = new CANNON.Plane()
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