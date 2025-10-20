
// Result object for card addition operations
export class AddCardResult {
  constructor (sucess, cardName, quantity, totalCards) {
    this.sucess = sucess
    this.cardName = cardName
    this.quantity = quantity
    this.totalCards = totalCards
  }
}