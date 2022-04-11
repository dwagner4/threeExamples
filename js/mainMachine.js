import { createMachine, interpret, assign } from 'xstate'

const STATE_TO_WORLD = {
  HOME: { path: './worlds/HomeWorld.js', options: {vr: false }},
  THREE: { path: './worlds/ThreeWorld.js', options: {vr: false }},
  VR: { path: './worlds/VRWorld.js', options: {vr: true }},
  AR: { path: './worlds/ARWorld.js', options: {vr: true }},
  STORY: { path: './worlds/StoryWorld.js', options: {vr: false }},
  ABOUT: { path: './worlds/AboutWorld.js', options: {vr: false }},
}

const threeStates = {
  initial: 'first',
  states: {
    first: {
      entry: [ 'selecttest', 'setWorldPath' ],
      on: {
        NEXT: { target: 'second' }
      },
    },
    second: {
      entry: [ 'selecttest', 'setWorldPath' ],
      on: {
        NEXT: { target: 'third' }
      },
    },
    third: {
      entry: [ 'selecttest', 'setWorldPath' ],
      on: {
        NEXT: { target: 'forth' }
      },
    },
    forth: {
      entry: [ 'selecttest', 'setWorldPath' ],
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
        entry: [ 'selecthome', 'setWorldPath' ],
        on: {
          THREE: { target: 'three' },
          VR: { target: 'vr' },
          AR: { target: 'ar' },
          STORY: { target: 'story' },
          ABOUT: { target: 'about' },
        }
      },
      three: {
        entry: [ 'selecttest', 'logPath'] ,
        on: {
          HOME: { target: 'home' },
        },
        ...threeStates
      },
      vr: {
        entry: [ 'selecttest', 'setWorldPath' ],
        on: {
          HOME: { target: 'home' }
        }
      },
      ar: {
        entry: [ 'selecttest', 'setWorldPath' ],
        on: {
          HOME: { target: 'home' }
        }
      },
      story: {
        entry: [ 'selecttest', 'setWorldPath' ],
        on: {
          HOME: { target: 'home' }
        }
      },
      about: {
        entry: [ 'selecttest', 'setWorldPath' ],
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
      'setWorldPath': assign( { worldPath: (context, event) => STATE_TO_WORLD[event.type]?.path || null } ),
      // 'setWorldPath': assign( { worldPath: (context, event) => STATE_TO_WORLD[event.type]?.path || null } ),
      'logPath': (context, event) => {
        console.log(context, event)
      }
    },
  }
)

const mainService = interpret(mainMachine)
mainService.onTransition((state) => console.log(state))
mainService.start()

export { mainMachine, mainService }