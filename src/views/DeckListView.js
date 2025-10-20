import { Div, P } from '../ui/index.js'
import { CardItemComponent } from '../components/CardItemComponent.js'
import { ClearDeckButtonComponent } from '../components/ClearDeckButtonComponent.js'
/**
 * Manages deck state and card operations
 *
 * Validates operations and enforces deck size constraints
 */
export class DeckListView {
  constructor() {
    this.deckListElement = document.getElementById('deck-list')
    this.cardCountElement = document.getElementById('card-count')
    this.cardComponents = []
    this.removeCardHandler = null
    this.clearDeckButton = new ClearDeckButtonComponent()
  }

  /**
   * Renders the deck list or empty state
   *
   * @param {Array<Object>} cards - Array of card objects
   */
  renderDeckList(cards) {
    if (this.#isEmpty(cards)) {
      this.#renderEmptyState()
      return
    }

    this.#renderCards(cards)
  }

  /**
   * Updates the card count display
   *
   * @param {number} count - Total number of cards
   */
  updateCardCount(count) {
    this.cardCountElement.textContent = `${count} cards`
  }

  /**
   * Binds handler for removing cards
   *
   * @param {Function} handler - Handler function (cardName) => void
   */
  bindRemoveCard(handler) {
    this.removeCardHandler = handler
  }

  /**
   * Binds handler for clearing entire deck
   *
   * @param {Function} handler - Handler function () => void
   */
  bindClearDeck(handler) {
    this.clearDeckButton.setClickHandler(handler)
    const buttonElement = this.clearDeckButton.toDOMElement()
    const container = this.deckListElement.parentElement
    container.insertBefore(buttonElement, this.deckListElement)
  }

  #isEmpty(cards) {
    return !cards || cards.length === 0
  }

  #renderEmptyState() {
    const emptyMessage = new P()
      .addClass('empty-message')
      .appendChild('No cards in deck')

    this.deckListElement.innerHTML = ''
    this.deckListElement.appendChild(emptyMessage.toDOMElement())
  }

  #renderCards(cards) {
    const cardGroup = this.#groupCards(cards)
    const container = this.#buildCardListContainer(cardGroup)
    const domElement = container.toDOMElement()

    this.deckListElement.innerHTML = ''
    this.deckListElement.appendChild(domElement)
  }

  // Groups cards by name and counts duplicates
  #groupCards(cards) {
    return cards.reduce((groups, card) => {
      const name = card.name
      if (!groups[name]) {
        groups[name] = {
          quantity: 0,
          card: card,
        }
      }
      groups[name].quantity++
      return groups
    }, {})
  }

  #buildCardListContainer(cardGroup) {
    const container = new Div().addClass('deck-list-container')
    Object.entries(cardGroup).forEach(([name, data]) => {
      const cardComponent = this.#createCardComponent(name, data)
      container.appendChild(cardComponent.build())
    })

    return container
  }

  // Attaches remove handler to card component
  #createCardComponent(name, data) {
    const cardComponent = new CardItemComponent(name, data)

    cardComponent.setRemoveHandler((cardName) => {
      if (this.removeCardHandler) {
        this.removeCardHandler(cardName)
      }
    })

    return cardComponent
  }
}
