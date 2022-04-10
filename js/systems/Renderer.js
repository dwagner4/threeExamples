
import * as THREE from 'three'
import Stage from './Stage.js'

export default class Renderer 
{
  constructor()
  {
    this.stage = new Stage()
    this.canvas = this.stage.canvas
    this.sizes = this.stage.sizes
    this.scene = this.stage.scene
    this.camera = this.stage.camera

    this.setInstance()
  }

  setInstance()
  {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true
    })
    this.instance.physicallyCorrectLights = true
    this.instance.outputEncoding = THREE.sRGBEncoding
    this.instance.toneMapping = THREE.CineonToneMapping
    this.instance.toneMappingExposure = 1.75
    this.instance.shadowMap.enabled = true
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap
    this.instance.setClearColor('#211d20')
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  }

  resize()
  {
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  }

  update()
  {
    this.instance.render(this.scene, this.camera.instance)
  }
}