export class AddNode {
  x: any;
  y: any;

  constructor(x: any, y: any) {
    this.x = x;
    this.y = y;
  }

  generateGLSL() {
    return `${this.x.generateGLSL()} + ${this.y.generateGLSL()}`;
  }
}