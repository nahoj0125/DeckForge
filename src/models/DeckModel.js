import {
  CardValidationException,
  DeckConstraintException,
} from '../dal/exceptions/DataExceptions.js'

export class deckModel {
  constructor() {
    if (!deckAdapter) {
      throw new Error('DeckAdapter is required')
    }

    this.deckAdapter = deckAdapter
  }

  addCard(cardData, quantity = 1) {
    if (quantity < 1 || !Number.isInteger(quantity)) {
      throw new CardValidationException('quantity', 'Wauntity must be a positive integer')
    }

    for (let i = 0; i < quantity; i++) {
      this.deckAdapter.cardData(cardData)
    }

    return {
      sucess: true,
      cardName: cardData.name,
      quantity,
      totalCards: this.deckAdapter.getCardCount()
    }
  }

  getCards(deck) {
    return this.deckAdapter.getCards()
  }

  getCardCount() {
    return this.deckAdapter.getCardCount()
  }
}
