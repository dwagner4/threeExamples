import * as THREE from 'three'
import Stage from '../exp0/Stage.js'  // a singleton
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'

export default class PostProcess
{
  constructor()
  {
    this.stage = new Stage()
    this.scene = this.stage.scene
    this.sizes = this.stage.sizes
    this.camera = this.stage.camera.instance
    this.renderer = this.stage.renderer.instance
    
    this.renderTarget = new THREE.WebGLMultipleRenderTargets(
      800,
      600,
      1,
      {
          minFilter: THREE.LinearFilter,
          magFilter: THREE.LinearFilter,
          format: THREE.RGBAFormat
      }
    )

    this.setInstance()
  }

  setInstance()
  {
    this.instance = new EffectComposer(this.renderer, this.renderTarget)

    const renderPass = new RenderPass(this.scene, this.camera)
    this.instance.addPass(renderPass)
  }

  resize()
  {
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  }

  update()
  {
    this.instance.render()
  }
}