// Result object for card removal operations
export class RemoveCardResult {
  constructor (sucess, cardName, quantity, totalCards) {
    this.sucess = sucess
    this.cardName = cardName
    this.quantity = quantity
    this.totalCards = totalCards
  }
}