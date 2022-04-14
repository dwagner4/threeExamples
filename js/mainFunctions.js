const msgArea = document.querySelector('#msg-area')

const homeover = () => {
  msgArea.style.display = 'block'
  msgArea.innerHTML = `
    <h1>Immersive Web/WebXR</h1> 
    <ul>
      <li>Lazy-loading, Progressive, Repsonsive</li>
      <li>Installable, chache large assets locally</li>
      <li>Desktop, Android, Oculus-Quest, etc...</li>
      <li>Libraries, Three.js and GSAP</li>
      <li>VS-code => Firebase => vanilla JS => Vite</li>
      <li>Blender for asset conversion to glTF</li>
    </ul>
  `
}

const msgout = () => {
  msgArea.style.display = 'none'
  msgArea.innerHTML = ``
}

const threeover = () => {
  msgArea.style.display = 'block'
  msgArea.innerHTML = `
  <h1>WebApps are better than Native Apps</h1> 
  <ul>
    <li>Free Distribution, No stores?</li>
    <li>low cost of entry</li>
    <li>more monitization possibilities</li>
    <li>Rapid updates</li>
  </ul>
  <h3>Example scenes</h3>
  <ul>
    <li>Landscapes, navigation</li>
    <li>Characters, Interaction</li>
    <li>Interior scenes</li>
    <li>Pop-up UI</li>
    <li>Post-processing</li>
  </ul>
  `
}

const vrover = () => {
  msgArea.style.display = 'block'
  msgArea.innerHTML = `
  <h1>Too cool to ignore</h1> 
  <ul>
    <li>Dynamically load controller profiles</li>
    <li>Pop-up UI</li>
    <li>6 DOF with multi-button hand controllers</li>
    <li>Eventually hand sensing</li>
  </ul>
  `
}

const arover = () => {
  msgArea.style.display = 'block'
  msgArea.innerHTML = `
  <h1>Phone fun</h1> 
  <ul>
    <li>Game boards, shopping items</li>
    <li>AR pets, friends</li>
  </ul>
  `
}

const storyover = () => {
  msgArea.style.display = 'block'
  msgArea.innerHTML = `
  <h1>Not just single Scenes</h1> 
  <ul>
    <li>interactive scene selection, plot changes</li>
    <li>100's of scenes in the browser</li>
    <li>transitioning/ loading</li>
    <li>asset chache</li>
  </ul>
  `
}

const aboutover = () => {
  msgArea.style.display = 'block'
  msgArea.innerHTML = `
  <h1>Dean Wagner</h1> 
  <ul>
    <li>Full Stack Developer 10+ years</li>
    <li>React, Vue, Polymer, GWT</li>
    <li>Firebase, Google, AWS</li>
    <li>Working on Production Grade THREE.js Architecture</li>
    <li>Still a Programmer, not an Artist</li>
  </ul>

  <p>I want to develop immersive WebXR/VR/AR apps or components using ThreeJS. This is the direction of the Web and it is more fun. Once you've made the decision to include immersive elements in your web app, there is little reason to use HTML/CSS except for the splash page.
  </p>
  <p>For several years I've been playing around the edges of 3D systems with Unity, Babylon.js, aFrame and Three.js. In November I decided to go in depth on Three.js exclusively (while completing an addition to my house). I'm within striking distance of where I'd like to be.
  </p>
  <p>I'd like to work with a team of similarly motivated people It is also obvious that much of the immersive world is in the hands of the artists.
  </p>
  <p>I've adopted Blender as a learning objective, but I'm much more of a programmer than I'll ever be an artist. Still there is a strong need to condition models and convert to .glb
  </p>
  <p>I have used several web component frameworks including React, Vue, and Polymer. On the backend I've used Google AppEngine/Cloud, and AWS. Also very good at business analysis.
  </p>  
  `
}

export { 
  homeover, msgout, 
  threeover, 
  vrover, 
  arover, 
  storyover, 
  aboutover, 
}