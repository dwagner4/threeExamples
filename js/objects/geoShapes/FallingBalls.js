import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import Stage from '../../systems/Stage.js'

export default class FallingBalls
{
  constructor(numBalls)
  {
    this.stage = new Stage()
    this.theBalls = []
    this.time = this.stage.time
    this.lastBall = Date.now()
    this.ballcount = 0
    this.stage.enablePhysics()
    this.numberOfBalls = numBalls
    // this.stage.world.objectsToUpdate.push(this)
  }

  async init() {
    this.stage.world.objectsToUpdate.push(this)
    this.createABall()
  }

  createABall() 
  {
    const ballRadius = Math.random() * 0.2 + 0.1
    const theBall = {}
    theBall.model = new THREE.Mesh( 
      new THREE.SphereGeometry(ballRadius, 20, 20), 
      new THREE.MeshStandardMaterial({
        color: Math.random() * 0xffffff,//0x0000ff, //'#ff0000',
        metalness: 0.3,
        roughness: 0.4,
      }) 
    )

    

    const shape = new CANNON.Sphere(ballRadius)
    theBall.body = new CANNON.Body({
      mass: 1,
      position: new CANNON.Vec3(
        Math.random() * 1 - 0.5, 
        5, 
        Math.random() * 1 - 0.5
      ),
      shape: shape,
      // material: this.physWorld.defaultContactMaterial 
    })
    this.theBalls.push(theBall)
    // console.log(this.theBalls)
    this.stage.scene.add(theBall.model)
    this.stage.physWorld.addBody(theBall.body)
  }

  update() {
    
    const currentTime = Date.now()
    const ballWait = currentTime - this.lastBall
    if (ballWait > 500) 
    {
      if (this.theBalls.length < this.numberOfBalls) 
      {
        const aBall = this.createABall()
        
      }
      else 
      {
        this.theBalls[this.ballcount].body.position = new CANNON.Vec3(0, 5, 0)
        this.theBalls[this.ballcount].body.velocity = new CANNON.Vec3(0, 0, 0)
        this.ballcount >= this.numberOfBalls - 1 ? this.ballcount = 0 : this.ballcount++
      }
      this.lastBall = currentTime
    }
    

    this.theBalls.forEach((b) => {
      b.model.position.copy(b.body.position)
    })

  }

  dispose() {
    this.theBalls.forEach( (el) => ell = null)
  }
  
}

