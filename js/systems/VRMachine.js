import { createMachine, interpret, assign } from 'xstate'

const VRMachine = createMachine({
  initial: 'blue',
  context: {
    profile: null,
  },
  on: {
    CONTROLLER_PROFILE: {
      actions: [ 'what', 'setProfile' ]
    },
    RIGHT_AXES: {
      actions: [ 'what', 'setRightAxes']
    },
    RIGHT_BUTTONS: {
      actions: [ 'what', 'setRightBtns']
    },
    LEFT_AXES: {
      actions: [ 'what', 'setLeftAxes']
    },
    LEFT_BUTTONS: {
      actions: [ 'what', 'setLeftBtns']
    },
    NONE_AXES: {
      actions: [ 'what', 'setNoneAxes']
    },
    NONE_BUTTONS: {
      actions: [ 'what', 'setNoneBtns']
    },
  },
  states: {
    blue: {
      on: {
        
      }
    },
    red:{
      on: {
        
      }
    },
    green: {
      on: {
        
      }
    }
  }
},{
  actions: {
    'what': (context, event) => {console.log(context, event)},
    'setProfile': assign({
      profile: (context, event) => event.payload
    }),
    'setRightBtns': assign({
      rightBtns: (context, event) => event.payload
    }),
    'setRightAxes': assign({
      rightAxes: (context, event) => event.payload
    }),
    'setLeftBtns': assign({
      leftBtns: (context, event) => event.payload
    }),
    'setLeftAxes': assign({
      leftAxes: (context, event) => event.payload
    }),
    'setNoneBtns': assign({
      noneBtns: (context, event) => event.payload
    }),
    'setNoneAxes': assign({
      noneAxes: (context, event) => event.payload
    }),
  }
})

const VRService = interpret(VRMachine)
// worldVRService.onTransition((state) => console.log(state.value, state.context))
VRService.start()

export { VRMachine, VRService }