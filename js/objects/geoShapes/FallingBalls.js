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
    const theBall = {}
    theBall.model = new THREE.Mesh( 
      new THREE.SphereGeometry(0.2, 20, 20), 
      new THREE.MeshStandardMaterial({
        color: '#ff0000',
        metalness: 0.3,
        roughness: 0.4,
      }) 
    )
    console.log(theBall)
    

    const shape = new CANNON.Sphere(0.2)
    theBall.body = new CANNON.Body({
      mass: 1,
      position: new CANNON.Vec3(0, 5, 0),
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
        console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
      }
      this.lastBall = currentTime
    }
    

    this.theBalls.forEach((b) => {
      b.model.position.copy(b.body.position)
    })

  }

  dispose() {}
  // const theBall = {}
  // const geometry = new SphereGeometry(0.2, 20, 20)
  // const material = new THREE.MeshStandardMaterial({
  //   color: '#777777',
  //   metalness: 0.3,
  //   roughness: 0.4,
  // })
  // theBall.model = new THREE.Mesh( geometry, material )

  // theBall.body = new CANNON.Body({
  //   mass: 1,
  //   position: new CANNON.Vec3(xx, 15, zz),
  //   shape: shape,
  //   // material: this.physWorld.defaultContactMaterial 
  // })
}

