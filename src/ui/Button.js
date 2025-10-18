import { Element } from './Element.js'

export class Button extends Element {
  constructor(text = '') {
    super('button')
    
    if (text) {
      this.appendChild(text)
    }
    
  }
  
  onClick(handler) {
    return this.on('click', handler)
  }
}