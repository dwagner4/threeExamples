import Stage from '../../systems/Stage.js'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

import dancingGirlUrl from '../../../assets/models/sambagirl/girl2.glb?url'

export default class DancingGirl
{
  constructor()
  {
    this.stage = new Stage()
    this.model = null
    this.body = null
    this.animation = {}

    console.log(dancingGirlUrl)

    // Debug
    // if(this.stage.debug.active) 
    // {
    //   this.debugFolder = this.stage.debug.ui.addFolder('Knight')
    // }

    this.stage.world.objectsToUpdate.push(this)
  }

  async init()
  {
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('/draco/')
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader)

    const [girlData] = await Promise.all([
      loader.loadAsync(dancingGirlUrl),
    ]);

    console.log(girlData)

    this.model = girlData.scene.children[0];
    this.animations = [ ...girlData.animations ]
    this.setAnimation()
  }

  setAnimation()
  {
    this.animation = {}
    this.animation.mixer = new THREE.AnimationMixer(this.model)
    this.animation.actions = {}

    this.animation.actions.dance = this.animation.mixer.clipAction(this.animations[0])
    // this.animation.actions.walking = this.animation.mixer.clipAction(this.animations[1])
    // this.animation.actions.running = this.animation.mixer.clipAction(this.animations[2])

    this.animation.actions.current = this.animation.actions.dance
    this.animation.actions.current.play()

    this.animation.play = (name) => 
    {
      const newAction = this.animation.actions[name]
      const oldAction = this.animation.actions.current

      newAction.reset()
      newAction.play()
      newAction.crossFadeFrom(oldAction, 1)

      this.animation.actions.current = newAction
    }

    // if(this.stage.debug.active)
    // {
    //   const debugObject = {
    //     playIdle: () => {this.animation.play('idle')},
    //     playWalking: () => {this.animation.play('walking')},
    //     playRunning: () => {this.animation.play('running')},
    //   }
    //   this.debugFolder.add(debugObject, 'playIdle')
    //   this.debugFolder.add(debugObject, 'playWalking')
    //   this.debugFolder.add(debugObject, 'playRunning')
    // }
  }

  setBody()
  {

  }

  update()
  {
    this.animation.mixer?.update(this.stage.time.delta * 0.001)
  }

  dispose()
  {

  }
}