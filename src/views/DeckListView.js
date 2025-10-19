import { Div } from '../ui/index.js'
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
      this.deckListElement.innerHTML =
        '<p class="empty-message">No cards in deck</p>'
      return
    }
    const cardGroup = this.#groupCards(cards)
    const container = new Div().addClass('deck-list-container')

    Object.entries(cardGroup).forEach(([name, data]) => {
      const cardComponent = new CardItemComponent(name, data)

      cardComponent.setRemoveHandler((cardName) => {
        if (this.removeCardHandler) {
          this.removeCardHandler(cardName)
        }
      })

      const built = cardComponent.build()
      this.cardComponents.push(cardComponent)
      container.appendChild(built)
    })
    const domElement = container.toDOMElement()

    this.deckListElement.innerHTML = ''
    this.deckListElement.appendChild(domElement)
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
