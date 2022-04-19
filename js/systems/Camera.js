import Stage from './Stage.js'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class Camera
{
  constructor( controller = 'orbit' )
  {
    this.stage = new Stage()
    this.sizes = this.stage.sizes
    this.scene = this.stage.scene
    this.canvas = this.stage.canvas

    this.setInstance()
    if (controller === 'orbit'){
      this.setOrbitControls()
    }
    
  }

  setInstance()
  {
    this.instance = new THREE.PerspectiveCamera(
      35, 
      this.sizes.width / this.sizes.height,
      0.1,
      100
    )
    // this.instance.position.set(0,1.6,5)
    this.scene.add(this.instance)
    
  }

  setOrbitControls()
  {
    this.controls = new OrbitControls(this.instance, this.canvas)
    this.controls.enableDamping = true
  }

  resize()
  {
    this.instance.aspect = this.sizes.width / this.sizes.height
    this.instance.updateProjectionMatrix()
  }

  update()
  {
    this.controls.update()
  }
}