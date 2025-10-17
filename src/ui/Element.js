export class Element {
  constructor (tag) {
    this.tag = tag
    this.children = []
    this.domElement = null
  }
 
  appendChild(child) {
    if (typeof child === 'string') {
      this.children.push({ text: String(child) })
    }

    return this
  }

  remove() {
    if (this.domElement && this.domElement.parentNode) {
      this.domElement.parentNode.removeChild(this.domElement)
      this.domElement = null
    }
  }

  toDOMElement() {
    const element = document.createElement(this.tag)

    this.children.forEach(child => {
      if (child.text) {
        element.appendChild(document.createTextNode(child.text))
      }
    })
    this.domElement = element
    return element
  }
}