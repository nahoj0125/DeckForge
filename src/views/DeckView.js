import { CardFormView } from './CardFormView.js'
import { DeckListView } from './DeckListView.js'

export class DeckView {
  constructor() {
    this.formView = new CardFormView()
    this.deckListView = new DeckListView()
  }

  getCardFormData() {
    return this.formView.getFormData()
  }

  clearCardForm() {
    this.formView.clearCardForm()
  }

  showSuccess(message) {
    this.formView.showSuccess(message)
  }

  showError(message) {
    this.formView.showError(message)
  }

  bindAddCard(handler) {
    this.formView.bindSubmit(handler)
  }

  renderDeckList(cards) {
    this.deckListView.renderDeckList(cards)
  }

  updateCardCount(count) {
    this.deckListView.updateCardCount(count)
  }

  bindRemoveCard(handler) {
    this.deckListView.bindRemoveCard(handler)
  }

  bindClearDeck(handler) {
    this.deckListView.bindClearDeck(handler)
  }
}