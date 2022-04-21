import Stage from '../../systems/Stage.js'
import * as THREE from 'three'

import terrainUrl from '../../../assets/models/village/villageTerrain.glb?url'
import barracksUrl from '../../../assets/models/village/bigBarracks.glb?url'
import mineUrl from '../../../assets/models/village/smallMine.glb?url'
import housesUrl from '../../../assets/models/village/houses.glb?url'
import tree1Url from '../../../assets/models/village/tree1.glb?url'

export default class Environment
{
  constructor()
  {
    this.stage = new Stage()
    
    this.model = null

    this.stage.world.objectsToUpdate.push(this)
  }

  async init()
  {
    const [
      terrainData, 
      barracksData, 
      mineData, 
      housesData,
      tree1Data
    ] = await Promise.all([
      this.stage.glbloader.loadAsync(terrainUrl),
      this.stage.glbloader.loadAsync(barracksUrl),
      this.stage.glbloader.loadAsync(mineUrl),
      this.stage.glbloader.loadAsync(housesUrl),
      this.stage.glbloader.loadAsync(tree1Url),
    ]);

    const terrainMaterial = new THREE.MeshPhongMaterial( { color: 0x224411 } )

    this.model = new THREE.Group()

    const terrain = terrainData.scene.children[0];
    terrain.material = terrainMaterial
    this.model.add(terrain)

    const barracks = barracksData.scene.children[0]
    barracks.position.set(-25,2,-5)
    barracks.rotateOnAxis(new THREE.Vector3(0,0,1), -Math.PI / 2)
    this.model.add(barracks)

    const mine = mineData.scene
    mine.position.set(35,0,-5)
    mine.rotateOnAxis(new THREE.Vector3(0,1,0), Math.PI * -0.5 )
    this.model.add(mine)

    const houses = housesData.scene
    houses.position.set(10,0,-5)
    houses.rotateOnAxis(new THREE.Vector3(0,1,0), Math.PI * -0.5 )
    this.model.add(houses)

    const tree1 = tree1Data.scene.children[0]
    tree1.position.set(0,0,30)
    const treeMaterial = new THREE.MeshPhongMaterial( { color: 0x22ffff } )
    tree1.material = treeMaterial
    this.model.add(tree1)

    console.log(tree1)
  }

  update() {}

  dispose() {}
}