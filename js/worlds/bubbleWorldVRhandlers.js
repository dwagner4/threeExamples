const controllerHandlers = {
  // left: {
    onSelect: (e) => {
      switch (e.data.handedness) {
        case 'right':
          console.log('right onSelect')
          break
        case 'left': 
          console.log('left onSelect')
          break
        default:
          console.log('default onSelect')
      }
    },
    onSelectStart: (e) => {
      switch (e.data.handedness) {
        case 'right':
          console.log('right onSelectStart')
          break
        case 'left': 
          console.log('left onSelectStart')
          break
        default:
          console.log('default onSelectStart')
      }
    },
    onSelectEnd: (e) => {
      switch (e.data.handedness) {
        case 'right':
          console.log('right onSelectEnd')
          break
        case 'left': 
          console.log('left onSelectEnd')
          break
        default:
          console.log('default onSelectEnd')
      }
    },
    onSqueeze: (e) => {
      switch (e.data.handedness) {
        case 'right':
          console.log('right onSqueeze')
          break
        case 'left': 
          console.log('left onSqueeze')
          break
        default:
          console.log('default onSqueeze')
      }
    },
    onSqueezeStart: (e) => {
      switch (e.data.handedness) {
        case 'right':
          console.log('right onSqueezeStart')
          break
        case 'left': 
          console.log('left onSqueezeStart')
          break
        default:
          console.log('default onSqueezeStart')
      }
    },
    onSqueezeEnd: (e) => {
      switch (e.data.handedness) {
        case 'right':
          console.log('right onSqueezeEnd')
          break
        case 'left': 
          console.log('left onSqueezeEnd')
          break
        default:
          console.log('default onSqueezeEnd')
      }
    },
    onInputSourcesChange: (e) => console.log(e.data.handedness),
}

export { controllerHandlers }