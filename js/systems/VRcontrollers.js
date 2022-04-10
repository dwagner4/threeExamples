
import * as THREE from 'three';
import Stage from './Stage.js'
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js';
import {
	Constants as MotionControllerConstants,
	fetchProfile,
	MotionController
} from 'three/examples/jsm//libs/motion-controllers.module.js';
import { VRService } from './VRMachine.js'

const DEFAULT_PROFILES_PATH = 'https://cdn.jsdelivr.net/npm/@webxr-input-profiles/assets@1.0/dist/profiles';
const DEFAULT_PROFILE = 'generic-trigger';

export default class VRcontrollers
{
  constructor(gripModels, handlers) 
  {
    this.stage = new Stage()
    this.scene = this.stage.scene
    this.renderer = this.stage.renderer.instance

    this.rightAxes = [  ]
    this.leftAxes = [  ]
    this.noneAxes = [  ]
    this.rightButtons = [  ]
    this.leftButtons = [  ]
    this.noneButtons = [  ]

    this.controllers = [];
    const self = this


    // this.addEventListener( 'connected', onConnected ); 

    /**
     * handler for when the VR button is clicked and the controllers are connected, called once for each controller
     * @param {*} event 
     */
    function onConnected( event ) {
      console.log(event)
      const hand = event.data.handedness
      const info = {};
      info.handedness = hand
      fetchProfile( event.data, DEFAULT_PROFILES_PATH, DEFAULT_PROFILE ).then( ( { profile, assetPath } ) => {
        info.name = profile.profileId;
          info.targetRayMode = event.data.targetRayMode;

          Object.entries( profile.layouts ).forEach( ( [key, layout] ) => {
              const components = {};
              Object.values( layout.components ).forEach( ( component ) => {
                  components[component.rootNodeName] = component.gamepadIndices;
              });
              info[key] = components;
          });
          // console.log(info)
          VRService.send({type: 'CONTROLLER_PROFILE', payload: info})
      } );

      let hasCamera = false
      self.stage.world.dolly.children.forEach((child) => {
        if (child.userData.camera === true) {hasCamera = true}
      })
      console.log('WTF?', hasCamera)
      if (!hasCamera) {
        self.stage.world.dolly.add( self.stage.camera.instance )
        self.stage.world.dolly.userData.camera = true
      }
    }
    
    for ( let i = 0; i < 2; i++ ) {
        const controller = this.renderer.xr.getController( i );
        console.log(controller)

        controller.addEventListener( 'connected', onConnected ); 

        // imported eventlisteners
        controller.addEventListener( 'select', handlers.onSelect );
        controller.addEventListener( 'selectstart', handlers.onSelectStart );
        controller.addEventListener( 'selectend', handlers.onSelectEnd );
        controller.addEventListener( 'squeeze', handlers.onSqueeze );
        controller.addEventListener( 'squeezestart', handlers.onSqueezeStart );
        controller.addEventListener( 'squeezeend', handlers.onSqueezeEnd );
        controller.addEventListener( 'inputsourceschange', handlers.onInputSourcesChange );
  
        this.scene.add( controller );
        
        this.controllers.push( controller );
        
        const grip = this.renderer.xr.getControllerGrip( i );

        if (gripModels[i]) {
          grip.add(gripModels[i])
        }
        else {
          const controllerModelFactory = new XRControllerModelFactory();
          const defaultModel = controllerModelFactory.createControllerModel( grip )
          defaultModel.add(
            new THREE.Line( 
              new THREE.BufferGeometry().setFromPoints( [ new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, -1, - 1 ) ] )
            )
          )
          grip.add(defaultModel)
        }
        this.stage.world.dolly.add( grip ); 
        // let hasCamera = false
        // this.stage.world.dolly.children.forEach((child) => {
        //   if (child.userData.camera) {hasCamera = true}
        // })
        // if (!hasCamera) {
        //   this.stage.world.dolly.add( this.stage.camera.instance )
        //   this.stage.world.dolly.userData.camera = true
        //   console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
        // }
        // console.log(this.stage.world.dolly)
    }
  }

  isNotEqualFlatArray(a,b) {
    if (a.length != b.length) return true 
    let result = false
    for(let i = 0; i < a.length; i++) {
      if(a[i] !== b[i] ) {result = true} 
    }
    return result
  }

  updateGamepadState(){
    if ( this.renderer.xr.isPresenting ){
      const session = this.renderer.xr.getSession();
      if (session.inputSources.length == 0) { return }
      const inputSources = session.inputSources;

      // console.log(this.renderer.xr.getControllerGrip(0).matrixWorld)

      inputSources.forEach( (inputSource) =>{
        const gp = inputSource.gamepad;
        const axes = gp.axes;
        const buttons = gp.buttons;
        const handedness = inputSource.handedness;
        const buttonValues = buttons.map(el => el.value)
        if (handedness == 'right') {
          if( this.isNotEqualFlatArray(axes, this.rightAxes) ) {
            this.rightAxes = axes
            VRService.send({type: 'RIGHT_AXES', payload: axes})
          }
          if( this.isNotEqualFlatArray(buttonValues, this.rightButtons) ) {
            this.rightButtons = buttonValues
            VRService.send({type: 'RIGHT_BUTTONS', payload: buttonValues})
          }
        }
        if (handedness == 'left') {
          if( this.isNotEqualFlatArray(axes, this.leftAxes) ) {
            this.leftAxes = axes
            VRService.send({type: 'LEFT_AXES', payload: axes})
          }
          if( this.isNotEqualFlatArray(buttonValues, this.leftButtons) ) {
            this.leftButtons = buttonValues
            VRService.send({type: 'LEFT_BUTTONS', payload: buttonValues})
          }
        }
        if (handedness == 'none') {
          if( this.isNotEqualFlatArray(axes, this.noneAxes) ) {
            this.noneAxes = axes
            VRService.send({type: 'NONE_AXES', payload: axes})
          }
          if( this.isNotEqualFlatArray(buttonValues, this.noneButtons) ) {
            this.noneButtons = buttonValues
            VRService.send({type: 'NONE_BUTTONS', payload: buttonValues})
          }
        }
      })
    }    
  }

  update(){
    if (this.renderer.xr.isPresenting ){
      this.updateGamepadState();
    }
  }
}
