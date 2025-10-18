export class Component {
  constructor() {
    this.root = null;
  }

  build() {
    throw new Error('build() must be implemented');
  }

  toDOMElement() {
    if (!this.root) {
      this.root = this.build();
    }
    return this.root.toDOMElement();
  }
}