import {
  Mesh,
  OGLRenderingContext,
  Program,
  Torus,
  Transform,
} from 'ogl-typescript'

// @ts-ignore
import vertex from '../../../shaders/test-vertex.glsl'
// @ts-ignore
import fragment from '../../../shaders/test-fragment.glsl'

export default class {
  cursorPosition: { x: number; y: number }
  geometry: Torus
  gl: OGLRenderingContext
  mesh: Mesh
  pause: boolean
  program: Program
  scene: Transform

  constructor({ gl, scene }) {
    this.gl = gl
    this.scene = scene

    this.pause = false

    this.cursorPosition = {
      x: 0,
      y: 0,
    }

    this.createProgram()
    this.createGeometry()
    this.createMesh()
  }

  createGeometry() {
    this.geometry = new Torus(this.gl, {
      radius: 1,
      tube: 0.5,
      radialSegments: 32,
      tubularSegments: 64,
    })
  }

  createMesh() {
    this.mesh = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program,
    })

    this.mesh.setParent(this.scene)
  }

  createProgram() {
    this.program = new Program(this.gl, {
      vertex,
      fragment,
    })
  }

  onTouchDown(event: MouseEvent | TouchEvent) {
    this.pause = true
  }

  onTouchMove(event: MouseEvent | TouchEvent) {
    if (event instanceof MouseEvent && !this.pause) {
      this.cursorPosition.x = event.x
      this.cursorPosition.y = event.y
    }

    if (event instanceof MouseEvent && this.pause) {
      this.mesh.rotation.y +=
        this.cursorPosition.x > event.x
          ? -(Math.abs(this.cursorPosition.x - event.x) / 100000) * 5
          : (Math.abs(event.x - this.cursorPosition.x) / 100000) * 5

      this.mesh.rotation.x +=
        this.cursorPosition.y > event.y
          ? -(Math.abs(this.cursorPosition.y - event.y) / 100000)
          : Math.abs(this.cursorPosition.y - event.y) / 100000
    }
  }

  onTouchUp(event: MouseEvent | TouchEvent) {
    this.pause = false
  }

  onWheel(event: any) {
    this.mesh.rotation.x += event.pixelY / 1000
    this.mesh.rotation.y += event.pixelX / 1000
  }

  update() {
    if (!this.pause) {
      this.mesh.rotation.x -= 0.003
      this.mesh.rotation.y += 0.005
    }
  }
}
