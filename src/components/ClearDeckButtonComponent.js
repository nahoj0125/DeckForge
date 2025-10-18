import { Component, Button } from '../ui/index.js'

export class ClearDeckButtonComponent extends Component{
  constructor() {
    super()
    this.clickHandler = null
  }

  build() {
    return new Button('Clear deck').addClass('clear-deck-btn').on('click', () => this.onClick())
  }

  onClick() {
    if (confirm('Are you sure you want to clear the entire deck?')) {
      if (this.clickHandler) {
        this.clickHandler()
      }
    } 
  }

  setClickHandler(handler) {
    this.clickHandler = handler
    return this
  }
}
