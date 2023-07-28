import NormalizeWheel from 'normalize-wheel'

import About from './pages/About'
import Home from './pages/Home'

import Canvas from './components/Canvas'

class App {
  canvas: Canvas
  content: Element | null
  template: string | null | undefined
  pages: { [key: string]: About | Home }
  page: About | Home

  constructor() {
    this.content = document.querySelector('.content')
    this.template = this.content?.getAttribute('data-template')

    this.createCanvas()
    this.createPages()
    this.addEventListeners()

    this.onResize()

    this.update()
  }

  createCanvas() {
    this.canvas = new Canvas({
      template: this.template,
    })
  }

  createPages() {
    this.pages = {
      about: new About(),
      home: new Home(),
    }

    this.page = this.pages[this.template || 'home']
    this.page.create()
  }

  /**
   * Events
   */
  onResize() {
    window.requestAnimationFrame(() => this.canvas.onResize())
  }

  onTouchDown(event: MouseEvent | TouchEvent) {
    if (this.canvas && this.canvas.onTouchDown) {
      this.canvas.onTouchDown(event)
    }
  }

  onTouchMove(event: MouseEvent | TouchEvent) {
    if (this.canvas && this.canvas.onTouchMove) {
      this.canvas.onTouchMove(event)
    }
  }

  onTouchUp(event: MouseEvent | TouchEvent) {
    if (this.canvas && this.canvas.onTouchUp) {
      this.canvas.onTouchUp(event)
    }
  }

  onWheel(event) {
    const normalizedWheel = NormalizeWheel(event)

    if (this.canvas && this.canvas.onWheel) {
      this.canvas.onWheel(normalizedWheel)
    }

    if (this.page && this.page.onWheel) {
      this.page.onWheel(normalizedWheel)
    }
  }

  /**
   * Listeners
   */
  addEventListeners() {
    window.addEventListener('mousewheel', this.onWheel.bind(this))

    window.addEventListener('mousedown', this.onTouchDown.bind(this))
    window.addEventListener('mousemove', this.onTouchMove.bind(this))
    window.addEventListener('mouseup', this.onTouchUp.bind(this))

    window.addEventListener('touchstart', this.onTouchDown.bind(this))
    window.addEventListener('touchmove', this.onTouchMove.bind(this))
    window.addEventListener('touchend', this.onTouchUp.bind(this))
  }

  update() {
    if (this.canvas && this.canvas.update) {
      this.canvas.update()
    }

    window.requestAnimationFrame(this.update.bind(this))
  }
}

new App()
