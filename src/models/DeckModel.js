import {
  CardValidationException,
  DeckConstraintException,
} from '../dal/exceptions/DataExceptions.js'
import { AddCardResult } from './dto/AddCardResult.js'
import { RemoveCardResult } from './dto/RemoveCardResult.js'
import { ClearDeckResult } from './dto/ClearDeckResult.js'
import { DeckStateDTO } from './dto/DeckStateDTO.js'

export class DeckModel {
  #MAX_DECK_SIZE = 60
  #MIN_DECKSIZE = 0

  constructor(deckAdapter) {
    if (!deckAdapter) {
      throw new Error('DeckAdapter is required')
    }

    this.deckAdapter = deckAdapter
  }

  addCard(cardData, quantity = 1) {
    if (quantity < 1 || !Number.isInteger(quantity)) {
      throw new CardValidationException(
        'quantity',
        'Quantity must be a positive integer'
      )
    }

    for (let i = 0; i < quantity; i++) {
      this.deckAdapter.addCard(cardData)
    }

    return new AddCardResult(
      true,
      cardData.name,
      quantity,
      this.deckAdapter.getCardCount()
    )
  }

  getCards() {
    return this.deckAdapter.getCards()
  }

  getCardCount() {
    return this.deckAdapter.getCardCount()
  }

  removeCard(cardName, quantity = 1) {
    if (!cardName || cardName.trim() === '') {
      throw new CardValidationException('cardName', 'Card name cannot be empty')
    }

    if (quantity < 1 || !Number.isInteger(quantity)) {
      throw new CardValidationException(
        'quantity',
        'Quantity must be a positive integer'
      )
    }

    for (let i = 0; i < quantity; i++) {
      this.deckAdapter.removeCard(cardName)
    }

    return new RemoveCardResult(
      true,
      cardName,
      quantity,
      this.deckAdapter.getCardCount()
    )
  }

  clearDeck() {
    this.deckAdapter.clearDeck()

    return new ClearDeckResult(true, this.deckAdapter.getCardCount())
  }

  getDeckState() {
    const cardCount = this.deckAdapter.getCardCount()
    return new DeckStateDTO({
      totalCards: cardCount,
      isEmpty: this.isDeckEmpty(),
      isFull: this.isDeckFull(),
      remainingSlots: this.#MAX_DECK_SIZE - cardCount,
    })
  }

  isDeckFull() {
    return this.getCardCount() >= this.#MAX_DECK_SIZE
  }

  isDeckEmpty() {
    return this.getCardCount() === this.#MIN_DECKSIZE
  }
}
