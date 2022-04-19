import Stage from '../../systems/Stage.js'
import * as THREE from 'three'


import knightUrl from '../../../assets/models/knight/DracoKnight-idle.glb?url'
import walkingUrl from '../../../assets/models/knight/walking.glb?url'
import runningUrl from '../../../assets/models/knight/running.glb?url'



export default class Knight
{
  constructor()
  {
    this.stage = new Stage()
    this.model = null
    this.body = null
    this.animation = {}

    this.loopcount = 0

    console.log(knightUrl)

    // Debug
    if(this.stage.debug.active) 
    {
      this.debugFolder = this.stage.debug.ui.addFolder('Knight')
    }

    this.stage.world.objectsToUpdate.push(this)
  }

  async init()
  {
    const [knightData, walkingData, runningData] = await Promise.all([
      this.stage.glbloader.loadAsync(knightUrl),
      this.stage.glbloader.loadAsync(walkingUrl),
      this.stage.glbloader.loadAsync(runningUrl),
    ]);

    console.log(knightData)
    console.log(walkingData)
    console.log(runningData)

    this.model = knightData.scene.children[0];
    this.animations = [ ...knightData.animations, ...walkingData.animations, ...runningData.animations ]
    this.setAnimation()
  }

  setAnimation()
  {
    this.animation = {}
    this.animation.mixer = new THREE.AnimationMixer(this.model)
    
    this.animation.actions = {}

    this.animation.actions.idle = this.animation.mixer.clipAction(this.animations[0]).setLoop(THREE.LoopRepeat, 2)
    this.animation.actions.walking = this.animation.mixer.clipAction(this.animations[1]).setLoop(THREE.LoopRepeat, 5)
    // this.animation.actions.idle.setLoop(THREE.LoopOnce, 1)
    this.animation.actions.running = this.animation.mixer.clipAction(this.animations[2]).setLoop(THREE.LoopRepeat, 8)
    // this.animation.actions.idle.setLoop(THREE.LoopOnce, 1)

    

    this.animation.actions.current = this.animation.actions.walking
    this.animation.actions.current.play()

    this.animation.mixer.addEventListener( 'loop', (e) => {
      console.log(e)
      this.loopcount++
      console.log(this.loopcount, e.action._loopCount, e.action._clip.name)
      if ( this.loopcount >= e.action.repetitions - 1) {
      // if ( this.loopcount >= 5) {
        this.loopcount = 0
        const actionName = e.action._clip.name
        if ( actionName === 'walking' ) {
          this.animation.play('running')
        }
        if ( actionName === 'running.001' ) {
          this.animation.play('idle')
        }
        if ( actionName === 'idle' ) {
          this.animation.play('walking')
        }
      }
    })

    // this.animation.mixer.addEventListener( 'finished', (e) => {
    //   console.log(e)
    //   const actionName = e.action._clip.name
    //   if ( actionName === 'walking' ) {
    //     this.animation.play('running')
    //   }
    // })

    this.animation.play = (name) => 
    {
      const newAction = this.animation.actions[name]
      const oldAction = this.animation.actions.current

      newAction.reset()
      newAction.play()
      newAction.crossFadeFrom(oldAction, 1)

      this.animation.actions.current = newAction
    }

    if(this.stage.debug.active)
    {
      const debugObject = {
        playIdle: () => {this.animation.play('idle')},
        playWalking: () => {this.animation.play('walking')},
        playRunning: () => {this.animation.play('running')},
      }
      this.debugFolder.add(debugObject, 'playIdle')
      this.debugFolder.add(debugObject, 'playWalking')
      this.debugFolder.add(debugObject, 'playRunning')
    }
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