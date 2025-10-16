import { CardFormDataDTO } from "../models/dto/CardFormDataDTO.js"

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
  }

  getCardFormData() {
    const selectedColors = Array.from(this.colorCheckboxes)
      .filter((checkbox) => checkbox.checked)
      .map((colorCheckbox) => colorCheckbox.value)

    const cardData = {
      name: this.cardNameInput.value.trim(),
      manaCost: this.manaCostInput.value.trim(),
      type: this.cardTypeSelect.value,
      color: selectedColors.join(''),
      powerToughness: this.powerToughnessInput.value.trim()
    }

    const quantity = parseInt(this.quantityInput.value) || 1

    return new CardFormDataDTO(cardData, quantity)
  }

  clearCardForm() {
    this.cardForm.reset()

    this.colorCheckboxes.forEach((checkbox) => {
      checkbox.checked = false
    })

    this.quantity = '1'
  }

  renderDeckList(cards) {
    if (!cards || cards.length === 0) {
      this.deckListElement.innerHTML = '<p class="empty-message">No cards in deck</p>'
      return
    }

    const cardGroup = this.#groupCards(cards)

    const cardElements = Object.entries(cardGroup)
      .map(([name, data]) => {
        return this.#createCardElement(name, data)
      })
      .join('')

    this.deckListElement.innerHTML = cardElements
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
    },{})
  }

  #createCardElement(name, data) {
    const { quantity, card } = data

    return `
    <div class="card-item" data-card-name="${name}">
      <div class="card-info">
        <span class="card-quantity">${quantity}</span>
        <span class="card-name">${name}</span>
        <span class="card-mana">${card.manaCost}</span>
        <span class="card-type">${card.type}</span>
      </div>
      <button class="remove-card-btn" data-card-name="${name}">Remove</button>
    </div>
    `
  }

  showSucess(message) {
    const sucessDiv = document.createElement('div')
    sucessDiv.className = 'sucess-message'
    sucessDiv.textContent = message

    const container = this.cardForm.parentElement
    container.insertBefore(sucessDiv, this.cardForm)

    setTimeout(() => sucessDiv.remove(), 3000)
  }

  showError(message) {
    const errorDiv = document.createElement('div')
    errorDiv.className = 'error-message'
    errorDiv.textContent = message

    container = this.cardForm.parentElement
    container.insertBefore(errorDiv, this.cardForm)

    setTimeout(() => errorDiv.remove(), 5000)
  }

  bindAddCard(handler) {
    this.cardForm.addEventListener('submit', (event) => {
      event.preventDefault()
      const { cardData, quantity } = this.getCardFormData()
      handler(cardData, quantity)
    })
  }
}
