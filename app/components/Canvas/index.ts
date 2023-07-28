import {
  Camera,
  OGLRenderingContext,
  Renderer,
  Transform,
} from 'ogl-typescript'

import Home from './Home'

export default class Canvas {
  camera: Camera
  gl: OGLRenderingContext
  home: Home
  template: string
  scene: Transform
  renderer: Renderer

  constructor({ template }) {
    this.template = template

    this.createRenderer()
    this.createCamera()
    this.createScene()

    this.addEventListener()

    this.onResize()
  }

  createHome() {
    this.home = new Home({
      gl: this.gl,
      scene: this.scene,
    })

    this.renderer.render({ scene: this.scene, camera: this.camera })
  }

  createRenderer() {
    this.renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: 2,
    })

    this.gl = this.renderer.gl

    document.body.appendChild(this.gl.canvas)
  }

  createCamera() {
    this.camera = new Camera(this.gl, { fov: 35 })
    this.camera.position.z = 5

    this.camera.position.set(5, 3, 6)
    this.camera.lookAt([0, 0, 0])
  }

  createScene() {
    this.scene = new Transform()
  }

  onResize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.camera.perspective({
      aspect: window.innerWidth / window.innerHeight,
    })

    if (!this.home) {
      this.createHome()
    }
  }

  onTouchDown(event: MouseEvent | TouchEvent) {
    if (this.home) {
      this.home.onTouchDown(event)
    }
  }

  onTouchMove(event: MouseEvent | TouchEvent) {
    if (this.home) {
      this.home.onTouchMove(event)
    }
  }

  onTouchUp(event: MouseEvent | TouchEvent) {
    if (this.home) {
      this.home.onTouchUp(event)
    }
  }

  onWheel(event: any) {
    if (this.home) {
      this.home.onWheel(event)
    }
  }

  update() {
    this.home.update()

    this.renderer.render({
      camera: this.camera,
      scene: this.scene,
    })
  }

  addEventListener() {
    window.addEventListener('resize', this.onResize.bind(this))
  }
}
