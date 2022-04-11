import { createMachine, interpret, assign } from 'xstate'

const threeStates = {
  initial: 'first',
  states: {
    first: {
      on: {
        NEXT: { target: 'second' }
      },
    },
    second: {
      on: {
        NEXT: { target: 'third' }
      },
    },
    third: {
      on: {
        NEXT: { target: 'forth' }
      },
    },
    forth: {
      on: {
        NEXT: { target: 'first' }
      },
    },
  }
}
const mainMachine = createMachine(
  {
    initial: 'home',
    context: {
      msgdisplay: 'none',
      topnav: 'home',
      threeDisplay: false,
    },
    states: {
      loading: {
        entry: [ 'selectload' ],
        on: {
          LOADED: {target: 'home'}
        }
      },
      home: {
        entry: [ 'selecthome' ],
        on: {
          THREE: { target: 'three' },
          VR: { target: 'vr' },
          AR: { target: 'ar' },
          STORY: { target: 'story' },
          ABOUT: { target: 'about' },
        }
      },
      three: {
        entry: [ 'selecttest'],
        on: {
          HOME: { target: 'home' },
        },
        ...threeStates
      },
      vr: {
        entry: [ 'selecttest'],
        on: {
          HOME: { target: 'home' }
        }
      },
      ar: {
        entry: [ 'selecttest'],
        on: {
          HOME: { target: 'home' }
        }
      },
      story: {
        entry: [ 'selecttest'],
        on: {
          HOME: { target: 'home' }
        }
      },
      about: {
        entry: [ 'selecttest'],
        on: {
          HOME: { target: 'home' }
        }
      },
    }
  },
  {
    actions: {
      'selecthome': assign( { topnav: 'home', msgdisplay: 'block', threeDisplay: false} ),
      'selecttest': assign( { topnav: 'test', msgdisplay: 'none', threeDisplay: false} ),
    },
  }
)

const mainService = interpret(mainMachine)
mainService.onTransition((state) => console.log(state.value, state.context))
mainService.start()

export { mainMachine, mainService }