export default class Page {
  id: any
  element: Element | null
  elements: { [key: string]: Element }
  scroll: { current: number; target: number; last: number; limit: number }
  selector: any
  selectorChildren: any

  constructor({ selector, elements, id }) {
    this.selector = selector
    this.selectorChildren = { ...elements }
    this.id = id
  }

  create() {
    this.element = document.querySelector(this.selector)
    this.elements = {}

    this.scroll = {
      current: 0,
      target: 0,
      last: 0,
      limit: 0,
    }
  }

  onWheel({ pixelY }) {
    this.scroll.target -= pixelY
  }
}
