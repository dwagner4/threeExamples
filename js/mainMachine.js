import { createMachine, interpret, assign } from 'xstate'

const thirdLevel = {
  initial: 'a',
  states: {
    a: {
      entry: [ 'selecttest' ],
      on: {
        NEXT: { target: 'b' }
      },
    },
    b: {
      entry: [ 'selecttest' ],
      on: {
        NEXT: { target: 'c' }
      },
    },
    c: {
      entry: [ 'selecttest' ],
      on: {
        NEXT: { target: 'd' }
      },
    },
    d: {
      entry: [ 'selecttest' ],
      on: {
        NEXT: { target: 'a' }
      },
    },
  }
}

const threeStates = {
  initial: 'first',
  states: {
    first: {
      entry: [ 'selectnext' ],
      on: {
        NEXT: { target: 'second' }
      },
      // ...thirdLevel
    },
    second: {
      entry: [ 'selectnext' ],
      on: {
        NEXT: { target: 'third' }
      },
    },
    third: {
      entry: [ 'selectnext' ],
      on: {
        NEXT: { target: 'forth' }
      },
    },
    forth: {
      entry: [ 'selectnext' ],
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
      worldPath: null
    },
    states: {
      loading: {
        entry: [ 'selectload' ],
        on: {
          LOADED: {target: 'home' }
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
        entry: [ 'selecttest' ],
        on: {
          HOME: { target: 'home' },
        },
        ...threeStates
      },
      vr: {
        entry: [ 'selecttest' ],
        on: {
          HOME: { target: 'home' }
        }
      },
      ar: {
        entry: [ 'selecttest' ],
        on: {
          HOME: { target: 'home' }
        }
      },
      story: {
        entry: [ 'selecttest' ],
        on: {
          HOME: { target: 'home' }
        }
      },
      about: {
        entry: [ 'selecttest' ],
        on: {
          HOME: { target: 'home' }
        }
      },
    }
  },
  {
    actions: {
      'selecthome': assign( { 
        homebtn: 'block',
        nextbtn: 'none',
        threebtn: 'block',
        vrbtn: 'block',
        arbtn: 'block',
        aboutbtn: 'block',
        storybtn: 'block',
      } ),
      'selecttest': assign( { 
        homebtn: 'block',
        nextbtn: 'none',
        threebtn: 'none',
        vrbtn: 'none',
        arbtn: 'none',
        aboutbtn: 'none',
        storybtn: 'none',
      } ),
      'selectnext': assign( { 
        homebtn: 'block',
        nextbtn: 'block',
        threebtn: 'none',
        vrbtn: 'none',
        arbtn: 'none',
        aboutbtn: 'none',
        storybtn: 'none',
      } ),
    },
  }
)

const mainService = interpret(mainMachine)
mainService.onTransition((state) => console.log(state))
mainService.start()

export { mainMachine, mainService }