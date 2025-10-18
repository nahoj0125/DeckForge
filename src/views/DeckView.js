import { CardFormDataDTO } from "../models/dto/CardFormDataDTO.js"
import { Div, Span, Button, Element } from "../ui/index.js"

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

      console.log('Selected colors:', selectedColors)
    const cardData = {
      name: this.cardNameInput.value.trim(),
      manaCost: this.manaCostInput.value.trim(),
      type: this.cardTypeSelect.value,
      color: selectedColors.join(' '),
      powerToughness: this.powerToughnessInput.value.trim()
    }
    console.log('Card data being sent:', cardData)

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
    this.deckListElement.innerHTML = ''

    Object.entries(cardGroup).forEach(([name, data]) => {
      const cardElement = this.#createCardElement(name, data)
      this.deckListElement.appendChild(cardElement)
    })
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

    const cardItem = new Div()
      .addClass('card-item')
      .setAttribute('data-card-name', name)
    
    const cardInfo = new Div().addClass('card-info')
    
    const quantitySpan = new Span()
      .addClass('card-quantity')
      .appendChild(quantity.toString())
    
    const nameSpan = new Span()
      .addClass('card-name')
      .appendChild(name)
    
    const manaSpan = new Span()
      .addClass('card-mana')
      .appendChild(card.manaCost)
    
    const typeSpan = new Span()
      .addClass('card-type')
      .appendChild(card.type)

    const colorSpan = new Span()
      .addClass('card-color')
      .appendChild(card.color || 'colorless')
    
    cardInfo
      .appendChild(quantitySpan)
      .appendChild(nameSpan)
      .appendChild(manaSpan)
      .appendChild(typeSpan)
      .appendChild(colorSpan)
    
    const removeButton = new Button()
      .addClass('remove-card-btn')
      .setAttribute('data-card-name', name)
      .appendChild('Remove')
    
    cardItem
      .appendChild(cardInfo)
      .appendChild(removeButton)
    
    return cardItem.toDOMElement()
  }

  showSuccess(message) {
    const successDiv = new Div().addClass('success-message').appendChild(message)

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
}
