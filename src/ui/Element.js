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
    } else if (typeof child === 'string' || typeof child === 'number') {
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
    const element = document.createElement(this.tag)

    this.attributes.forEach((value, name) => {
      element.setAttribute(name, value)
    })

    if (this.classes.size > 0) {
      element.className = Array.from(this.classes).join(' ')
    }

    if (this.eventHandlers && this.eventHandlers.size > 0) {
      this.eventHandlers.forEach((handlers, event) => {
        handlers.forEach((handler) => {
          element.addEventListener(event, handler)
        })
      })
    }

    this.children.forEach((child) => {
      if (child instanceof Element) {
        element.appendChild(child.toDOMElement())
      } else if (child.text) {
        element.appendChild(document.createTextNode(child.text))
      }
    })
    this.domElement = element
    return element
  }
}
