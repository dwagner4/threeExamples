import * as THREE from 'three'  //  node module import
import Stage from './systems/Stage.js'
import { mainService } from './mainMachine.js'
import { 
  homeover, msgout,
  threeover, 
  vrover, 
  arover, 
  storyover, 
  aboutover, 
} from './mainFunctions.js'


/**
 * identify html elements
 */
const homebtn = document.querySelector('#homebtn')
const threebtn = document.querySelector('#threebtn')
const vrbtn = document.querySelector('#vrbtn')
const arbtn = document.querySelector('#arbtn')
const storybtn = document.querySelector('#storybtn')
const aboutbtn = document.querySelector('#aboutbtn')
const loadingSVG = document.querySelector('#loading')

/**
 * html to state machine event listeners
 */
homebtn.onclick = () => {mainService.send({type: 'HOME'})}
nextbtn.onclick = () => {mainService.send({type: 'NEXT'})}
threebtn.onclick = () => {mainService.send({type: 'THREE'})}
vrbtn.onclick = () => {mainService.send({type: 'VR'})}
arbtn.onclick = () => {mainService.send({type: 'AR'})}
aboutbtn.onclick = () => {mainService.send({type: 'ABOUT'})}
storybtn.onclick = () => {mainService.send({type: 'STORY'})}

homebtn.onmouseover = homeover
homebtn.onmouseout = msgout
threebtn.onmouseover = threeover
threebtn.onmouseout = msgout
vrbtn.onmouseover = vrover
vrbtn.onmouseout = msgout
arbtn.onmouseover = arover
arbtn.onmouseout = msgout
aboutbtn.onmouseover = aboutover
aboutbtn.onmouseout = msgout
storybtn.onmouseover = storyover
storybtn.onmouseout = msgout

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

// const setMenuActive = (menuName) => {
//   menuName === 'three' ? threebtn.classList.add("active") : threebtn.classList.remove("active")
//   menuName === 'vr' ? vrbtn.classList.add("active") : vrbtn.classList.remove("active")
//   menuName === 'ar' ? arbtn.classList.add("active") : arbtn.classList.remove("active")
//   menuName === 'story' ? storybtn.classList.add("active") : storybtn.classList.remove("active")
//   menuName === 'about' ? aboutbtn.classList.add("active") : aboutbtn.classList.remove("active")
// }

/** 
 * concatenates state.value keys with final text value, assumes xState state.value
 * like, 
 * home: { secondstage: 'bigpicture'} => homesecondstagebigpicture
 * any state with a unique world must be listed in FSM subscription 
 */
const parseState = (stateValue) => 
{
  let header = []
  let childState = stateValue
  let loop = true
  while(loop)
  {
    if (typeof childState === 'string' || childState instanceof String) 
    {
      header.push(childState)
      loop = false
    }
    else 
    {
      let keys = Object.keys(childState)
      let localKey = keys[0]
      header.push(localKey)
      childState = childState[localKey] 
    }
  }
  
  let startStr = ''
  for (let i = 0; i < header.length; i++) {
    const element = header[i];
    startStr = startStr + element
    
  }
  return startStr
}

/**
 * subscribe to ui state
 * lazy load world objects and initialize
 */
let currentStateStr = null

mainService.subscribe((state) => {
  // setMenuActive(state.context.topnav)
  

  homebtn.style.display = state.context.homebtn
  nextbtn.style.display = state.context.nextbtn
  threebtn.style.display = state.context.threebtn
  vrbtn.style.display = state.context.vrbtn
  arbtn.style.display = state.context.arbtn
  aboutbtn.style.display = state.context.aboutbtn
  storybtn.style.display = state.context.storybtn
  loadingSVG.style.display = state.context.loadingSVG

  // changing world, don't want to restart world if not changed
  const stateStr = parseState(state.value)
  if ( stateStr !== currentStateStr )
  {  
    if ( stateStr === 'home' ) {
      if (stage.world) { killWorld() }
      import('./worlds/SplashWorld.js')
        .then((module) => 
        {
          stage.world = new module.default()
          stage.world.init()
          stage.start()
        })
    }
    if ( stateStr === 'threefirst' ) {
      if (stage.world) { killWorld() }
      import('./worlds/HomeWorld.js')
        .then((module) => 
        {
          stage.world = new module.default()
          stage.world.init()
          stage.start()
        })
    }
    if ( stateStr === 'threesecond' ) {
      if (stage.world) { killWorld() }
      import('./worlds/ThreeWorld.js')
        .then((module) => 
        {
          stage.world = new module.default()
          stage.world.init()
          stage.start()
        })
    }
    if ( stateStr === 'threethird' ) {
      if (stage.world) { killWorld() }
      import('./worlds/ThreeWorld.js')
        .then((module) => 
        {
          stage.world = new module.default()
          stage.world.init()
          stage.start()
        })
    }
    if ( stateStr === 'threeforth' ) {
      if (stage.world) { killWorld() }
      import('./worlds/ThreeWorld.js')
        .then((module) => 
        {
          stage.world = new module.default()
          stage.world.init()
          stage.start()
        })
    }
    if ( stateStr === 'vr' ) {
      if (stage.world) { killWorld() }
      import('./worlds/VRWorld.js')
        .then((module) => 
        {
          stage.world = new module.default()
          stage.world.init()
          stage.start()
        })
    }
    if ( stateStr === 'ar' ) {
      if (stage.world) { killWorld() }
      import('./worlds/ARWorld.js')
        .then((module) => 
        {
          stage.world = new module.default()
          stage.world.init()
          stage.start()
        })
    }
    if ( stateStr === 'story' ) {
      if (stage.world) { killWorld() }
      import('./worlds/StoryWorld.js')
        .then((module) => 
        {
          stage.world = new module.default()
          stage.world.init()
          stage.start()
        })
    }
    if ( stateStr === 'about' ) {
      if (stage.world) { killWorld() }
      import('./worlds/AboutWorld.js')
        .then((module) => 
        {
          stage.world = new module.default()
          stage.world.init()
          stage.start()
        })
    }
    currentStateStr = stateStr
  }
})
