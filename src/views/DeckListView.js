import { Div, P } from '../ui/index.js'
import { CardItemComponent } from '../components/CardItemComponent.js'
import { ClearDeckButtonComponent } from '../components/ClearDeckButtonComponent.js'

export class DeckListView {
  constructor() {
    this.deckListElement = document.getElementById('deck-list')
    this.cardCountElement = document.getElementById('card-count')
    this.cardComponents = []
    this.removeCardHandler = null
    this.clearDeckHandler = null
    this.clearDeckButton = null
    this.#addClearButton()
  }

  renderDeckList(cards) {
    this.cardComponents = []

    if (!cards || cards.length === 0) {
      this.#renderEmptyState()
      return
    }
    const cardGroup = this.#groupCards(cards)
    const container = this.#buildCardListContainer(cardGroup)

    const domElement = container.toDOMElement()
    this.deckListElement.innerHTML = ''
    this.deckListElement.appendChild(domElement)
  }

  #buildCardListContainer(cardGroup) {
    const container = new Div().addClass('deck-list-container')
    Object.entries(cardGroup).forEach(([name, data]) => {
      const cardComponent = this.#createCardComponent(name, data)
      container.appendChild(cardComponent.build())
    })

    return container
  }

  #createCardComponent(name, data) {
    const cardComponent = new CardItemComponent(name, data)

    cardComponent.setRemoveHandler((cardName) => {
      if (this.removeCardHandler) {
        this.removeCardHandler(cardName)
      }
    })

    this.cardComponents.push(cardComponent)
    return cardComponent
  }

  #renderEmptyState() {
    const emptyMessage = new P()
      .addClass('empty-message')
      .appendChild('No cards in deck')

    this.deckListElement.innerHTML = ''
    this.deckListElement.appendChild(emptyMessage.toDOMElement())
  }

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

  updateCardCount(count) {
    this.cardCountElement.textContent = `${count} cards`
  }

  #addClearButton() {
    this.clearDeckButton = new ClearDeckButtonComponent()
  }

  bindRemoveCard(handler) {
    this.removeCardHandler = handler
  }

  bindClearDeck(handler) {
    this.clearDeckButton.setClickHandler(handler)
    const buttonElement = this.clearDeckButton.toDOMElement()
    const container = this.deckListElement.parentElement
    container.insertBefore(buttonElement, this.deckListElement)
  }
}
