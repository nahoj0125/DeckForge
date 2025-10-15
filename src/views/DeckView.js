export class deckView {
  constructor() {
    this.deckListElement = document.getElementById('deck-list')
    this.cardCountElement = document.getElementById('card-count')
    this.cardForm = document.getElementById('card-form')
    this.cardNameInput = document.getElementById('card-name')
    this.manaCostInput = document.getElementById('mana-cost')
    this.cardTypeSelect = docment.getElementById('card-type')
    this.colorCheckboxes = document.querySelectorAll('input[name="color"]')
    this.powerToughnessInput = document.getElementById('power-toughness')
    this.qantityInput = document.getElementById('quantity')
  }

  getCardFormData() {
    const selectedColors = Array.from(this.colorCheckboxes)
      .filter((checkbox) => checkbox.checked)
      .map((colorCheckbox) => colorCheckbox.value)
    return {
      cardData: {
        name: this.cardNameInput.value.trim(),
        manaCost: this.manaCostInput.value.trim(),
        type: this.cardTypeSelect.value,
        color: selectedColors.join(''),
        powerToughness: this.powerToughnessInput.value.trim(),
      },
      quantity: parseInt(this.qantityInput.value || 1),
    }
  }

  clearCardForm() {
    this.cardForm.reset()

    this.colorCheckboxes.forEach((checkbox) => {
      checkbox.checked = false
    })

    this.quantity = '1'
  }

  renderDeckList(cards) {
    if (!cards || cards === 0) {
      this.deckListElement('<p class="empty-message">No cards in deck</p>')
      return
    }

    const cardGroup = this.#groupCards(cards)

    const cardElements = Object.entries(cardGroup)
      .map(([name, data]) => {
        return this.#createCardElement(name, data)
      })
      .join('')
  }

  updateCardCount(count) {
    this.cardCountElement.textContent = count
  }

  #groupCards(cards) {
    return cards.reduce((group, cards) => {
      const name = cards.name
      if (!groups[name]) {
        groups[name] = {
          quantity: 0,
          card: card,
        }
      }
      groups[name].quantity++
      return groups
    })
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
      <button class="remove-card-btn" data-card-name=">{name}Remove</button>
    </div>
    `
  }

  bindAddCard(handler) {
    this.cardForm.addEventListener('submit', (event) => {
      event.preventDefault()
      const { cardData, quantity } = this.getCardFormData()
      handler(cardData, quantity)
    })
  }
}
