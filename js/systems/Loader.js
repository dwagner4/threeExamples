import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

const createGlbLoader = () => 
{
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('/draco/')
  const loader = new GLTFLoader();
  loader.setDRACOLoader(dracoLoader)

  return loader
}

const createTextureLoader = () => 
{
  return new THREE.TextureLoader()
}

const createCubeTextureLoader = () => 
{
  return new THREE.CubeTextureLoader()
}

export { createGlbLoader, createTextureLoader, createCubeTextureLoader }