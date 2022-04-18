import * as CANNON from 'cannon-es'

export default class PhysWorld extends CANNON.World
{
  constructor()
  {
    super()
    console.log(this)
    this.gravity.set(0, -9.82, 0)
    const defaultMaterial = new CANNON.Material('default')
    const defaultContactMaterial = new CANNON.ContactMaterial(
        defaultMaterial,
        defaultMaterial,
        {
            friction: 0.1,
            restitution: 0.7
        }
    )
    console.log(this)
    this.addContactMaterial(defaultContactMaterial)
    this.defaultContactMaterial = defaultContactMaterial
    console.log(this)
  }
}