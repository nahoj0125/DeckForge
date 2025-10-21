/**
 * Controller for deck operations
 */
export class DeckController {
  constructor(model, view) {
    this.model = model
    this.view = view
    this.#bindEvents()
    this.#updateUI()
  }

  /**
   * Handles adding a card or cards to the deck
   *
   * @param {CardFormDataDTO} formData - Form data with card details and quantity
   */
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

  /**
   * Handles removing card from the deck
   *
   * @param {string} cardName - Name of card to remove
   */
  handleRemoveCard(cardName) {
    try {
      this.model.removeCard(cardName)
      this.view.showSuccess(`Removed ${cardName}`)
      this.#updateUI()
    } catch (error) {
      this.#handleError(error, 'Failed to remove card')
    }
  }

  /**
   * Handles clearing all cards from the deck
   */
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

  #handleError(error, message) {
    this.view.showError(message)
  }
}
