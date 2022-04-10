// import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'


export default class Resources 
{
  constructor()
  {
    // setup
    this.items = {}
    this.toLoad = this.sources.length
    this.loaded = 0

    //  loaders
    this.setLoaders()
  }

  setLoaders() {
    this.loaders = {}
    this.loaders.gltfLoader = new GLTFLoader()
    this.loaders.textureLoader = new THREE.TextureLoader()
    this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader()
  }

  startLoading(sources)
  {
    for( const source of sources )
    {
      if(source.type === 'gltfModel')
      {
        this.loaders.gltfLoader.load(
          source.path,
          (file) =>
          {
            this.sourceLoaded(source, file)
          }
        )
      }
      else if(source.type === 'texture')
      {
        this.loaders.textureLoader.load(
          source.path,
          (file) =>
          {
            this.sourceLoaded(source, file)
          }
        )
      }
      else if(source.type === 'cubeTexture')
      {
        this.loaders.cubeTextureLoader.load(
          source.path,
          (file) =>
          {
            this.sourceLoaded(source, file)
          }
        )
      }
    }
  }

  sourceLoaded(source, file) 
  {
    this.items[source.name] = file
    this.loaded++
    if(this.loaded === this.toLoad)
    {
      this.trigger('ready')
    }
    
  }
}