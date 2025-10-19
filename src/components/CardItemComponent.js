import { Component, Div, Span, Button } from '../ui/index.js'

export class CardItemComponent extends Component {
  constructor(name, data) {
    super()
    this.name = name
    this.quantity = data.quantity
    this.card = data.card
    this.removeHandler = null
  }

  build() {
    const cardItem = new Div()
      .addClass('card-item')
      .setAttribute('data-card-name', this.name)

    const cardInfo = this.#buildCardInfo()
    const removeButton = this.#buildRemoveButton()

    cardItem.appendChild(cardInfo)
    cardItem.appendChild(removeButton)
    return cardItem
  }

  #buildCardInfo() {
    const cardInfo = new Div().addClass('card-info')

    const quantitySpan = new Span()
      .addClass('card-quantity')
      .appendChild(this.quantity.toString())

    const nameSpan = new Span().addClass('card-name').appendChild(this.name)

    const manaSpan = new Span()
      .addClass('card-mana')
      .appendChild(this.card.manaCost)

    const typeSpan = new Span()
      .addClass('card-type')
      .appendChild(this.card.type)

    const colorSpan = new Span()
      .addClass('card-color')
      .appendChild(this.card.color || 'colorless')

    const powerToughnessSpan = new Span()
      .addClass('card-power')
      .appendChild(this.card.powerToughness)

    cardInfo
      .appendChild(quantitySpan)
      .appendChild(nameSpan)
      .appendChild(manaSpan)
      .appendChild(typeSpan)
      .appendChild(colorSpan)
      .appendChild(powerToughnessSpan)

    return cardInfo
  }

  #buildRemoveButton() {
    return new Button('Remove')
      .addClass('remove-card-btn')
      .setAttribute('data-card-name', this.name)
      .onClick(() => this.onRemove())
  }

  onRemove() {
    if (this.removeHandler) {
      this.removeHandler(this.name)
    }
  }

  setRemoveHandler(handler) {
    this.removeHandler = handler
    return this
  }
}
