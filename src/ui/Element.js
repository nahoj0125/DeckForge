export class Element {
  constructor (tag) {
    this.tag = tag
    this.children = []
  }
 
  appendChild(child) {
    if (typeof child === 'string') {
      this.children.push({ text: String(child) })
    }

    return this
  }

  toDOMElement() {
    const element = document.createElement(this.tag)

    this.children.forEach(child => {
      if (child.text) {
        element.appendChild(document.createTextNode(child.text))
      }
    })
    return element
  }
}