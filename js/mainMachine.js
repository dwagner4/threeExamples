import { createMachine, interpret, assign } from 'xstate'

const STATE_TO_WORLD = {
  HOME: { path: './worlds/HomeWorld.js', options: {vr: false }},
  THREE: { path: './worlds/ThreeWorld.js', options: {vr: false }},
  VR: { path: './worlds/VRWorld.js', options: {vr: true }},
  AR: { path: './worlds/ARWorld.js', options: {vr: true }},
  STORY: { path: './worlds/StoryWorld.js', options: {vr: false }},
  ABOUT: { path: './worlds/AboutWorld.js', options: {vr: false }},
}

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
      entry: [ 'selecttest' ],
      on: {
        NEXT: { target: 'second' }
      },
      ...thirdLevel
    },
    second: {
      entry: [ 'selecttest' ],
      on: {
        NEXT: { target: 'third' }
      },
    },
    third: {
      entry: [ 'selecttest' ],
      on: {
        NEXT: { target: 'forth' }
      },
    },
    forth: {
      entry: [ 'selecttest' ],
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
      'selecthome': assign( { topnav: 'home', msgdisplay: 'block', threeDisplay: false} ),
      'selecttest': assign( { topnav: 'test', msgdisplay: 'none', threeDisplay: false} ),
    },
  }
)

const mainService = interpret(mainMachine)
mainService.onTransition((state) => console.log(state))
mainService.start()

export { mainMachine, mainService }