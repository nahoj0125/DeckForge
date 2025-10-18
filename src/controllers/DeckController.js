import { DeckModel } from '../models/DeckModel.js'
import { MtgToolKitAdapter } from '../dal/MtgToolKitAdapter.js'
import { DeckView } from '../views/DeckView.js'

export class DeckController {
  constructor() {
    const adapter = new MtgToolKitAdapter('Untitled Deck')
    this.model = new DeckModel(adapter)
    this.view = new DeckView()
    this.bindEvents()
    this.updateUI()
  }

  handleAddCard(cardData, quantity) {
    try {
      const result = this.model.addCard(cardData, quantity)
      this.view.showSuccess(`Added ${result.quantity}x ${result.cardName}`)
      this.updateUI()
    } catch (error) {
      this.view.showError()
    }
  }

    handleRemoveCard(cardName) {
    try {
      this.model.removeCard(cardName)
      this.view.showSuccess(`Removed ${cardName}`)
      this.updateUI()
    } catch (error) {
      console.error('Error removing card:', error)
      this.view.showError('Failed to remove card')
    }
  }

  updateUI() {
    const cards = this.model.getCards()
    const state = this.model.getDeckState()

    this.view.renderDeckList(cards)
    this.view.updateCardCount(state.totalCards)
  }

  bindEvents() {
    this.view.bindAddCard((cardData, quantity) => {
      this.handleAddCard(cardData, quantity)
    })
        this.view.bindRemoveCard((cardName) => {
      this.handleRemoveCard(cardName)
    })
  }
}
