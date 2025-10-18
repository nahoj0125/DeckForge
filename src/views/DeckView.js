import { CardFormDataDTO } from '../models/dto/CardFormDataDTO.js'
import { Div, Span, Button, Element } from '../ui/index.js'
import { CardItemComponent } from '../components/CardItemComponent.js'

export class DeckView {
  constructor() {
    this.deckListElement = document.getElementById('deck-list')
    this.cardCountElement = document.getElementById('card-count')
    this.cardForm = document.getElementById('add-card-form')
    this.cardNameInput = document.getElementById('card-name')
    this.manaCostInput = document.getElementById('card-mana')
    this.cardTypeSelect = document.getElementById('card-type')
    this.colorCheckboxes = document.querySelectorAll('input[name="color"]')
    this.powerToughnessInput = document.getElementById('card-power')
    this.quantityInput = document.getElementById('card-quantity')

    this.cardComponents = []
    this.removeCardHandler = null
  }

  getCardFormData() {
    const selectedColors = Array.from(this.colorCheckboxes)
      .filter((checkbox) => checkbox.checked)
      .map((colorCheckbox) => colorCheckbox.value)

    const cardData = {
      name: this.cardNameInput.value.trim(),
      manaCost: this.manaCostInput.value.trim(),
      type: this.cardTypeSelect.value,
      color: selectedColors.join(' '),
      powerToughness: this.powerToughnessInput.value.trim(),
    }

    const quantity = parseInt(this.quantityInput.value) || 1

    return new CardFormDataDTO(cardData, quantity)
  }

  clearCardForm() {
    this.cardForm.reset()

    this.colorCheckboxes.forEach((checkbox) => {
      checkbox.checked = false
    })

    this.quantityInput.value = '1'
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

  updateCardCount(count) {
    this.cardCountElement.textContent = `${count} cards`
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

  showSuccess(message) {
    const successDiv = new Div()
      .addClass('success-message')
      .appendChild(message)

    const container = this.cardForm.parentElement
    container.insertBefore(successDiv.toDOMElement(), this.cardForm)

    setTimeout(() => successDiv.remove(), 3000)
  }

  showError(message) {
    const errorDiv = new Div().addClass('error-message').appendChild(message)

    const container = this.cardForm.parentElement
    container.insertBefore(errorDiv.toDOMElement(), this.cardForm)

    setTimeout(() => errorDiv.remove(), 5000)
  }

  bindAddCard(handler) {
    this.cardForm.addEventListener('submit', (event) => {
      event.preventDefault()
      const { cardData, quantity } = this.getCardFormData()
      handler(cardData, quantity)
    })
  }

  bindRemoveCard(handler) {
    this.removeCardHandler = handler
  }
}
