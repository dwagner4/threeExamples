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
  <h1>The Web is better than Native</h1> 
  <ul>
    <li>Distribution, Ads?</li>
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