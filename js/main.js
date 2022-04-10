// import * as THREE from '../assets/three.js' // globally define THREE, for chunking maybe???
import * as THREE from 'three'  //  node module import
import Stage from './systems/Stage.js'
import { mainService } from './mainMachine.js'
// import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
// import { CustomVRButton } from './Utils/CustomVRButton.js'



/**
 * identify html elements
 */
const homebtn = document.querySelector('#homebtn')
const examplebtn = document.querySelector('#examplebtn')
const testbtn = document.querySelector('#testbtn')
const msgdisplay = document.querySelector('#msgdisplay')
const topnav = document.querySelector('#topnav')
const sceneContainer = document.querySelector('#scene-container')

/**
 * html to state machine event listeners
 */
homebtn.onclick = () => {mainService.send({type: 'HOME'})}
examplebtn.onclick = () => {mainService.send({type: 'EXAMPLE'})}
testbtn.onclick = () => {mainService.send({type: 'TEST'})}


/**
 * create Global stage
 */
const container = document.querySelector('#scene-container')
const stage = new Stage(container)
stage.init()

/**
 * world utility functions
 */
const killWorld = () => {
  stage.stop()
  stage.world.dispose()
  stage.update()
}

const setMenuActive = (menuName) => {
  menuName === 'home' ? homebtn.classList.add("active") : homebtn.classList.remove("active")
  menuName === 'test' ? testbtn.classList.add("active") : testbtn.classList.remove("active")
  menuName === 'example' ? examplebtn.classList.add("active") : examplebtn.classList.remove("active")
}

const STATE_TO_WORLD = {
  example: { path: './worlds/ExampleWorld.js', options: {vr: true }},
}

/**
 * subscribe to ui state
 * lazy load stage objects and initialize
 */
mainService.subscribe((state) => {
  setMenuActive(state.context.topnav)

  if (state.context.threeDisplay) {
    sceneContainer.style.zIndex = "10"
    topnav.style.display = 'none'
  } else {
    sceneContainer.style.zIndex = "-1"
    topnav.style.display = 'block'
  }
  
  if ( 
    state.value === 'home' ||
    state.value === 'test' 
  ) {
    if (stage.world) { killWorld() }
  }

  if ( state.value === 'example' ) {
    if (stage.world) { killWorld() }
    import('./worlds/ExampleWorld.js')
      .then((module) => 
      {
        stage.world = new module.default()
        stage.world.init(STATE_TO_WORLD.example.options)
        stage.start()
      })
  }
})
