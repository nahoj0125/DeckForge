/**
 * Base class for creating DOM elements with a fluent interface
 */
export class Element {
  constructor(tag) {
    this.tag = tag
    this.children = []
    this.classes = new Set()
    this.attributes = new Map()
    this.eventHandlers = new Map()
    this.domElement = null
  }

  /**
   * Adds a CSS class to the element
   *
   * @param {string} className - CSS class name to add
   * @returns {Element} This element for chaining
   */
  addClass(className) {
    this.classes.add(className)
    return this
  }

  /**
   * Sets an HTML attribute on the element
   *
   * @param {string} name - Attribute name
   * @param {string} value - Attribute value
   * @returns {Element} This element for chaining
   */
  setAttribute(name, value) {
    this.attributes.set(name, value)
    return this
  }

  /**
   * Appends a child element or text content
   *
   * @param {Element|string|number} child - Child element or text content
   * @returns {Element} This element for chaining
   */
  appendChild(child) {
    if (child instanceof Element) {
      this.children.push(child)
    } else if (this.#isStringorNumber(child)) {
      this.children.push(this.#createTextNode(child))
    }

    return this
  }

  /**
   * Removes the element from the DOM
   */
  remove() {
    if (this.#hasParentNode()) {
      this.domElement.parentNode.removeChild(this.domElement)
      this.domElement = null
    }
  }

  /**
   * Attaches an event handler to the element
   *
   * @param {string} event - Event type (e.g., 'click', 'submit')
   * @param {Function} handler - Event handler function
   * @returns {Element} This element for chaining
   */
  on(event, handler) {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, [])
    }
    this.eventHandlers.get(event).push(handler)
    return this
  }

  /**
   * Converts this element to a browser DOM element
   *
   * @returns {HTMLElement} The rendered DOM element
   */
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

  // Builds the complete DOM element with all configurations
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
