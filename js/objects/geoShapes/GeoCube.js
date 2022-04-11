import * as THREE from 'three'

export default class GeoCube 
{
  constructor(size, color)
  {
    this.model = new THREE.Mesh(
      new THREE.BoxGeometry(size, size, size),
      new THREE.MeshBasicMaterial( { color: color } )
    )
  }

  update() 
  {
    
  }
}