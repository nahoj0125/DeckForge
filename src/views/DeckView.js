export class deckView {
  constructor() {
    this.deckListElement = document.getElementById('deck-list')
    this.cardCountElement = document.getElementById('card-count')
    this.cardForm
  }

  renderDeckList(cards) {
    if (!cards || cards === 0) {
      this.deckListElement('<p class="empty-message">No cards in deck</p>')
      return
    }

    const cardGroup = this.#groupCards(cards)

    const cardElements = Object.entries(cardGroup).map(([name, data]) => {
      return this.#createCardElement(name, data)
    }).join('')
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
          card: card
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
}