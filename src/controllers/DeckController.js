import { DeckModel } from '../models/DeckModel.js'
import { MtgToolKitAdapter } from '../dal/MtgToolKitAdapter.js'
import { DeckView } from '../views/DeckView.js'

export class DeckController {
  constructor(deckName = 'Untitled Deck') {
    const adapter = new MtgToolKitAdapter(deckName)
    this.model = new DeckModel(adapter)
    this.view = new DeckView()
    this.#bindEvents()
    this.#updateUI()
  }

  handleAddCard(formData) {
    try {
      const result = this.model.addCard(formData.cardData, formData.quantity)
      this.view.showSuccess(`Added ${result.quantity}x ${result.cardName}`)
      this.view.clearCardForm()
      this.#updateUI()
    } catch (error) {
      this.#handleError(error, 'Failed to add card')
    }
  }

  handleRemoveCard(cardName) {
    try {
      this.model.removeCard(cardName)
      this.view.showSuccess(`Removed ${cardName}`)
      this.#updateUI()
    } catch (error) {
      this.#handleError(error, 'Failed to remove card')
    }
  }

  handleClearDeck() {
    try {
      this.model.clearDeck()
      this.view.showSuccess('Deck cleared')
      this.#updateUI()
    } catch (error) {
      this.#handleError(error, 'Failed to clear deck')
    }
  }

  #updateUI() {
    const cards = this.model.getCards()
    const state = this.model.getDeckState()

    this.view.renderDeckList(cards)
    this.view.updateCardCount(state.totalCards)
  }

  #bindEvents() {
    this.view.bindAddCard((formData) => {
      this.handleAddCard(formData)
    })
    this.view.bindRemoveCard((cardName) => {
      this.handleRemoveCard(cardName)
    })
    this.view.bindClearDeck(() => {
      this.handleClearDeck()
    })
  }

  #handleError(error, message){
    this.view.showError(message)
  }
}
