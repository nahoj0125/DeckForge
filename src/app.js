import { DeckController } from './controllers/DeckController.js'
import { DeckModel } from './models/DeckModel.js'
import { MtgToolKitAdapter } from './dal/MtgToolKitAdapter.js'
import { DeckView } from './views/DeckView.js'

document.addEventListener('DOMContentLoaded', () => {
  const adapter = new MtgToolKitAdapter('My Deck')
  const model = new DeckModel(adapter)
  const view = new DeckView()
  const app = new DeckController(model, view)
  console.log('App initialized!')
})