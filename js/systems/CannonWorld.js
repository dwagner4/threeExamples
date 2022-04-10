import CANNON from 'cannon'

export default class CannonWorld extends CANNON.World
{
  constructor()
  {
    super()
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
    this.addContactMaterial(defaultContactMaterial)
    this.defaultContactMaterial = defaultContactMaterial
  }
}