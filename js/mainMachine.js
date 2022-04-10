import { createMachine, interpret, assign } from 'xstate'


const mainMachine = createMachine(
  {
    initial: 'home',
    context: {
      msgdisplay: 'none',
      topnav: 'home',
      threeDisplay: false,
    },
    states: {
      home: {
        entry: [ 'selecthome' ],
        on: {
          EXAMPLE: {target: 'example'},
          TEST: {target: 'test'},
        }
      },
      test: {
        entry: [ 'selecttest'],
        on: {
          HOME: {target: 'home'},
          EXAMPLE: {target: 'example'},
        }
      },
      example: {
        entry: [ 'selectexample'],
        on: {
          HOME: {target: 'home'},
          TEST: {target: 'test'},
        }
      },
    }
  },
  {
    actions: {
      'selecthome': assign( { topnav: 'home', msgdisplay: 'block', threeDisplay: false} ),
      'selecttest': assign( { topnav: 'test', msgdisplay: 'none', threeDisplay: false} ),
      'selectexample': assign( { topnav: 'example', msgdisplay: 'none', threeDisplay: true} ),
    },
  }
)

const mainService = interpret(mainMachine)
// mainService.onTransition((state) => console.log(state.value, state.context))
mainService.start()

export { mainMachine, mainService }