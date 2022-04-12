import * as THREE from 'three'  //  node module import
import Stage from './systems/Stage.js'
import { mainService } from './mainMachine.js'




/**
 * identify html elements
 */
const homebtn = document.querySelector('#homebtn')
const threebtn = document.querySelector('#threebtn')
const vrbtn = document.querySelector('#vrbtn')
const arbtn = document.querySelector('#arbtn')
const storybtn = document.querySelector('#storybtn')
const aboutbtn = document.querySelector('#aboutbtn')
const nextbtn = document.querySelector('#nextbtn')

const sceneContainer = document.querySelector('#scene-container')

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

// homebtn.onmouseover = () => console.log("fuck you")
// homebtn.onmouseout = () => console.log("fuck you twice")



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

const uiDisplay = ( state ) => {
  if (state === 'home') 
  {
    homebtn.style.display = 'none'
    nextbtn.style.display = 'none'
    threebtn.style.display = 'block'
    vrbtn.style.display = 'block'
    arbtn.style.display = 'block'
    aboutbtn.style.display = 'block'
    storybtn.style.display = 'block'
  } 
  else if (state === 'loading') 
  {
    homebtn.style.display = 'none'
    nextbtn.style.display = 'none'
    threebtn.style.display = 'none'
    vrbtn.style.display = 'none'
    arbtn.style.display = 'none'
    aboutbtn.style.display = 'none'
    storybtn.style.display = 'none'
  }
  else 
  {
    homebtn.style.display = 'block'
    nextbtn.style.display = 'block'
    threebtn.style.display = 'none'
    vrbtn.style.display = 'none'
    arbtn.style.display = 'none'
    aboutbtn.style.display = 'none'
    storybtn.style.display = 'none'
  }
}

const setMenuActive = (menuName) => {
  menuName === 'three' ? threebtn.classList.add("active") : threebtn.classList.remove("active")
  menuName === 'vr' ? vrbtn.classList.add("active") : vrbtn.classList.remove("active")
  menuName === 'ar' ? arbtn.classList.add("active") : arbtn.classList.remove("active")
  menuName === 'story' ? storybtn.classList.add("active") : storybtn.classList.remove("active")
  menuName === 'about' ? aboutbtn.classList.add("active") : aboutbtn.classList.remove("active")
}

let currentState = null

const STATE_TO_WORLD = {
  home: { path: './worlds/HomeWorld.js', options: {vr: false }},
  // three: { path: './worlds/ThreeWorld.js', options: {vr: false }},
  three: { 
    first: {
      a: {path: './worlds/ThreeWorld.js', options: {vr: false }},
      b: {path: './worlds/ThreeWorld.js', options: {vr: false }},
      c: {path: './worlds/ThreeWorld.js', options: {vr: false }},
      d: {path: './worlds/ThreeWorld.js', options: {vr: false }},
    },
    second: {path: './worlds/AboutWorld.js', options: {vr: false }},
    third: {path: './worlds/StoryWorld.js', options: {vr: false }},
    forth: {path: './worlds/ARWorld.js', options: {vr: false }},
  },
  vr: { path: './worlds/VRWorld.js', options: {vr: true }},
  ar: { path: './worlds/ARWorld.js', options: {vr: true }},
  story: { path: './worlds/StoryWorld.js', options: {vr: false }},
  about: { path: './worlds/AboutWorld.js', options: {vr: false }},
}

/** 
 * searches the STATE_TO_WORLD object for a path, 
 * maybe should just return oject 
 */
const getPath = (stateValue) => 
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
  let stateMap = STATE_TO_WORLD
  for (let z = 0; z < header.length; z++) {
    const element = header[z]
    stateMap = stateMap[element]
  }
  return stateMap.path
}

/**
 * subscribe to ui state
 * lazy load stage objects and initialize
 */
mainService.subscribe((state) => {
  setMenuActive(state.context.topnav)
  uiDisplay(state.value)

  if (currentState !== state.value)
  {
    if (stage.world) { killWorld() }
    const thePath = getPath(state.value) || './worlds/HomeWorld.js'
    import(/* @vite-ignore */thePath)
      .then((module) => 
      {
        stage.world = new module.default()
        stage.world.init(STATE_TO_WORLD.home.options)
        stage.start()
        currentState = state.value
      })
    
  }
})
