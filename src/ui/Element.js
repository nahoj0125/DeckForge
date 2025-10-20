export class Element {
  constructor(tag) {
    this.tag = tag
    this.children = []
    this.classes = new Set()
    this.attributes = new Map()
    this.eventHandlers = new Map()
    this.domElement = null
  }

  addClass(className) {
    this.classes.add(className)
    return this
  }

  setAttribute(name, value) {
    this.attributes.set(name, value)
    return this
  }

  appendChild(child) {
    if (child instanceof Element) {
      this.children.push(child)
    } else if (this.#isStringorNumber(child)) {
      this.children.push(this.#createTextNode(child))
    }

    return this
  }

  remove() {
    if (this.#hasParentNode()) {
      this.domElement.parentNode.removeChild(this.domElement)
      this.domElement = null
    }
  }

  on(event, handler) {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, [])
    }
    this.eventHandlers.get(event).push(handler)
    return this
  }

  toDOMElement() {
    if (this.domElement) {
      return this.domElement
    }
    this.domElement = this.#buildDomElement()
    return this.domElement
  }

  #isStringorNumber(child) {
    return typeof child === 'string' || typeof child === 'number'
  }

  #createTextNode(content) {
    return { text: String(content) }
  }

  #hasParentNode() {
    return this.domElement && this.domElement.parentNode
  }

  #buildDomElement() {
    const element = document.createElement(this.tag)
    this.#applyAttributes(element)
    this.#applyClasses(element)
    this.#appendEventHandlers(element)
    this.#appendChildren(element)
    return element
  }

  #applyAttributes(element) {
    this.attributes.forEach((value, name) => {
      element.setAttribute(name, value)
    })
  }

  #applyClasses(element) {
    if (this.classes.size > 0) {
      element.className = Array.from(this.classes).join(' ')
    }
  }

  #appendEventHandlers(element) {
    this.eventHandlers.forEach((handlers, event) => {
      handlers.forEach((handler) => {
        element.addEventListener(event, handler)
      })
    })
  }

  #appendChildren(element) {
    this.children.forEach((child) => {
      if (child instanceof Element) {
        element.appendChild(child.toDOMElement())
      } else if (child.text) {
        element.appendChild(document.createTextNode(child.text))
      }
    })
  }
}
